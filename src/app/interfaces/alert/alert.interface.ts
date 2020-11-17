import { AlertModel } from '../../models/alert/alert.model';

export interface AlertInterface {
  getAlertStatus(): AlertModel;
  setAlertStatus(status: boolean, message: string): void;
}
