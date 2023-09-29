import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { FormError } from '../shared/types/formError';
import { UserRegisterService } from './user-register.service';
import { FormattedForm } from './formatted-form';
import { CepService } from '../services/cep/cep.service';
import { BackReponse } from './backReponse.interface';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit{

  public form!: FormGroup;
  public second_form!: FormGroup;
  public popUpShow:boolean = false;
  public cep: string = '';
  public street: string = '';
  public city: string = '';
  public state: string = '';
  public neighborhood: string = '';
  public regexCep = /\D/g;
  public cepLenght = 8;
  public popUpMessage:BackReponse[]=[]

  constructor(
    private router: Router,
    private fb:FormBuilder,
    private cepService: CepService,
    public userRegisterService:UserRegisterService
  ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [{
        value:'carlos',
        disabled: false
      },[
        Validators.required,
      ]],
      username: [{
        value:'carloso',
        disabled: false
      },[
        Validators.required,
      ]],
      email: [{
        value: 'caue.ms01@gmail.com',
        disabled: false,
      }, [
        Validators.email,
        Validators.required,
      ]],
      password: [{
        value:'12345678',
        disabled: false
      },[
        Validators.required,
        this.checkPasswordLength('password', 'incorrect_length')
      ]],
      password_confirm: [{
        value:'12345678',
        disabled: false
      },[
        Validators.required,
        this.mismatchedFields('password', 'mismatched_password')
      ]],
      gender: [{
        value: 1,
        disabled: false,
      }, [
        Validators.required,
      ]],
      cpf: [{
        value: '08370373364',
        disabled: false,
      }, [
        Validators.required,
      ]],
      birthDate: [{
        value: '2002-01-06',
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
        value: '55',
        disabled: false,
      }, [
        Validators.required,
      ]],
      complement: [{
        value: '102',
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
      neighborhood: [{
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
        Validators.pattern(/[0-9]{5}\-?[0-9]{3}/),
        Validators.minLength(8),
        Validators.maxLength(8),
      ]],
      phoneNumber: [{
        value: '95988110169',
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]],
    })


  }

  async submit(){
    if(this.form.valid){
      const formattedForm:FormattedForm={
        name:this.form.value.name,
        birthDate:this.form.value.birthDate,
        cep:this.form.value.cep,
        city:this.form.value.city,
        complement:this.form.value.complement,
        cpf:this.form.value.cpf,
        email:this.form.value.email,
        gender:this.form.value.gender,
        neighborhood:this.form.value.neighborhood,
        password:this.form.value.password,
        phoneNumber:this.form.value.phoneNumber,
        state:this.form.value.state,
        street:this.form.value.street,
        streetNumber:this.form.value.streetNumber,
        username:this.form.value.username
      };
      this.addMessageToPopUp(await this.userRegisterService.submitForm(formattedForm))
      this.showPopUp()
      return;
    };
    this,this.addMessageToPopUp({
      status:404,
      message:'Formulário inválido'
    });
    this.showPopUp();
    return;
  }

  onScroll(event: Event) {
    const leftPanel = event.target as HTMLElement;
    const scrollTop = leftPanel.scrollTop;
    const rightPanel = leftPanel.nextElementSibling as HTMLElement;
    rightPanel.style.transform = `translateY(${-scrollTop}px)`;
  }

  searchForCep() {
    // Remove espaços em branco e caracteres não numéricos do CEP
    const cep = this.cep.replace(this.regexCep, '');

    if (cep.length === this.cepLenght) {
      this.cepService.searchForCep(cep).subscribe(
        (data: any) => {
          if (data.street) {
            this.street = data.street;
            this.city = data.city;
            this.state = data.uf;
            this.neighborhood = data.neighborhood;
            // O CEP é válido, redefina a variável de erro para o campo "cep"
            this.form.controls['cep'].setErrors(null);
          } else {
            // Trate o caso de CEP inválido ou não encontrado, definindo a variável de erro para o campo "cep"
            this.form.controls['cep'].setErrors({ 'cepInvalido': true });
          }
        },
        (error: any) => {
          console.error('Erro ao buscar CEP:', error);
          // Trate os erros, por exemplo, exiba uma mensagem de erro ao usuário
        }
      );
    }
  };

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

  showPopUp(){
    this.popUpShow = !this.popUpShow;
  };

  addMessageToPopUp(message:BackReponse){
    this.popUpMessage.push(message);
  }

  goToLogin(){
    this.router.navigate(['/login'])
  }
}
