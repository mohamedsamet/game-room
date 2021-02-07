import { Observable, of, throwError } from 'rxjs';

export class LoggedUserInterfaceMock {
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
