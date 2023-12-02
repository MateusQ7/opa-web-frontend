import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AppInitializationService {
  constructor(private authService: AuthService) { }

  initializeApp(): void {
    const token = this.authService.getToken();
    if (!token) {
      return
    }
    this.authService.logUser(token)
  }
}
