import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ChatBoxComponent } from './chat-box.component';
import { ChatMessageMock } from '../../../../tests-spec-mocks/chat-message.mock';
import { LoggedUserInterfaceMock } from '../../../../tests-spec-mocks/logged-user.mock';
import { ChangeDetectorRef } from '@angular/core';

describe('ChatBoxComponent', () => {
  let fixture: ComponentFixture<ChatBoxComponent>;
  let chatBoxComponent: ChatBoxComponent;
  let chatMessageInterface: ChatMessageMock;
  let loggedUserInterface: LoggedUserInterfaceMock;
  let activeRoute = {snapshot: {paramMap: {get: (x) => {return 'room1'}}}} as ActivatedRoute;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ChatBoxComponent
      ],
      providers: [
        ChangeDetectorRef,
        {provide: ActivatedRoute, useValue: activeRoute},
        {provide: 'ChatMessageInterface', useClass: ChatMessageMock},
        {provide: 'LoggedUserInterface', useClass: LoggedUserInterfaceMock}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(ChatBoxComponent);
    chatBoxComponent = fixture.componentInstance;
    chatMessageInterface = TestBed.get('ChatMessageInterface');
    loggedUserInterface = TestBed.get('LoggedUserInterface');
  });

  it('should create chat box component', () => {
    expect(chatBoxComponent).toBeTruthy();
  });
});
