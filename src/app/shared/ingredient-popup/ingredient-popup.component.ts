import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IngredientList } from './ingredient.interface';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'opa-ingredient-popup',
  templateUrl: './ingredient-popup.component.html',
  styleUrls: ['./ingredient-popup.component.css']
})
export class IngredientPopupComponent {

  @Output() close: EventEmitter<boolean> = new EventEmitter<boolean>

  actualPage:number = 1;

  pageMaxQnt:number = 1;

  numberPerPage = 10;

  ingredientsToPaginate:IngredientList[]=[]

  ingredientList:IngredientList[]=[]

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
        qt:['',
          Validators.required
        ]
      })
  }

  setPagination(){
    console.log(`setpagination`)
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

  submit(){
    console.log(this.form.value)
    if(this.form.valid){
      const ingredientToList:IngredientList={
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

  goToPreviousPage(){
    if (this.actualPage > 1) {
      this.actualPage--;
      this.setPagination();
      console.log(this.actualPage)
    }
  }

  goToNextPage(){
    if (this.actualPage < this.pageMaxQnt) {
      this.actualPage++;;
      this.setPagination();
      console.log(this.actualPage)
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
  }

  deleteIngredient(index:number){
    this.ingredientsToPaginate.splice(index, 1);
    const indexOnWholeList = ((this.actualPage - 1)*this.numberPerPage) + index
    this.ingredientList.splice( indexOnWholeList,1);
    this.setPagination();
  }

  closePopUp() {
    this.close.emit(false);
    console.log('and WE OCUPPYYYYYYYY')
  }

}
