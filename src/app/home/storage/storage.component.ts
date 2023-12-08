import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewEncapsulation, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import { StorageDTO } from 'src/app/services/storage/storageDTO.interface';
import { StorageToBack } from 'src/app/services/storage/storageToBack.interface';
import { Ingredient } from 'src/app/shared/ingredient-popup/ingredient.interface';
import { TypeIngredients } from './typeIngredients.interface';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StorageComponent implements OnInit {
  @Output()
  emitIngredient:EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>

  form!: FormGroup;

  ingredientModal = false;

  loading = false;

  typeCheckbox:boolean = false;

  ingredientList:Ingredient[] = [];

  typeIngredients: TypeIngredients = {};

  public productMaxProductionChart: any;

  constructor(
    private formBuilder:FormBuilder,
    private storageService:StorageService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getData();
  }

  async getData() {
    this.loading = true;
    try {
      const data = await firstValueFrom(this.storageService.getStorage());
      data.map((ingredient: StorageDTO) => {
        this.ingredientList.push({
          checked: false,
          id: ingredient.id,
          name: ingredient.name,
          qt: ingredient.qt,
          un: ingredient.un,
          portionSize: ingredient.portionSize,
          portionSum: ingredient.qt * ingredient.portionSize,
          typeName: ingredient.typeName,
        });

        if (this.typeIngredients.hasOwnProperty(ingredient.typeName)) {
          this.typeIngredients[ingredient.typeName].push({
            id: ingredient.id,
            name: ingredient.name,
            amountInStock: ingredient.qt,
            portionSize: ingredient.portionSize,
            measurementUnit: ingredient.un,
          });
        } else {
          this.typeIngredients[ingredient.typeName] = [{
            id: ingredient.id,
            name: ingredient.name,
            amountInStock: ingredient.qt,
            portionSize: ingredient.portionSize,
            measurementUnit: ingredient.un,
          }];
        }
      });
      this.loading = false;
    }
    catch(error: any) {
      console.log(error);
    }
  }

  async receiveIngredients(ingredients:Ingredient[]) {
    try {
      let ingredientsToBack:StorageToBack[] = [];
      ingredients.map((e:Ingredient) => {
        ingredientsToBack.push(
          {
            productDescription: e.name,
            stockQuantity: e.qt,
            measurementUnit: e.un,
            typeName: e.typeName,
            portionSize: e.portionSize,
          }
        );
      });
      this.storageService.submitStorage(ingredientsToBack).subscribe(e => {
        ingredients.map((ingredient:Ingredient) => {
          this.ingredientList.push(ingredient);
        });
      });
    } catch(error) {
      console.log(error);
    }
  }

  showModal(){
    this.ingredientModal = !this.ingredientModal
  };

  buildProductMaxProductionGraph() {
    const ingredientAmountInStock = this.ingredientList.map((ingredient:Ingredient) => { ingredient.id; ingredient.qt });
    console.log(ingredientAmountInStock);

    this.productMaxProductionChart = new Chart('graph-target-revenue', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [],
      },
      options: {

      }
    });
  }

}
