import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { FormError } from '../shared/types/formError';
import { CepService } from '../cep/cep.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit{

  cep: string = '';
  street: string = '';
  city: string = '';
  state: string = '';

  public form!: FormGroup;
  public second_form!: FormGroup;
  public errorPassword = true;

  senha: string = '';
  confirmarSenha: string = '';
  erroSenha: boolean = false;

  constructor(
    private router: Router,
    private fb:FormBuilder,
    private cepService: CepService,
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

  searchForCep() {
    // Remove espaços em branco e caracteres não numéricos do CEP
    const cep = this.cep.replace(/\D/g, '');

    if (cep.length === 8) {
      this.cepService.searchForCep(cep).subscribe(
        (data: any) => {
          this.street = data.logradouro;
          this.city = data.localidade;
          this.state = data.uf;
          console.log('Dados do CEP:', data);
          // Faça a validação do CEP e as ações desejadas aqui
        },
        (error: any) => {
          console.error('Erro ao buscar CEP:', error);
          // Trate os erros, por exemplo, exiba uma mensagem de erro ao usuário
        }
      );
    }
  }
  
}
