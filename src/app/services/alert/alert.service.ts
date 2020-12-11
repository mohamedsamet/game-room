import { Injectable } from '@angular/core';
import { AlertModel } from '../../models/alert/alert.model';
import { AlertInterface } from '../../interfaces/alert/alert.interface';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { RESPONSE_ERROR_ALERT_DELAY } from '../../constants/rooms.constant';

@Injectable({
  providedIn: 'root'
})
export class AlertService implements AlertInterface{
  public alertStatus: AlertModel;
  constructor() { }

  getAlertStatus(): AlertModel {
    return this.alertStatus;
  }

  setAlertStatus(status: boolean, message: string): void {
    this.alertStatus = {status, message};
    if (status) {
      this.closeAlertDelayed();
    }
  }

  closeAlertDelayed(): void {
    of(true).pipe(delay(RESPONSE_ERROR_ALERT_DELAY)).subscribe(() => {
      this.setAlertStatus(false, '');
    });
  }
}
