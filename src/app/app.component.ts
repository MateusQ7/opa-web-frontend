import { Component } from '@angular/core';
import { AppInitializationService } from './services/initialization/initialization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Opa!';

  constructor(private appInitializationService: AppInitializationService) { }

  ngOnInit(): void {
    this.appInitializationService.initializeApp();
  }
}
