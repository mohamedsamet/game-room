import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RedirectionInterface } from '../interfaces/redirection/redirection.interface';

@Injectable({
  providedIn: 'root'
})
export class UtiliesService implements RedirectionInterface {

  constructor(private router: Router) { }

  redirectTo(path: string): void {
    this.router.navigate([path]);
  }
}
