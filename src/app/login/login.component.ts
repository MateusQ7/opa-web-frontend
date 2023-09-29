import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { BackReponse } from '../user-register/backReponse.interface';
import { PopUp } from '../shared/popup/popUp.interface';

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
    private loginService:LoginService
    ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [{
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
      this.loginService.submitForm(this.form.value)
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
