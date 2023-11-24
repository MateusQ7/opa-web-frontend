import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IngredientList } from 'src/app/shared/ingredient-popup/ingredient.interface';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent {

  popUp = false;

  //conferir se o storage realmente esta recebendo a lista de ingredientes do ingredient-popup
  ingredientList:IngredientList[]=[];

  constructor(
    public auth: AuthService
  ) { }

  showPopUp(){
    this.popUp = !this.popUp
  }
}
