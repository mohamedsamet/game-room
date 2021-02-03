import { TestBed } from '@angular/core/testing';
import { UtiliesService } from './utilies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('UtilitiesService', () => {
  let utilitiesService: UtiliesService;
  let router: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: {navigate: () => {}}}]
    }).compileComponents();
    utilitiesService = TestBed.get(UtiliesService);
    router = TestBed.get(Router)
  });

  it('should create the utilitie service', () => {
    expect(utilitiesService).toBeTruthy();
  });

  describe('redirectTo method', () => {
    it('should call navigate from router with only path', () => {
      spyOn(router, 'navigate');
      utilitiesService.redirectTo('path');
      expect(router.navigate).toHaveBeenCalledWith(['path'], {relativeTo: null});
    });

    it('should call navigate from router with active route', () => {
      spyOn(router, 'navigate');
      const activeRoute = new ActivatedRoute();
      utilitiesService.redirectTo('path', activeRoute);
      expect(router.navigate).toHaveBeenCalledWith(['path'], {relativeTo: activeRoute});
    });
  });

  describe('getDataFromEvent method', () => {
    it('should return [] if data is null', async() => {
      const obj: any = [{data: null, total: 55}];
      utilitiesService.getDataFromEvent(of(obj)).subscribe(data => {
        expect(data).toEqual([]);
      });
    });

    it('should return filtred data', async() => {
      const obj: any = [{data: null, total: 55}, {data: 'test data', total: 55}];
      utilitiesService.getDataFromEvent(of(obj)).subscribe(data => {
        expect(data).toEqual(['test data']);
      });
    });

    it('should return filtred data 2', async() => {
      const obj: any = [{data: 'test data22', total: 55}, {data: 'test data', total: 60}];
      utilitiesService.getDataFromEvent(of(obj)).subscribe(data => {
        expect(data).toEqual(['test data', 'test data22']);
      });
    });
  });

});
