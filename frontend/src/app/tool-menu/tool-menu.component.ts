import { Component, OnInit } from '@angular/core';
import { ToolMenuService } from './tool-menu.service';

@Component({
  selector: 'app-tool-menu',
  templateUrl: './tool-menu.component.html',
  styleUrls: ['./tool-menu.component.css']
})
export class ToolMenuComponent implements OnInit {

  constructor(private toolMenuService: ToolMenuService) { }

  ngOnInit() {
  }

  public clear() {
    console.log("remover selected");
  }

  public colorSelection(color: string) {
    console.log('color selected: ', color);
  }

}
