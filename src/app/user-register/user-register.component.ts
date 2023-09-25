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
        this.checkPasswordLength('password', 'incorrect_length')
      ]],
      password_confirm: [{
        value:'', 
        disabled: false
      },[
        Validators.required,
        this.mismatchedFields('password', 'mismatched_password')
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

  checkPasswordLength(passwordInput: string, errorKey: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } => {
      const parent = control.parent;
      if (!parent) {
        return {}
      }

      const otherControl = parent.get(passwordInput)
      const otherControlValue = otherControl?.value as string
      const actualControlValue = control.value as string
      if (actualControlValue.length < 6 || actualControlValue.length > 50) {
        return {
          [errorKey]: true,
        }
      }

      return {}
    }
  }

  mismatchedFields(passwordInput: string, errorKey: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: unknown } => {
      const parent = control.parent;
      if (!parent) {
        return {}
      }

      const otherControl = parent.get(passwordInput)
      const otherControlValue = otherControl?.value as string
      const actualControlValue = control.value as string
      if (otherControlValue !== actualControlValue) {
        return {
          [errorKey]: true,
        }
      }

      return {}
    }
  }

  getFormValidationErrors(form: FormGroup): FormError[] {
    const result: FormError[] = [];
    Object.keys(form.controls).forEach(key => {
      const controlErrors: ValidationErrors | null | undefined = form.get(key)?.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          result.push({
            control: key,
            error: keyError,
            value: controlErrors[keyError],
            humanMessage: this.getHumanMessage(keyError, key)
          });
        });
      }
    });

    return result;
  }
  
  getHumanMessage(error: string, key: string): string {
    const input = this.getFormattedControlName(key)
    const errorMessages: { [key: string]: string } = {
      email: 'E-mail inválido por favor digite um e-mail válido, exemplo: example@example.com.',
      required: `O campo ${input} é obrigatório.`,
      mismatched_email: 'Os emails não são iguais.',
      mismatched_password: 'As senhas não são iguais.',
      incorrect_length: 'A senha deve conter pelo menos 6 caracteres'
    }

    return errorMessages[error]
  }

  getFormattedControlName(control: string): string {
    const errorMessages: { [key: string]: string } = {
      username: 'usuário',
      password: 'senha',
      password_confirm: 'confirmar senha',
      email: 'e-mail',
      gender: 'gênero',
      cpf: 'cpf',
      birthDate: 'data de aniversário',
      street: 'rua',
      streetNumber: 'número',
      complement: 'complemento',
      city: 'cidade',
      state: 'estado',
      cep: 'cep',
      phoneNumber: 'telefone',
    }

    return errorMessages[control]
  }
  
}
