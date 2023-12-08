import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewEncapsulation, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';
import { StorageDTO } from 'src/app/services/storage/storageDTO.interface';
import { StorageToBack } from 'src/app/services/storage/storageToBack.interface';
import { Ingredient } from 'src/app/shared/ingredient-popup/ingredient.interface';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StorageComponent implements OnInit {
  @Output()
  emitIngredient:EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>

  public modalService = inject(NgbModal);

  //modal
  measurementUnit = [
    { name: 'un' },
    { name: 'g' },
    { name: 'kg' },
    { name: 'mL' },
    { name: 'L' },
  ];

  itemTypes:object[] = [];

  form!: FormGroup;

  popUp = false;

  loading = false;

  typeCheckbox:boolean = false;

  ingredientList:Ingredient[] = [];

  constructor(
    private formBuilder:FormBuilder,
    private storageService:StorageService
  ) {
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
        this.itemTypes.push({ name: ingredient.typeName });
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
            productDescription:e.name,
            stockQuantity:e.qt,
            measurementUnit:e.un
          }
        );
      });
      this.storageService.submitStorage(ingredientsToBack).subscribe(e => {
        ingredients.map((ingredient:Ingredient) => {
          this.ingredientList.push(ingredient);
        });
      });
    }
    catch(error) {
      console.log(error);
    }
  }

  // Modal
  open(launchItem: TemplateRef<any>) {
    this.modalService.open(launchItem, { size: 'xl' });
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

  async submitForm() {
    console.log(this.ingredientList);
    this.emitIngredient.emit(this.ingredientList);
    this.modalService.dismissAll();
  }

  closePopUp() {
    console.log('close popup');
    this.modalService.dismissAll()
    this.ingredientList = [];
  }

}
