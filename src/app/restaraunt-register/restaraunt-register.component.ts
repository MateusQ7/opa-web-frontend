import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { RestaurantForm } from './dtos/restaurant-form';
import { FormError } from '../shared/types/formError';
import { CepService } from '../cep/cep.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantRegisterService } from './restaurant-register.service';
import { RestaurantOutput } from './dtos/restaurantOutput.interface';

@Component({
  selector: 'app-restaraunt-register',
  templateUrl: './restaraunt-register.component.html',
  styleUrls: ['./restaraunt-register.component.css']
})
export class RestarauntRegisterComponent implements OnInit {
  completedZipCode: boolean = false;
  cep: string = '';
  street: string = '';
  city: string = '';
  state: string = '';
  neighborhood: string = '';
  ownerId!: number;

  public form!: FormGroup;
  public regexCep = /\D/g;
  public cepLenght = 8;

  constructor(
    private fb: FormBuilder,
    private cepService: CepService,
    private route: ActivatedRoute,
    private router: Router,
    public restaurantRegisterService: RestaurantRegisterService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [{
        value: '',
        disabled: false
      }, [
        Validators.required,
      ]],
      cnpj: [{
        value: '',
        disabled: false
      }, [
        Validators.required,
      ]],
      segment: [{
        value: 1,
        disabled: false
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
    })
  }

  async submit() {
    this.route.queryParams.subscribe(params => {
      if (params['userId']) {
        this.ownerId = params['userId'];
      }
    });

    const formattedForm: RestaurantForm = {
      name: this.form.value.name,
      cnpj: this.form.value.cnpj,
      segment: this.form.value.segment,
      phoneNumber: this.form.value.phoneNumber,
      cep: this.form.value.cep,
      city: this.form.value.city,
      complement: this.form.value.complement,
      neighborhood: this.form.value.neighborhood,
      state: this.form.value.state,
      street: this.form.value.street,
      streetNumber: this.form.value.streetNumber,
      ownerId: this.ownerId
    };

    this.restaurantRegisterService.submitForm(formattedForm).subscribe(
      (res) => {
        const output: RestaurantOutput = {
          status: res.status,
          message: res.message,
          data: res.data
        }
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error)
      }
    )

    return;
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

}
