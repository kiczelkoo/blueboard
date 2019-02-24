import {Injectable, OnInit} from '@angular/core';
import {NoteModel} from "../model/NoteModel";

@Injectable({
  providedIn: 'root'
})
export class NoteService implements OnInit{


  notes = [new NoteModel("note-1"), new NoteModel("note-2"), new NoteModel("note-3")];
  counter = 4;

  constructor() { }

  addNote(message: String){

    this.notes.push(new NoteModel('note-' + this.counter.toString()));
    this.counter = this.counter + 1;
  }

  ngOnInit(): void {
  }


  getNotes(): NoteModel[] {

    console.log("getting notes...");
    console.log("notes length in service: " + this.notes.length);
    return this.notes;
  }



}
