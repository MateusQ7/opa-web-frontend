import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { FormError } from '../shared/types/formError';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit{

  public form!: FormGroup;
  public second_form!: FormGroup;
  public errorPassword = true;

  senha: string = '';
  confirmarSenha: string = '';
  erroSenha: boolean = false;

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
      ]],
      password_confirm: [{
        value:'', 
        disabled: false
      },[
        Validators.required,
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
        Validators.minLength(11),
        Validators.maxLength(11),
      ]],
    })

    

    
  }

  submit(){
    console.log("Enviou o formulário");
  }

  onScroll(event: Event) {
    const leftPanel = event.target as HTMLElement;
    const scrollTop = leftPanel.scrollTop;
    const rightPanel = leftPanel.nextElementSibling as HTMLElement;
    rightPanel.style.transform = `translateY(${-scrollTop}px)`;
  }

  matchPassword(){
    if(this.form.get('password')?.value != this.form.get('password_confirm')?.value){
      return this.erroSenha = true
    }else{
      return this.erroSenha = false
    }
  }
  
}
