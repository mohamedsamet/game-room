import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionInterface } from '../interfaces/redirection/redirection.interface';

@Injectable({
  providedIn: 'root'
})
export class UtiliesService implements RedirectionInterface {

  constructor(private router: Router) { }

  redirectTo(path: string, activeRoute?: ActivatedRoute): void {
    this.router.navigate([path], {relativeTo: activeRoute ? activeRoute : null});
  }

}
