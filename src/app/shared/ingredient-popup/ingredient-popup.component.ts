import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Ingredient } from './ingredient.interface';

@Component({
  selector: 'opa-ingredient-popup',
  templateUrl: './ingredient-popup.component.html',
  styleUrls: ['./ingredient-popup.component.css']
})
export class IngredientPopupComponent {

  @Output()
  close: EventEmitter<boolean> = new EventEmitter<boolean>

  @Output()
  emitIngredient:EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>

  ingredientsToPaginate:Ingredient[] = []

  ingredientList:Ingredient[]=[];

  actualPage:number = 1;

  pageMaxQnt:number = 1;

  numberPerPage = 10;

  public form:FormGroup;

  allCheckboxChecked:boolean = false;

  constructor(
    public formBuilder:FormBuilder
    ){
      this.form = this.formBuilder.group({
        name:['',
          Validators.required
        ],
        unitSelect:['',
          Validators.required
        ],
        portionToggle:[false,
          Validators.required
        ],
        portionUnit:[{value:'',disabled:true},
        [
          Validators.required,
          Validators.maxLength(4)
        ]
        ],
        qt:[0,
          Validators.required
        ]
      })
  }

  setPagination(){
    this.pageMaxQnt = Math.ceil(this.ingredientList.length/this.numberPerPage)
    const trimStart = (this.actualPage - 1) * this.numberPerPage
    const trimEnd = trimStart + this.numberPerPage
    this.ingredientsToPaginate.length = 0;
    this.ingredientsToPaginate = this.ingredientList.slice(trimStart, trimEnd)
  }

  togglePortionUnit(){
    if(!this.form.get('portionUnit')?.disabled){
      this.form.get('portionUnit')?.disable();
      this.form.get('portionUnit')?.setValue('');
      this.form.get('unitSelect')?.enable();
    }
    else{
      this.form.get('portionUnit')?.enable();
      this.form.get('unitSelect')?.disable();
    }
  }

  submitIngredient(){
    if(this.form.valid){
      const ingredientToList:Ingredient={
        checked:false,
        name:this.form.value.name,
        qt:this.form.value.qt,
        un:''
      }

      if(this.form.value.portionToggle){
        ingredientToList.un = this.form.value.portionUnit
      }
      else{
        ingredientToList.un = this.form.value.unitSelect
      }

      this.ingredientList.push(ingredientToList);
      this.setPagination();
    }
  }

  submitForm(){
    this.emitIngredient.emit(this.ingredientList);
    this.closePopUp();
  }

  goToPreviousPage():void {
    if (this.actualPage > 1) {
      this.actualPage--;
      this.setPagination();
    }
  }

  goToNextPage(){
    if (this.actualPage < this.pageMaxQnt) {
      this.actualPage++;;
      this.setPagination();
    }
  }

  allChecked(){
    if(this.allCheckboxChecked){
      this.ingredientsToPaginate.map((ingredient)=>{
        ingredient.checked = false;
      })
    }
    else{
      this.ingredientsToPaginate.map((ingredient)=>{
        ingredient.checked = true;
      })
    }
    this.allCheckboxChecked = !this.allCheckboxChecked

  }

  checkIngredient(index:number){
    this.allCheckboxChecked = false;
    this.ingredientsToPaginate[index].checked = !this.ingredientsToPaginate[index].checked;
  }

  deleteAll(){
    this.ingredientsToPaginate.length = 0;
    this.ingredientList.length = 0;
    this.allCheckboxChecked = false;
  }

  deleteIngredient(index:number){
    this.ingredientsToPaginate.splice(index, 1);
    const indexOnWholeList = ((this.actualPage - 1)*this.numberPerPage) + index
    this.ingredientList.splice( indexOnWholeList,1);
    this.setPagination();
  }

  closePopUp() {
    this.close.emit(false);
  }

}
