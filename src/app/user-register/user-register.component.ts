import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormError } from '../shared/types/formError';
import { UserRegisterService } from './user-register.service';
import { FormattedForm } from './formatted-form';
import { CepService } from '../services/cep/cep.service';
import { BackReponse } from './backReponse.interface';
import { PopUp } from '../shared/popup/popUp.interface';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit, PopUp {
  modalTitle: string = '';
  modalContent: string = '';
  okButton: number = 0;
  completedZipCode: boolean = false;
  cep: string = '';
  street: string = '';
  city: string = '';
  state: string = '';
  neighborhood: string = '';
  owner: boolean = false;

  public form!: FormGroup;
  public second_form!: FormGroup;
  public popUpShow: boolean = true;
  public regexCep = /\D/g;
  public cepLenght = 8;
  public popUpMessage: BackReponse[] = []

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cepService: CepService,
    private route: ActivatedRoute,
    public userRegisterService: UserRegisterService
  ) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['owner'] == 'true') {
        this.owner = true;
      }
    })

    this.form = this.fb.group({
      name: [{
        value: '',
        disabled: false
      }, [
        Validators.required,
      ]],
      username: [{
        value: '',
        disabled: false
      }, [
        Validators.required,
      ]],
      user: [{
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
        value: '',
        disabled: false
      }, [
        Validators.required,
      ]],
      password_confirm: [{
        value: '',
        disabled: false
      }, [
        Validators.required,
      ]],
      gender: [{
        value: 1,
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
      cnpj: [{
        value: null,
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
      }],
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
        value: '',
        disabled: false,
      }, [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]],
    })
  }

  async submit() {
    let restaurantCnpj = null;
    if (this.form.value.cnpj) {
      restaurantCnpj = this.form.value.cnpj
    }
    const formattedForm: FormattedForm = {
      name: this.form.value.name,
      birthDate: this.form.value.birthDate,
      cep: this.form.value.cep,
      city: this.form.value.city,
      complement: this.form.value.complement,
      cpf: this.form.value.cpf,
      email: this.form.value.email,
      gender: this.form.value.gender,
      neighborhood: this.form.value.neighborhood,
      password: this.form.value.password,
      phoneNumber: this.form.value.phoneNumber,
      state: this.form.value.state,
      street: this.form.value.street,
      streetNumber: this.form.value.streetNumber,
      username: this.form.value.username,
      restaurantCnpj: restaurantCnpj
    };

    this.userRegisterService.submitForm(formattedForm).subscribe(
      (res) => {
        const backResponse: BackReponse = {
          status: res.status,
          message: res.message,
          data: res.data
        }
        this.route.queryParams.subscribe(params => {
          if (params['owner'] == 'true') {
            if (res.data) {
              this.modalTitle = 'Sucesso';
              this.modalContent = 'Usuário cadastrado com sucesso, feche essa mensagem para ser redirecionado para o login.';
              this.okButton = 200;
              const queryParams = { userId: res.data.id };
              this.router.navigate(['/restaurant-register'], { queryParams: queryParams });
            }
          }
          else {
            this.router.navigate(['/login']);
          }
        })
      },
      (error) => {
        const backResponse: BackReponse = {
          status: error.status,
          message: error.error.message
        }
        this.modalTitle = 'Opa! Parece que algo deu errado';
        this.okButton = error.status;

        switch (backResponse.status) {
          case 400:
            this.modalContent = backResponse.message;
            break;
          case 500:
            this.modalContent = 'Ocorreu um erro interno, tente novamente mais tarde.';
            break;
          case 403:
            this.modalContent = 'Você não tem permissão para cadastrar, wtf?';
            break;
        }
      }
    )
    return;
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
            this.completedZipCode = true;
          } else {
            // Trate o caso de CEP inválido ou não encontrado, definindo a variável de erro para o campo "cep"
            this.form.controls['cep'].setErrors({ 'invalidZipCode': false });
          }
        },
        (error: any) => {
          console.error('Erro ao buscar CEP:', error);
          this.form.controls['cep'].setErrors({ 'invalidZipCode': true });
          this.completedZipCode = false;
          // Trate os erros, por exemplo, exiba uma mensagem de erro ao usuário
        }
      );
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

  showPopUp() {
    this.popUpShow = !this.popUpShow;
  };

  addMessageToPopUp(message: BackReponse): void {
    this.popUpMessage.push(message);
  }

  goToLogin() {
    if (this.okButton === 200) {
      this.router.navigate(['/login'])
    }
  }

}
