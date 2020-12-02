import { ActivatedRoute } from '@angular/router';

export interface RedirectionInterface {
  redirectTo(path: string, activeRoute?: ActivatedRoute): void;
}
