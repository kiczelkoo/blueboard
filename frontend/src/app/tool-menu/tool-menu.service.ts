import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolMenuService {

  @Output() colorChange: EventEmitter<string> = new EventEmitter();

  @Output() remover: EventEmitter<string> = new EventEmitter();

  constructor() { }

  public clear() {
    console.log("remover selected");
  }

  public colorSelection(color: string) {
    console.log('color selected: ', color);
    this.colorChange.emit(color);
  }
}
