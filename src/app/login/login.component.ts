import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form!:FormGroup;
  public loginSuccess:boolean = false;
  public modalTitle:string = '';
  public modalContent:string = '';

  constructor(
    private formBuilder:FormBuilder,
    private loginService:LoginService,
    private router:Router,
    private auth:AuthService
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
    // falta logar o usuário no auth service,guardar token,conferir o form
    if (this.form.valid) {
      this.loginService.submitForm(this.form.value).subscribe(
        (e)=>{
          if(e.data){
            this.auth.logUser(e.data.token)
            this.router.navigate(['/home/'])
          }
        }
      );

      return;
    };

    this.modalTitle = 'Opa! Parece que ocorreu um erro no no login.'
    this.modalContent = 'Verifique se os campos estão preenchidos corretamente.'

    return;
  }
}
