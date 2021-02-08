import { TestBed } from '@angular/core/testing';
import {AlertService} from "./alert.service";
import {of} from "rxjs";
import {delay} from "rxjs/operators";

describe('AlertService', () => {
  let alertService: AlertService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AlertService
        ]
    }).compileComponents();
    alertService = TestBed.get(AlertService);
  });

  it('should create the alert service', () => {
    expect(alertService).toBeTruthy();
  });

  describe('set get alert status', () => {
    it('should call close alert status delayed', () => {
      spyOn(alertService, 'closeAlertDelayed');
      alertService.setAlertStatus(true, 'message');
      expect(alertService.closeAlertDelayed).toHaveBeenCalled();
    });

    it('should not call close alert status delayed', () => {
      spyOn(alertService, 'closeAlertDelayed');
      alertService.setAlertStatus(false, 'message');
      expect(alertService.closeAlertDelayed).not.toHaveBeenCalled();
    });

    it('should set call alertStatus', () => {
      alertService.setAlertStatus(false, 'message');
      expect(alertService.alertStatus).toEqual({status: false, message: 'message'});
    });

    it('should get alertStatus', () => {
      alertService.setAlertStatus(true, 'message');
      expect(alertService.getAlertStatus()).toEqual({status: true, message: 'message'});
    });
  });

  describe('closeAlertDelayed method', () => {
    beforeEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 6000;
    });
    it('should setAlertStatus after delay', (done) => {
      spyOn(alertService, 'setAlertStatus');
      alertService.closeAlertDelayed();
      of(true).pipe(delay(5000)).subscribe(() => {
        expect(alertService.setAlertStatus).toHaveBeenCalled();
        done();
      });
    });
  });
});

