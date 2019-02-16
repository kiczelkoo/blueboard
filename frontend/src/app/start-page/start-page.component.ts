import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  // randomNewBoard: String;
  existingBoardNumber: String;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  joinExistingRoom(existingRoomNumber: String){

    this.existingBoardNumber = existingRoomNumber;

    console.log("joining room " + this.existingBoardNumber + "!")

    this.router.navigateByUrl('/board/' + existingRoomNumber);
  }

  createNewRoom(){

   let unique = uuid();

    console.log("created new room " + unique + "!")

    this.router.navigateByUrl('/board/' + unique);
  }

}
