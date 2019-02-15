import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


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
    // this.randomNewBoard = 'aaaaaa';
  }

  joinExistingRoom(existingRoomNumber: String){

    this.existingBoardNumber = existingRoomNumber;

    console.log("created new room!")

    this.router.navigateByUrl('/board/' + existingRoomNumber);
  }

}
