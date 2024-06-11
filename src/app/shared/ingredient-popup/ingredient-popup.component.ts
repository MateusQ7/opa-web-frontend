import { Component, EventEmitter, OnInit, Output, inject, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Ingredient, ItemType } from './ingredient.interface';
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

  measurementUnit = [
    { name: 'un' },
    { name: 'g' },
    { name: 'kg' },
    { name: 'mL' },
    { name: 'L' },
  ];

  itemTypes: ItemType[] = [];

  constructor(
    public formBuilder:FormBuilder,
    private storageService:StorageService
  ){
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
        if (!this.itemTypes.some(item => item.name == ingredient.typeName)) {
          this.itemTypes.push({ name: ingredient.typeName });
        };
      });
      this.loading = false;
    }
    catch(error: any) {
      console.log(error);
    }
  }

  submitForm() {
    this.emitIngredient.emit(this.ingredientList);
    this.closePopUp();
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
