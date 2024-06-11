import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AppInitializationService {
  constructor(private authService: AuthService) { }

  initializeApp(): void {
    const token = this.authService.getToken();
    const userInfo = this.authService.getLoggedUserInfo();
    if (!token) {
      return
    }

    this.authService.logUser(token, userInfo);
  }
}
