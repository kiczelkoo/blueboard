import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'
import { MessagingService } from './messaging.service';
import { DrawingService } from './drawing.service';
import { Operation } from './operation';
import { MyPosition } from './my-position';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit, OnDestroy {

  constructor(private messagingService: MessagingService, private drawingService: DrawingService) { }


  ngOnInit() {
  }

  ngOnDestroy() {
    this.messagingService.disconnect();
    console.log("Disconnected");
  }

  @ViewChild('canvas') public canvas: ElementRef;

  @Input() public width = 800;
  @Input() public height = 600;

  private cx: CanvasRenderingContext2D;

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = 'orange';

    let that = this;

    this.messagingService.connect().subscribe(msg => {
      console.log('subscribed', msg);
      console.log(msg);
      let incomingOp: Operation = JSON.parse(msg.toString());

      that.drawingService.drawOnCanvas(incomingOp, that.cx);
    });

    this.captureEvents(canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    let that = this;
    // this will capture all mousedown events from the canvas element
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              // we'll stop (and unsubscribe) once the user releases the mouse
              // this will trigger a 'mouseup' event    
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              // pairwise lets us get the previous value to draw a line from
              // the previous point to the current point    
              pairwise()
            )
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };
        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        const operation: Operation = {
          name: 'line',
          lineCap: that.cx.lineCap,
          lineWidth: that.cx.lineWidth,
          lineColor: that.cx.strokeStyle,
          currentPos: new MyPosition(currentPos.x, currentPos.y),
          prevPos: new MyPosition(prevPos.x, prevPos.y)
        };

        this.messagingService.senMessage(JSON.stringify(operation));
      });
  }



}
