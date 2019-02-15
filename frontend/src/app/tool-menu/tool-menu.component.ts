import { Component, OnInit } from '@angular/core';
import { ToolMenuService } from './tool-menu.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tool-menu',
  templateUrl: './tool-menu.component.html',
  styleUrls: ['./tool-menu.component.css']
})
export class ToolMenuComponent implements OnInit {

  // public imagePath;
  imgURL: any;
  public message: string;


  constructor(private toolMenuService: ToolMenuService) { }

  ngOnInit() {
  }

  public preview(files) {
    if (files.length === 0)
      return;

    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      console.error('Only images are supported.');
      return;
    }

    let reader = new FileReader();
    // this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onloadend = (_event) => {
      this.imgURL = reader.result;
      // console.log(this.imgURL);
      this.toolMenuService.onFileSelected(this.imgURL);
    }
    
  }

}
