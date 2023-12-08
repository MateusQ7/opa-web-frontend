import { Component, EventEmitter, OnInit, Output, inject, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Ingredient } from './ingredient.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import { StorageDTO } from 'src/app/services/storage/storageDTO.interface';

@Component({
  selector: 'opa-ingredient-popup',
  templateUrl: './ingredient-popup.component.html',
  styleUrls: ['./ingredient-popup.component.css']
})
export class IngredientPopupComponent implements OnInit{

  @ViewChild('launchItem', { static: true })
  modalContent!: TemplateRef<any>;

  @Output()
  close: EventEmitter<boolean> = new EventEmitter<boolean>

  @Output()
  emitIngredient:EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>

  public modalService = inject(NgbModal);

  ingredientsToPaginate:Ingredient[] = []

  ingredientList:Ingredient[]=[];

  actualPage:number = 1;

  pageMaxQnt:number = 1;

  numberPerPage = 10;

  public form:FormGroup;

  allCheckboxChecked:boolean = false;

  loading = false;

    //modal
    measurementUnit = [
      { name: 'un' },
      { name: 'g' },
      { name: 'kg' },
      { name: 'mL' },
      { name: 'L' },
    ];

    itemTypes:object[] = [];

  constructor(
    public formBuilder:FormBuilder,
    private storageService:StorageService
  ){
    // Modallllzim
    this.form = this.formBuilder.group({
      ingredientName: ['',
        Validators.required
      ],
      typeToggle: [false,
        Validators.required
      ],
      itemType: {
        value:'',
        disabled:true
      },
      itemTypes: ['',
        Validators.required
      ],
      measurementUnit: ['',
        Validators.required
      ],
      qtValue: ['',
        Validators.required
      ],
      qt: ['',
        Validators.required,
      ],
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getData();
    this.modalService.open(this.modalContent, { size: 'xl' });
  }

  async getData() {
    this.loading = true;
    try {
      const data = await firstValueFrom(this.storageService.getStorage());
      data.map((ingredient: StorageDTO) => {

        this.itemTypes.push({ name: ingredient.typeName });
      });
      this.loading = false;
    }
    catch(error: any) {
      console.log(error);
    }
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

  submitIngredient() {
    if(this.form.valid){
      const ingredientToList:Ingredient = {
        checked: false,
        id: 0,
        name: this.form.value.name,
        qt: this.form.value.qt,
        un: '',
        portionSize: 0,
        portionSum: 0,
        typeName: '',
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

  submitForm() {
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
    this.modalService.dismissAll()
    this.ingredientList = [];
  }

  numberOnly(event: KeyboardEvent): boolean {
    const key = event.key;

    if (/^\d$/.test(key)) {
      return true;
    }
    return false;
  }

  addIngredient() {
    if (this.form.valid) {
      const ingredientToList:Ingredient = {
        checked: false,
        id: 0,
        name: this.form.value.ingredientName,
        un: this.form.value.measurementUnit,
        qt: this.form.value.qt,
        portionSize: this.form.value.qtValue,
        portionSum: parseInt(this.form.value.qt) * parseInt(this.form.value.qtValue),
        typeName: this.form.value.itemType ? this.form.value.itemType : this.form.value.itemTypes,
      }

      this.ingredientList.push(ingredientToList);
    }
  }

  toggleNewType() {
    if (this.form.get('typeToggle')?.value) {
      this.form.get('itemType')?.disable();
      this.form.get('itemTypes')?.enable();
    }
    else {
      this.form.get('itemType')?.enable();
      this.form.get('itemTypes')?.disable();
    }
  }
}
