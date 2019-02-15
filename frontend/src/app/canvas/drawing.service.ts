import { Injectable } from '@angular/core';
import { Operation } from './operation';

@Injectable({
  providedIn: 'root'
})
export class DrawingService {

  constructor() { }

  public drawOnCanvas(operation: Operation, cx: CanvasRenderingContext2D) {
    if (!cx) { console.log('no rendering context'); return; }

    cx.beginPath();

    if (operation.prevPos) {
      cx.strokeStyle = operation.lineColor;
      cx.lineWidth = operation.lineWidth;
      cx.lineCap = operation.lineCap;

      const prevX = operation.prevPos.x;
      const prevY = operation.prevPos.y;
      const currentX = operation.currentPos.x;
      const currentY = operation.currentPos.y;

      cx.moveTo(prevX, prevY);
      cx.lineTo(currentX, currentY);
      cx.stroke();
    }
  }
}