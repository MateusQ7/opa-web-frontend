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
      email: [{
        value: '',
        disabled: false,
      }, [
        Validators.email,
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
      gender: [{
        value: '',
        disabled: false,
      }, [
        Validators.required,
      ]],
      cpf: [{
        value: '',
        disabled: false,
      }, [
        Validators.required,
      ]],
      birthDate: [{
        value: '',
        disabled: false,
      }, [
        Validators.required,
      ]],
      street: [{
        value: '',
        disabled: false,
      }, [
        Validators.required,
      ]],
      streetNumber: [{
        value: '',
        disabled: false,
      }, [
        Validators.required,
      ]],
      complement: [{
        value: '',
        disabled: false,
      }, [
        Validators.required,
      ]],
      city: [{
        value: '',
        disabled: false,
      }, [
        Validators.required,
      ]],
      state: [{
        value: '',
        disabled: false,
      }, [
        Validators.required,
      ]],
      cep: [{
        value: '',
        disabled: false,
      }, [
        Validators.required,
      ]],
      phoneNumber: [{
        value: '',
        disabled: false,
      }, [
        Validators.required,
      ]],
    })

    
  }

  submit(){
    console.log("Enviou o formulário");
  }
}
