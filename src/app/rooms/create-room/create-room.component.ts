import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddRoomInterface } from '../../interfaces/rooms/add-room.interface';
import { EmitRoomsNotifInterface } from '../../interfaces/rooms/emit-rooms-notif.interface';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {
  public createRoomForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              @Inject('AddRoomInterface') private addRoomInt: AddRoomInterface,
              @Inject('EmitRoomsNotifInterface') private emitRoomInt: EmitRoomsNotifInterface) { }

  ngOnInit(): void {
    this.createRoomForm = this.formBuilder.group({
      roomName: ['', Validators.required]
    });
  }

  validateCreation(): void {
    this.addRoomInt.addRoom(this.createRoomForm.get('roomName')?.value).subscribe(() => {
      this.emitRoomInt.emitRoomNotif();
    });
  }

}
