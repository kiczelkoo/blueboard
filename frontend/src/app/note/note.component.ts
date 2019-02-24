import {Component, Input, OnInit} from '@angular/core';
import {NoteModel} from "../../model/NoteModel";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input()
  model: NoteModel;


  constructor() { }

  ngOnInit() {
  }

}
