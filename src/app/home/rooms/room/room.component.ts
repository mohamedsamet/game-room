import { Component, Inject, OnInit } from '@angular/core';
import { RedirectionInterface } from '../../../interfaces/redirection/redirection.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(@Inject('RedirectionInterface') private  redirect: RedirectionInterface, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.redirect.redirectTo('../', this.activeRoute);
  }

}
