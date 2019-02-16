import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolMenuService {

  @Output() colorChange: EventEmitter<string> = new EventEmitter();

  @Output() remover: EventEmitter<boolean> = new EventEmitter();

  @Output() image: EventEmitter<any> = new EventEmitter();

  imgURL: any;

  constructor() { }

  public clear() {
    console.log("remover selected");
    this.remover.emit(true);
  }

  public colorSelection(color: string) {
    console.log('color selected: ', color);
    this.colorChange.emit(color);
  }

  public onFileSelected(image) {
    // let img = new Image();
    // img.src = image;
    this.image.emit(image);
  }

}
