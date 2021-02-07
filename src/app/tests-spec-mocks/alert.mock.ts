import { AlertModel } from '../models/alert/alert.model';

export class AlertInterfaceMock {
  private status: AlertModel;
  getAlertStatus(): AlertModel {
    return this.status;
  }

  setAlertStatus(status: boolean, message: string): void {
    this.status = {status, message};
  }
}
