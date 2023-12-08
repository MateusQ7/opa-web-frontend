import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewEncapsulation, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import { StorageDTO } from 'src/app/services/storage/storageDTO.interface';
import { StorageToBack } from 'src/app/services/storage/storageToBack.interface';
import { Ingredient } from 'src/app/shared/ingredient-popup/ingredient.interface';
import { TypeIngredients } from './typeIngredients.interface';
import { Chart } from 'chart.js';
import { Menu } from 'src/app/services/menu/menu.interface';

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

  products:Menu[] = [];

  public productMaxProductionChart: any;

  public mostUsedIngredientsChart: any;

  public graphMostTypePerIngredientChart: any;

  public sortedProductMaxProduction: {product: string, maxProduction: number}[] = [];

  public sortedMostUsedIngredients: {name: string, productsCount: number}[] = [];

  public graphMostTypePerIngredient: {name: string, ingredientsCount: number}[] = [];

  constructor(
    private storageService: StorageService,
  ) {}

  async ngOnInit(): Promise<void> {
    this.products = await firstValueFrom(this.storageService.getProducts());
    await this.getData();
    this.buildProductMaxProductionGraph();
    this.buildMostUsedIngredientsGraph();
    this.buildMostTypePerIngredient();
  }

  async getData() {
    this.loading = true;
    try {
      const data = await firstValueFrom(this.storageService.getStorage());
      const ingredientProductsCount = this.getIngredientProductsCount();
      this.typeIngredients = {};
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
            productsCount: ingredientProductsCount[ingredient.id] ?? 0,
          });
        } else {
          this.typeIngredients[ingredient.typeName] = [{
            id: ingredient.id,
            name: ingredient.name,
            amountInStock: ingredient.qt,
            portionSize: ingredient.portionSize,
            measurementUnit: ingredient.un,
            productsCount: ingredientProductsCount[ingredient.id] ?? 0,
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
      let ingredientsToBack:StorageToBack[] = []
      const ingredientProductsCount = this.getIngredientProductsCount();
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
      this.storageService.submitStorage(ingredientsToBack).subscribe(async (e:any) => {
        this.products = await firstValueFrom(this.storageService.getProducts());
        await this.getData();
        this.buildProductMaxProductionGraph();
        this.buildMostUsedIngredientsGraph();
        this.buildMostTypePerIngredient();
      });
    } catch(error) {
      console.log(error);
    }
  }

  showModal(){
    this.ingredientModal = !this.ingredientModal
  };

  buildProductMaxProductionGraph() {
    const productMaxProduction:{product: string, maxProduction: number}[] = [];
    this.products.map((product) => productMaxProduction.push({
      product: product.name,
      maxProduction: Math.min(...product.items.map((item) => Math.floor(item.stockQuantity / item.portionSize))),
    }));

    const sorted = productMaxProduction.sort((a, b) => a.maxProduction - b.maxProduction);

    this.sortedProductMaxProduction = sorted.slice(0, 3);
    const graphPortedProductMaxProduction = sorted.slice(0, 7);

    const chartExists = Chart.getChart('graph-product-max-production');
    if(chartExists) {
      chartExists.destroy();
    }
    this.productMaxProductionChart = new Chart('graph-product-max-production', {
      type: 'bar',
      data: {
        labels: graphPortedProductMaxProduction.map(row => row.product),
        datasets: [
          {
            label: 'Produção máxima',
            data: graphPortedProductMaxProduction.map(row => row.maxProduction),
            backgroundColor: '#eec222',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          }
        },
        scales: {
          y: {
            grid: {
              display: false,
            }
          }
        }
      }
    });
  }

  buildMostUsedIngredientsGraph() {
    const ingredientProductsCount = this.getIngredientProductsCount();

    const ingredientNameMap:{[key: number]: string} = {};

    for (const ingredient of this.ingredientList) {
      ingredientNameMap[ingredient.id] = ingredient.name;
    }

    const ingredients = [];
    for (const [ingredientId, productsCount] of Object.entries(ingredientProductsCount)) {
      ingredients.push({ name: ingredientNameMap[parseInt(ingredientId)], productsCount: productsCount });
    }

    ingredients.sort((a, b) => b.productsCount - a.productsCount).slice(0, 7);

    this.sortedMostUsedIngredients = ingredients.slice(0, 3);

    const chartExists = Chart.getChart('graph-most-used-ingredients');
    if(chartExists) {
      chartExists.destroy();
    }
    this.mostUsedIngredientsChart = new Chart('graph-most-used-ingredients', {
      type: 'bar',
      data: {
        labels: ingredients.map((row) => row.name),
        datasets: [
          {
            label: 'Produtos',
            data: ingredients.map((row) => row.productsCount),
            backgroundColor: '#eec222',
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          }
        },
        scales: {
          y: {
            grid: {
              display: false,
            }
          }
        }
      }
    });
  }

  buildMostTypePerIngredient() {
    const countByTypeName: Record<string, number> = {};

    this.ingredientList.forEach((item) => {
      const typeName = item.typeName.toLowerCase();

      if (countByTypeName[typeName]) {
        countByTypeName[typeName]++;
      } else {
        countByTypeName[typeName] = 1;
      }
    });

    const formattedCountByTypeName:{name: string, count: number}[] = Object.entries(countByTypeName).map(([name, count]) => ({
      name,
      count,
    }));

    const chartExists = Chart.getChart('graph-most-type-per-ingredient');
    if(chartExists) {
      chartExists.destroy();
    }
    this.graphMostTypePerIngredientChart = new Chart('graph-most-type-per-ingredient', {
      type: 'doughnut',
      data: {
        labels: formattedCountByTypeName.map((row) => row.name),
        datasets: [
          {
            label: 'Ingredientes',
            data: formattedCountByTypeName.map((row) => row.count),
            backgroundColor: ['#f1aeb5', '#9ec5fe', '#fff3cd', '#c3e6cb', '#dfd2f7'],
          },
        ],
      },
      options: {
        responsive: true,
        radius: '100%',
        aspectRatio: 1.6,
        layout: {
          padding: 0,
        }
      }
    });
  }

  getIngredientProductsCount(): {[ingredientId: number]: number} {
    const ingredientProductsCount:{[ingredientId: number]: number} = {};

    for (const product of this.products) {
      for (const item of product.items) {
        if (ingredientProductsCount[item.ingredientId]) {
          ingredientProductsCount[item.ingredientId] += 1;
        } else {
          ingredientProductsCount[item.ingredientId] = 1;
        }
      }
    }

    return ingredientProductsCount;
  }

}
