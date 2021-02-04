import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertComponent } from './alert.component';
import { AlertModel } from '../models/alert/alert.model';

describe('AlertComponent', () => {
  let fixture: ComponentFixture<AlertComponent>;
  let app: AlertComponent;
  let alertInt: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {provide: 'AlertInterface', useClass: AlertInterfaceMock}],
      declarations: [
        AlertComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AlertComponent);
    app = fixture.componentInstance;
    alertInt = TestBed.get('AlertInterface');
  });

  afterAll(() => {
    alertInt.setAlertStatus(false, 'show alert');
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should show alert when status is true', () => {
    alertInt.setAlertStatus(true, 'show alert');
    fixture.detectChanges();
    const alertBlock = fixture.nativeElement.querySelector('.alert.alert-danger');
    expect(alertBlock).toBeTruthy();
  });

  it('should not show alert when status is false', () => {
    fixture.detectChanges();
    const alertBlock = fixture.nativeElement.querySelector('.alert.alert-danger');
    expect(alertBlock).toBeFalsy();
  });

  it('should show message', () => {
    alertInt.setAlertStatus(true, 'show alert message');
    fixture.detectChanges();
    const alertBlockMessage = fixture.nativeElement.querySelector('.alert strong');
    expect(alertBlockMessage.textContent).toEqual('show alert message');
  });

  it('should show close icon at btn', () => {
    alertInt.setAlertStatus(true, 'show alert message');
    fixture.detectChanges();
    const alertBlockBtnElem = fixture.nativeElement.querySelector('.alert button span');
    expect(alertBlockBtnElem.textContent).toEqual('×');
  });

  it('should call setAlertStatus when btn click', () => {
    alertInt.setAlertStatus(true, 'show alert message');
    fixture.detectChanges();
    const alertBlockBtn = fixture.debugElement.nativeElement.querySelector('button');
    spyOn(alertInt, 'setAlertStatus');
    alertBlockBtn.click();
    expect(alertInt.setAlertStatus).toHaveBeenCalledWith(false, '');
  });
});

class AlertInterfaceMock {
  private status: AlertModel;
  getAlertStatus(): AlertModel {
   return this.status;
  }

  setAlertStatus(status: boolean, message: string): void {
    this.status = {status, message};
  }
}
