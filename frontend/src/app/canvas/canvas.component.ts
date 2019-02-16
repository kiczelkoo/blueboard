import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'
import { MessagingService } from './messaging.service';
import { DrawingService } from './drawing.service';
import { Operation } from './operation';
import { MyPosition } from './my-position';
import { ToolMenuService } from '../tool-menu/tool-menu.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit, OnDestroy {

  @Input()
  boardNumber: String;

  constructor(private messagingService: MessagingService, private drawingService: DrawingService, private toolMenuService: ToolMenuService) { }

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

    this.cx.fillStyle = "white";
    this.cx.fillRect(0, 0, this.width, this.height);
    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = 'black';

    this.toolMenuService.colorChange.subscribe((color) => {
      console.log('new color!');
      this.cx.strokeStyle = color;
      this.cx.lineWidth = 3;
      this.cx.lineCap = 'round';
    });

    this.toolMenuService.remover.subscribe(() => {
      this.cx.strokeStyle = 'white';
      this.cx.lineWidth = 10;
      this.cx.lineCap = 'square';
    });

    this.toolMenuService.image.subscribe((image) => {
      const operation = this.createImageDrawingOperation(image, { x: 0, y: 0 });
      this.messagingService.senMessage(JSON.stringify(operation));
      this.drawingService.drawImageOnCanvas(operation, this.cx);
    });

    this.toolMenuService.save.subscribe((event) => {
      const dataUrl = canvasEl.toDataURL('image/png');
      event.target.href = dataUrl;
    });

    let that = this;

    this.messagingService.connect().subscribe(msg => {
      console.log('subscribed', msg);
      console.log(msg);
      let incomingOp: Operation = JSON.parse(msg.toString());

      if(incomingOp.boardNumber === that.boardNumber){

        if (incomingOp.name === 'line') {
          that.drawingService.drawOnCanvas(incomingOp, that.cx);
        } else if (incomingOp.name === 'image') {
          that.drawingService.drawImageOnCanvas(incomingOp, that.cx);
        }
      }
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

        const operation = this.createLineDrawingOperation(currentPos, prevPos, that.cx.lineCap, that.cx.lineWidth, that.cx.strokeStyle);
        that.drawingService.drawOnCanvas(operation, that.cx);
        that.messagingService.senMessage(JSON.stringify(operation));
      });
  }

  private createLineDrawingOperation(currentPos, prevPos, lineCap, lineWidth, strokeStyle): Operation {
    const op: Operation = {
      uuid: uuid(),
      name: 'line',
      image: null,
      lineCap: lineCap,
      lineWidth: lineWidth,
      lineColor: strokeStyle,
      currentPos: new MyPosition(currentPos.x, currentPos.y),
      prevPos: new MyPosition(prevPos.x, prevPos.y),
      boardNumber: this.boardNumber
    };
    return op;
  }


  private createImageDrawingOperation(image: any, currentPos: any): Operation {
    const op: Operation = {
      uuid: uuid(),
      name: 'image',
      image: image,
      lineCap: null,
      lineWidth: null,
      lineColor: null,
      currentPos: new MyPosition(currentPos.x, currentPos.y),
      prevPos: null,
      boardNumber: this.boardNumber
    };
    return op;
  }

}
