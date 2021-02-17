import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddRoomInterface } from '../../../interfaces/rooms/add-room.interface';
import { RoomsNotifInterface } from '../../../interfaces/rooms/rooms-notif.interface';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html'
})
export class CreateRoomComponent implements OnInit {
  public createRoomForm: FormGroup;
  @Output() createRoomEvent = new EventEmitter();
  constructor(private formBuilder: FormBuilder,
              @Inject('AddRoomInterface') private addRoomInt: AddRoomInterface,
              @Inject('RoomsNotifInterface') private roomsNotifInt: RoomsNotifInterface) { }

  ngOnInit(): void {
    this.createRoomForm = this.formBuilder.group({
      roomName: ['', Validators.required]
    });
  }

  validateCreation(): void {
    this.addRoomInt.addRoom(this.createRoomForm.get('roomName')?.value).subscribe(() => {
      this.roomsNotifInt.emitRoomNotif();
      this.createRoomEvent.emit();
    });
  }

}
