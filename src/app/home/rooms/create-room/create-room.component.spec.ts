import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomsHelper } from '../../../tests-spec-mocks/helpers/room.service.spec.helper';
import { By } from '@angular/platform-browser';
import {CreateRoomComponent} from "./create-room.component";
import {AddRoomMock} from "../../../tests-spec-mocks/add-room.mock";
import {AddRoomInterface} from "../../../interfaces/rooms/add-room.interface";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {EmitRoomsNotifInterface} from "../../../interfaces/rooms/emit-rooms-notif.interface";
import {EmitRoomMock} from "../../../tests-spec-mocks/emit-room.mock";

describe('CreateRoom', () => {
  let fixture: ComponentFixture<CreateRoomComponent>;
  let createRoom: CreateRoomComponent;
  let addRoomInt: AddRoomInterface;
  let formBuilder: FormBuilder;
  let emitRoomsNotifInterface: EmitRoomsNotifInterface;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        CreateRoomComponent
      ],
      providers: [
        FormBuilder,
        {provide: 'AddRoomInterface', useClass: AddRoomMock},
        {provide: 'EmitRoomsNotifInterface', useClass: EmitRoomMock}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(CreateRoomComponent);
    createRoom = fixture.componentInstance;
    formBuilder = TestBed.get(FormBuilder);
    addRoomInt = TestBed.get('AddRoomInterface');
    emitRoomsNotifInterface = TestBed.get('EmitRoomsNotifInterface');
  });

  it('should create the user in room component', () => {
    expect(createRoom).toBeTruthy();
  });

  describe('init createRoomForm', () => {
    it('should set createRoomForm roomName value', () => {
      createRoom.ngOnInit();
      expect(createRoom.createRoomForm.get('roomName').value).toEqual('');
    });

    it('should check form validity', () => {
      createRoom.ngOnInit();
      expect(createRoom.createRoomForm.get('roomName').valid).toBeFalsy();
    });

    it('should set createRoomForm validation required', () => {
      createRoom.ngOnInit();
      expect(createRoom.createRoomForm.get('roomName').validator).toEqual(Validators.required);
    });
  });

  describe('validateCreation method', () => {
    beforeEach(() => {
      createRoom.ngOnInit();
    });

    it('should call addRoom from interface', () => {
      spyOn(addRoomInt, 'addRoom').and.callThrough();
      createRoom.createRoomForm.controls.roomName.setValue('room 1');
      createRoom.validateCreation();
      expect(addRoomInt.addRoom).toHaveBeenCalledWith('room 1');
    });

    it('should call emitRoomNotif from interface', () => {
      spyOn(emitRoomsNotifInterface, 'emitRoomNotif');
      createRoom.createRoomForm.controls.roomName.setValue('room 1');
      createRoom.validateCreation();
      expect(emitRoomsNotifInterface.emitRoomNotif).toHaveBeenCalled();
    });

    it('should call createRoomEvent from interface', () => {
      spyOn(createRoom.createRoomEvent, 'emit');
      createRoom.createRoomForm.controls.roomName.setValue('room 1');
      createRoom.validateCreation();
      expect(createRoom.createRoomEvent.emit).toHaveBeenCalled();
    });
  });

  describe('HTML DOM tests', () => {
    beforeEach(() => {
      createRoom.createRoomForm = formBuilder.group({
        roomName: ['samet', Validators.required]
      });
      fixture.detectChanges();
    });

    it('should display createformGroup', () => {
      const formGroup = fixture.nativeElement.querySelector('form');
      expect(formGroup.getAttribute('ng-reflect-form')).toBeTruthy();
    });

    it('should display label room name', () => {
      const formGroupLabel = fixture.nativeElement.querySelector('form label');
      expect(formGroupLabel.textContent).toEqual('Room name');
    });

    it('should display label room name with for attribute', () => {
      const formGroupLabel = fixture.nativeElement.querySelector('form label');
      expect(formGroupLabel.getAttribute('for')).toEqual('roomName');
    });

    it('should display input with right attributes', () => {
      const input = fixture.nativeElement.querySelector('form input');
      expect(input.getAttribute('formControlName')).toEqual('roomName');
      expect(input.getAttribute('autofocus')).not.toEqual(null);
      expect(input.getAttribute('minlength')).toEqual('4');
      expect(input.getAttribute('maxlength')).toEqual('20');
      expect(input.getAttribute('id')).toEqual('roomName');
    });

    it('should display input with class is-invalid', () => {
      createRoom.createRoomForm.controls.roomName.markAsDirty();
      createRoom.createRoomForm.controls.roomName.setValue('');
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('form input');
      expect(input.classList.toString().includes('is-invalid')).toBeTruthy();
    });

    it('should display input not with class is-invalid', () => {
      createRoom.createRoomForm.controls.roomName.markAsDirty();
      createRoom.createRoomForm.controls.roomName.setValue('samet');
      fixture.detectChanges();
      const input = fixture.nativeElement.querySelector('form input');
      expect(input.classList.toString().includes('is-invalid')).toBeFalsy();
    });

    it('should display small with text', () => {
      const small = fixture.nativeElement.querySelector('form small');
      expect(small.textContent.trim()).toEqual('Your room name must be 4-20 characters long.');
    });

    it('should display small with class text-danger', () => {
      createRoom.createRoomForm.controls.roomName.markAsDirty();
      createRoom.createRoomForm.controls.roomName.setValue('');
      fixture.detectChanges();
      const small = fixture.nativeElement.querySelector('form small');
      expect(small.classList.toString().includes('text-danger')).toBeTruthy();
    });

    it('should display small with class text-muted', () => {
      const small = fixture.nativeElement.querySelector('form small');
      expect(small.classList.toString().includes('text-muted')).toBeTruthy();
    });

    it('should display button create with type submit', () => {
      const btn = fixture.nativeElement.querySelector('form button');
      expect(btn.getAttribute('type')).toEqual('submit');
    });

    it('should display button create with create content', () => {
      const btn = fixture.nativeElement.querySelector('form button');
      expect(btn.textContent.trim()).toEqual('Create');
    });

    it('should display button create not disabled', () => {
      createRoom.createRoomForm.controls.roomName.setValue('samet');
      fixture.detectChanges();
      const btn = fixture.nativeElement.querySelector('form button');
      expect(btn.disabled).toBeFalsy();
    });

    it('should display button create disabled', () => {
      createRoom.createRoomForm.controls.roomName.setValue('');
      fixture.detectChanges();
      const btn = fixture.nativeElement.querySelector('form button');
      expect(btn.disabled).toBeTruthy();
    });
  });
});

