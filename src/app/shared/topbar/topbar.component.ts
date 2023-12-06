import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Buttons } from './buttons';
import { filter } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'opa-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent {
  public currentRoute: string = '';

  public buttons:Buttons[] = [
    {
    name:'Dashboard',
    route:'dashboard'
    },
    {
    name:'Estoque',
    route:'storage'
    },
    {
    name:'Funcionários',
    route:'employees'
    },
    {
    name:'Cardápio',
    route:'menu'
    },
  ]

  constructor(
    public auth:AuthService,
    private route:ActivatedRoute,
    private router:Router,
    private authService:AuthService
  ){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateCurrentRoute();
    })
  }

  private updateCurrentRoute() {
    this.currentRoute = this.route.snapshot.firstChild?.routeConfig?.path || '';
  }

  logout(){
    this.authService.loggout();
  }

}
