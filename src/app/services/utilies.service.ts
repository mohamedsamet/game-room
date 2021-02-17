import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionInterface } from '../interfaces/utilities/redirection.interface';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DataInterface } from '../interfaces/utilities/data.interface';

@Injectable({
  providedIn: 'root'
})
export class UtiliesService implements RedirectionInterface , DataInterface {

  constructor(private router: Router) { }

  redirectTo(path: string, activeRoute?: ActivatedRoute): void {
    this.router.navigate([path], {relativeTo: activeRoute ? activeRoute : null});
  }

  getDataFromEvent(data: Observable<any>): Observable<any> {
    return data.pipe(
      filter(element => element.data),
      map(element => element.data)
    );
  }

}
