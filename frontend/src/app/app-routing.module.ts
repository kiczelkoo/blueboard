import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent} from "./board/board.component";
import { StartPageComponent} from "./start-page/start-page.component";

const routes: Routes = [
  { path: 'board/:boardNumber', component: BoardComponent },
  { path: 'start-page', component: StartPageComponent },
  { path: '', redirectTo: '/start-page', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
