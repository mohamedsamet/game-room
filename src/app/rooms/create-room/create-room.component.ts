import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddRoomInterface } from '../../interfaces/rooms/add-room.interface';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {
  public createRoomForm: FormGroup;
  constructor(private formBuilder: FormBuilder, @Inject('AddRoomInterface') private addRoomInt: AddRoomInterface) { }

  ngOnInit(): void {
    this.createRoomForm = this.formBuilder.group({
      roomName: ['', Validators.required]
    });
  }

  validateCreation(): void {
    this.addRoomInt.addRoom(this.createRoomForm.get('roomName')?.value).subscribe(room => {
      console.log(room);
    });
  }

}
