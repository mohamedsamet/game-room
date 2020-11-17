import { Injectable } from '@angular/core';
import { AlertModel } from '../../models/alert/alert.model';
import { AlertInterface } from '../../interfaces/alert/alert.interface';

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
  }
}
