import { Component, Inject } from '@angular/core';
import { AlertInterface } from '../interfaces/alert/alert.interface';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  constructor(@Inject('AlertInterface') public  alertInt: AlertInterface) { }

}
