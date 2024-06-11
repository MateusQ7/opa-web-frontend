import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ProductService } from 'src/app/services/product/product.service';
import { CreateProductDto } from 'src/app/home/dtos/CreateProductDto';

@Component({
  selector: 'opa-create-product-modal',
  templateUrl: './create-product-modal.component.html',
  styleUrls: ['./create-product-modal.component.css']
})
export class CreateProductModalComponent {


  @Input() showModal: boolean = false;
  @Output() openModal = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();
  public stockProducts: any[] = []
  public selectedItems: any[] = []
  public measurementUnits = [
    'KG', 'UN', 'G','L','ML'
  ]

  public modalForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    public storageService: StorageService,
    public productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.modalForm = this.formBuilder.group({
      productName:['',
        Validators.required
      ],
      type:['',
        Validators.required
      ],
      productPrice:[0,
      Validators.required
    ],
      stockProductsForm: this.formBuilder.array([ ]),
    });

    this.storageService.searchStockItem("").subscribe(stockDtos => {
      this.stockProducts = stockDtos
    });

    // this.form.get('stockProductName')?.valueChanges.subscribe(value => {
    // this.stockService.searchStockItem(value).subscribe(stockDtos => {
    //   this.stockProducts = stockDtos
    // })
    // })
  }

  get stockProductsForm() {
    return this.modalForm.controls["stockProductsForm"] as FormArray;
  }

  private newItemForm(item: any): FormGroup {
    const newForm = this.formBuilder.group({
      stockProductId: new FormControl({ disabled: true, value: item.id }),
      measurementUnit: new FormControl({ disabled: false, value: item.measurementUnit }),
      stockProductName: new FormControl({ disabled: false, value: item.name }),
      isPortion: new FormControl({ disabled: false, value: false }),
      quantity: new FormControl({ disabled: false, value: item.quantity })
    })

    newForm.get("isPortion")?.valueChanges.subscribe((isPortion) => {
      if (isPortion) {
        newForm.get("measurementUnit")?.disable()
        newForm.get("measurementUnit")?.setValue("")
      } else {
        newForm.get("measurementUnit")?.enable()
      }
    })
    return newForm
  }

  public addProduct(event: any) {
    var item = JSON.parse(event.target.value);
    this.stockProductsForm.push(this.newItemForm(item))
    this.selectedItems.push(item)
  }

  public onItemSelect(item: ListItem) {
    this.selectedItems.push(item)
  }

  public stringify(object: any) {
    return JSON.stringify(object)
  }

  public search(text: string, item: any) {
    text = text.toLocaleLowerCase();
    return item.code.toLocaleLowerCase().indexOf(text) > -1 || item.countryName.toLocaleLowerCase() === text;
  }

  public handleCloseModal() {
    this.selectedItems = []
    this.closeModal.emit()
  }

  public saveProduct() {
    const product = {
      productName: this.modalForm.get("productName")?.value,
      productPrice: this.modalForm.get("productPrice")?.value,
      productDescription: 'Comida',
      productItems: this.stockProductsForm.getRawValue(),
      type:this.modalForm.get("type")?.value
    } as CreateProductDto

    this.productService.createProduct([product]).subscribe(value => {
    }, (err: HttpErrorResponse) => {
      console.log(err)
    })
    this.closeModal.emit();
  }

}
