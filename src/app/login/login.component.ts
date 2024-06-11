import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth/auth.service";
import { firstValueFrom } from 'rxjs';
import * as bootstrap from 'bootstrap';
import { LoggedUserDto } from '../services/auth/loggedUserDto.interface';
import { RestaurantRegisterService } from '../restaraunt-register/restaurant-register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild("formModal") formModal!: ElementRef;

  public form!:FormGroup;
  public modalTitle:string = '';
  public modalContent:string = '';

  constructor(
    private formBuilder:FormBuilder,
    private loginService:LoginService,
    private router:Router,
    private auth:AuthService,
    private restaurantService:RestaurantRegisterService
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [{
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
      ]]
    });
  };

  async submit() {
    const formModal = new bootstrap.Modal(this.formModal.nativeElement);
    if (this.form.valid) {
      try {
        const res = await firstValueFrom(this.loginService.submitForm(this.form.value));
        if (res.data) {
          const role = res.data.ownerRestaurantId == res.data.restaurantId ? 'CEO' : 'Manager';
          const restaurantInfo = await firstValueFrom(this.restaurantService.getRestaraunt(res.data.restaurantId))

          const loggedUserProfile:LoggedUserDto = {
            name: this.form.value.username,
            role: role,
            restaurantName: restaurantInfo.name,
            restaurantId: res.data.restaurantId
          };

          this.auth.logUser(res.data.token, loggedUserProfile);
          this.router.navigate(['/home/'])
        }
      }
      catch (error: any) {
        this.modalTitle = 'Opa! Algo deu errado';
        switch (error.status) {
          case 400:
          case 401:
            this.modalContent = 'Usuário ou senha incorretos.';
            break;
          case 500:
            this.modalContent = 'Erro interno do servidor.';
            break;
          default:
            this.modalContent = 'Verifique se os dados inseridos estão corretos e tente novamente.';
            break;
        }
        formModal.show();
      }
    }
    else {
      this.modalTitle = 'Opa! Algo deu errado';
      this.modalContent = 'Verifique se os dados inseridos estão corretos e tente novamente.';
      formModal.show()
    }
  }
}
