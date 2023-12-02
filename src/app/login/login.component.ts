import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login/login.service';
import { BackReponse } from '../user-register/backReponse.interface';
import { PopUp } from '../shared/popup/popUp.interface';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,PopUp {

  public form!:FormGroup;
  public popUpShow:boolean = false;
  public popUpMessage:BackReponse[]=[]

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

  async submit(){
    // falta logar o usuário no auth service,guardar token,conferir o form
    if(this.form.valid){
      this.loginService.submitForm(this.form.value).subscribe(
        (e)=>{
          if(e.data){
            this.auth.logUser(e.data.token)
            this.router.navigate(['/home/'])
          }
        }
      )
      return;
    };

    this,this.addMessageToPopUp({
      status:404,
      message:'Formulário inválido'
    });
    this.showPopUp();

    return;
  }

  showPopUp(){
    this.popUpShow = !this.popUpShow
  }

  addMessageToPopUp(message: BackReponse): void {
    this.popUpMessage.push(message);
  }
}
