import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ToolMenuComponent } from './tool-menu/tool-menu.component';
import { StartPageComponent } from './start-page/start-page.component';
import { BoardComponent } from './board/board.component';
import { AppRoutingModule } from './app-routing.module';
import { NoteComponent } from './note/note.component';
import { NoteCollectionComponent } from './note-collection/note-collection.component';
import { DraggableDirective } from './note/draggable.directive';


@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    ToolMenuComponent,
    StartPageComponent,
    BoardComponent,
    NoteComponent,
    NoteCollectionComponent,
    DraggableDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
