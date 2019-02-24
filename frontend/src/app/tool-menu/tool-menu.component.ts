import { Component, OnInit, Input } from '@angular/core';
import { ToolMenuService } from './tool-menu.service';
import { HttpClient } from '@angular/common/http';
import {NoteService} from "../note-service";

@Component({
  selector: 'app-tool-menu',
  templateUrl: './tool-menu.component.html',
  styleUrls: ['./tool-menu.component.css']
})
export class ToolMenuComponent implements OnInit {

  private imgURL: any;
  public message: string;
  
  constructor(private toolMenuService: ToolMenuService, private noteService: NoteService) { }

  ngOnInit() {
  }

  public onFileSelected(files) {
    if (files.length === 0)
      return;

    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      console.error('Only images are supported.');
      return;
    }

    let reader = new FileReader();
    let that = this;
    reader.onloadend = (_event) => {
      console.log('on loadend ');
      that.toolMenuService.onFileSelected(that.imgURL);
    }
    reader.onload = (_event) => {
      that.imgURL = reader.result;
      console.log('on load');
    }
    reader.readAsDataURL(files[0]);
  }

  onTextClicked(){
    this.noteService.addNote("nowa notatka!!!");
  }

}
