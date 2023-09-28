import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'opa-yline',
  templateUrl: './yellowline.component.html',
  styleUrls: ['./yellowline.component.css']
})
export class YellowlineComponent {

  @Input() public routeNameToBeUsed?:string;

  @Input() public iconPath?:string;

  constructor(
    public auth:AuthService
  ){}
}
