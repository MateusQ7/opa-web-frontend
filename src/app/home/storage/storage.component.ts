import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import { StorageDTO } from 'src/app/services/storage/storageDTO.interface';
import { StorageToBack } from 'src/app/services/storage/storageToBack.interface';
import { Ingredient } from 'src/app/shared/ingredient-popup/ingredient.interface';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit{

  popUp = false;

  loading= false;

  ingredientList:Ingredient[]=[];

  constructor(
    private storageService:StorageService
  ) { }


  async ngOnInit(): Promise<void> {
    await this.getData()
  }

  async getData(){
    this.loading = true;
    try{
      const data = await firstValueFrom(this.storageService.getStorage());
      data.map((ingredient: StorageDTO) => {
          this.ingredientList.push({
            checked:false,
            id:ingredient.id,
            name:ingredient.name,
            qt:ingredient.qt,
            un:ingredient.un
          });
        })
      this.loading = false;
    }catch(error: any){
      console.log(error);
    }
  }

  showPopUp(){
    this.popUp = !this.popUp
  };

  async recieveIngredients(ingredients:Ingredient[]){
    try{
      let ingredientsToBack:StorageToBack[] = [];
      ingredients.map((e:Ingredient)=>{
        ingredientsToBack.push(
          {
            productDescription:e.name,
            stockQuantity:e.qt,
            measurementUnit:e.un
          }
        )
      });
      this.storageService.submitStorage(ingredientsToBack).subscribe(e=>{
        console.log(e)
        ingredients.map((ingredient:Ingredient)=>{
          this.ingredientList.push(ingredient);
        })
      })

    }catch(error){
      console.log(error)
    }

  }
}
