import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil, map, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
  selector: '[draggable]',
})
export class DraggableDirective implements AfterViewInit, OnDestroy {
  @Input()
  dragHandle: string; // element, ktory chwytamy kursorem
  @Input()
  dragTarget: string; // calosc - cala notatka, ktora chcemy przesunac

  private target: HTMLElement;
  private handle: HTMLElement;
  private delta = { x: 0, y: 0 };
  private offset = { x: 0, y: 0 };
  private destroy$ = new Subject<void>();

  constructor(private elementRef: ElementRef, private zone: NgZone) {}

  ngAfterViewInit() {


    console.log("drag handle: " + this.dragHandle);
    console.log("drag target: " + this.dragTarget);

    this.handle = this.dragHandle
      ? (document.querySelector(this.dragHandle) as HTMLElement)
      : this.elementRef.nativeElement;

    
    this.target = document.querySelector(this.dragTarget) as HTMLElement;
   
    this.handle.style.cursor = 'move';
    this.setupEvents();
  }

  private setupEvents() {
    this.zone.runOutsideAngular(() => {
      const mousedown$ = fromEvent(this.handle, 'mousedown');
      const mousemove$ = fromEvent(document, 'mousemove');
      const mouseup$ = fromEvent(document, 'mouseup');

      const mousedrag$ = mousedown$.pipe(
        switchMap((event: MouseEvent) => {
          const startX = event.clientX;
          const startY = event.clientY;

          return mousemove$.pipe(
            map((e: MouseEvent) => {
              e.preventDefault();
              this.delta = {
                x: e.clientX - startX,
                y: e.clientY - startY,
              };
            }),
            takeUntil(mouseup$),
          );
        }),
        takeUntil(this.destroy$),
      );

      mousedrag$.subscribe(() => {
        if (this.delta.x === 0 && this.delta.y === 0) {
          return;
        }

        this.translate();
      });

      mouseup$.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.offset.x += this.delta.x;
        this.offset.y += this.delta.y;
        this.delta = { x: 0, y: 0 };
      });
    });
  }

  private translate() {
    requestAnimationFrame(() => {
      this.target.style.transform = `
        translate(${this.offset.x + this.delta.x}px,
                  ${this.offset.y + this.delta.y}px)
      `;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
