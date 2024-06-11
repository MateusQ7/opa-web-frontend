import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-chooser',
  templateUrl: './register-chooser.component.html',
  styleUrls: ['./register-chooser.component.css']
})
export class RegisterChooserComponent implements OnInit {

  constructor(
    private router:Router,
  ) { }

  ngOnInit(): void {
  }

  async redirectToOwner() {
    const queryParams = { owner: true };
    this.router.navigate(['/register'], { queryParams: queryParams });
  }

  async redirectToEmployee() {
    const queryParams = { owner: false };
    this.router.navigate(['/register'], { queryParams: queryParams });
  }

}
