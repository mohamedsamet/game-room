import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { RoomModel } from '../../../models/room/room.model';
import { Subject } from 'rxjs';
import { ManageRoomsInterface } from '../../../interfaces/rooms/manage-rooms.interface';
import { GetRoomsNotifInterface } from '../../../interfaces/rooms/get-rooms-notif.interface';
import { ROOMS_PER_PAGE } from '../../../constants/rooms.constant';
import { PaginatorComponent } from '../../../paginator/paginator.component';
import { RoomsResultModel } from '../../../models/room/rooms-result.model';
import { EmitRoomsNotifInterface } from '../../../interfaces/rooms/emit-rooms-notif.interface';
import { RedirectionInterface } from '../../../interfaces/redirection/redirection.interface';
import { ActivatedRoute } from '@angular/router';

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
  public userHash: string;
  @Input() $roomCreated = new Subject();
  @ViewChild(PaginatorComponent) paginator: PaginatorComponent;
  constructor(@Inject('ManageRoomsInterface') private manageRoomsInt: ManageRoomsInterface,
              @Inject('GetRoomsNotifInterface') private getRoomsNotif: GetRoomsNotifInterface,
              @Inject('EmitRoomsNotifInterface') private emitRoomInt: EmitRoomsNotifInterface,
              @Inject('RedirectionInterface') private redirect: RedirectionInterface,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getRooms();
    this.listenToRoomCreation();
    this.userHash = localStorage.getItem('hash');
  }

  openRoom(room: RoomModel): void {
    this.manageRoomsInt.setRoomName(room.name)
    this.redirect.redirectTo(`${room._id}`, this.activeRoute);
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
    this.manageRoomsInt.getRoomsByPage(start, end).subscribe(result => {
      this.applyRoomsResult(result);
      this.showReloadBtn = false;
    });
  }

  initPagination(): void {
    this.selectedPage = 1;
    this.paginator.selectedPage = 1;
  }

  reloadRooms(): void {
    this.getRoomsByPage(0, ROOMS_PER_PAGE - 1);
    this.initPagination();
  }

  deleteRoom(roomId: string): void {
    this.manageRoomsInt.deleteRooms(roomId, this.userHash).subscribe(() => {
      this.selectPage(1);
      this.initPagination();
      this.emitRoomInt.emitRoomNotif();
    });
  }
}
