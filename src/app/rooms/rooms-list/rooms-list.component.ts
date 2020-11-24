import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { RoomModel } from '../../models/room/room.model';
import { Subject } from 'rxjs';
import { GetRoomsInterface } from '../../interfaces/rooms/get-rooms.interface';
import { GetRoomsNotifInterface } from '../../interfaces/rooms/get-rooms-notif.interface';
import { ROOMS_PER_PAGE } from '../../constants/rooms.constant';
import { PaginatorComponent } from '../../paginator/paginator.component';
import { RoomsResultModel } from '../../models/room/rooms-result.model';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss']
})
export class RoomsListComponent implements OnInit {
  public roomList: RoomModel[] = [];
  public totalRooms: number;
  public selectedPage = 1;
  public showReloadBtn = false;
  @Input() $roomCreated = new Subject();
  @ViewChild(PaginatorComponent) paginator: PaginatorComponent;
  constructor(@Inject('GetRoomsInterface') private getRoomsInt: GetRoomsInterface,
              @Inject('GetRoomsNotifInterface') private getRoomsNotif: GetRoomsNotifInterface) {
  }

  ngOnInit(): void {
    this.getRooms();
    this.listenToRoomCreation();
  }

  listenToRoomCreation(): void {
    this.$roomCreated.subscribe(() => {
      if (this.selectedPage !== 1) {
        this.selectPage(1);
        this.paginator.selectedPage = 1;
      }
    });
  }

  getRooms(): void {
    this.getRoomsNotif.getRoomsSockNotif().subscribe(result => {
      if (this.selectedPage === 1) {
        this.applyRoomsResult(result);
      } else {
        this.showReloadBtn = true;
      }
    });
  }

  private applyRoomsResult(result: RoomsResultModel): void {
    this.roomList = result.rooms;
    this.totalRooms = result.total;
  }

  selectPage(page: number): void {
    this.selectedPage = page;
    this.getRoomsByPage((page - 1) * ROOMS_PER_PAGE, (page * ROOMS_PER_PAGE) - 1);
  }

  getRoomsByPage(start: number, end: number): void {
    this.getRoomsInt.getRoomsByPage(start, end).subscribe(result => {
      this.applyRoomsResult(result);
      this.showReloadBtn = false;
    });
  }

  reloadRooms(): void {
    this.selectedPage = 1;
    this.paginator.selectedPage = 1;
    this.getRoomsByPage(0, ROOMS_PER_PAGE - 1);
  }
}
