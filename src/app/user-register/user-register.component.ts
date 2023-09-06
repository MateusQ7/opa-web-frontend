import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit{

  public form!: FormGroup;

  constructor(
    private router: Router,
    private fb:FormBuilder
  ){}
  
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required]
    })
  }

  
}
