import {Component, Inject, OnInit} from '@angular/core';
import {NoteModel} from "../../model/NoteModel";
import {NoteService} from "../note-service";

@Component({
  selector: 'app-note-collection',
  templateUrl: './note-collection.component.html',
  styleUrls: ['./note-collection.component.css']
})
export class NoteCollectionComponent implements OnInit {


  notes: NoteModel[];

  constructor(private noteService: NoteService) {


  }

  ngOnInit() {
    this.notes = this.noteService.getNotes();
    console.log("got notes from service");
    console.log("notes number: " + this.notes.length);
  }

}
