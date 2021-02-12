import { AlertModel } from '../models/alert/alert.model';
import { AlertInterface } from '../interfaces/alert/alert.interface';

export class AlertInterfaceMock implements AlertInterface {
  private status: AlertModel;
  getAlertStatus(): AlertModel {
    return this.status;
  }

  setAlertStatus(status: boolean, message: string): void {
    this.status = {status, message};
  }
}
