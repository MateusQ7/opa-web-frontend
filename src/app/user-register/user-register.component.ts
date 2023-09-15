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
  public second_form!: FormGroup;
  public first:Boolean = true;

  constructor(
    private router: Router,
    private fb:FormBuilder,
  ){}
  
  ngOnInit(): void {
    this.form = this.fb.group({
      name: [{
        value:'', 
        disabled: false
      },[
        Validators.required,
      ]],
      password: [{
        value:'', 
        disabled: false
      },[
        Validators.required,
        Validators.minLength(6)
      ]],
      password_confirm: [{
        value:'', 
        disabled: false
      },[
        Validators.required,
        Validators.minLength(6)
      ]],
      email: [{
        value: '',
        disabled: false,
      }, [
        Validators.email,
        Validators.required,
      ]],
      enterprise: [{
        value: '',
        disabled: false,
      }, [
        Validators.required,
      ]],
      cnpj: [{
        value: '',
        disabled: false,
      }, [
        Validators.required,
      ]]
    })

    this.second_form = this.fb.group({
      street:[],
      street_number:[],
      neighborhood:[],
      cep:[],
      phone:[]
    })
  }

  calabocapedrocaio(){
    this.first = !this.first
  }
}
