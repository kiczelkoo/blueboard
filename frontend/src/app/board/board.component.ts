import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  boardNumber: String;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {

    const boardNum = this.route.snapshot.paramMap.get('boardNumber');
    console.log("entering room " + boardNum);
    this.boardNumber = boardNum;
  }

}
