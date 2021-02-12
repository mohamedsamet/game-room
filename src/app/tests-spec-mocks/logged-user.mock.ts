import { Observable, of, throwError } from 'rxjs';
import { LoggedUserInterface } from '../interfaces/user/logged-user.interface';

export class LoggedUserInterfaceMock implements LoggedUserInterface {
  private userName: string;
  isError = false;
  getLoggedUser(): Observable<any> {
    if (this.isError) {
      return throwError('error');
    }
    return of({pseudo: 'samet'});
  }

  setUserName(userName: string): void {
    this.userName = userName;
  }

  setError() {
    this.isError = true;
  }

  getUserName(): string {
    return this.userName;
  }
}
