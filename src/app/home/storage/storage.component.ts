import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { Ingredient } from 'src/app/shared/ingredient-popup/ingredient.interface';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent {

  popUp = false;

  //conferir se o storage realmente esta recebendo a lista de ingredientes do ingredient-popup
  ingredientList:Ingredient[]=[];

  constructor(
    private storageService:StorageService
  ) { }

  showPopUp(){
    this.popUp = !this.popUp
  };

  recieveIngredients(ingredients:Ingredient[]){
    // this.storageService.submitStorage()
    ingredients.map((e:Ingredient)=>{
      this.ingredientList.push(e);
    })
  }
}
