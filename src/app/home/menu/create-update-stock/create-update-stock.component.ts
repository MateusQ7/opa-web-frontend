import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { CreateProductDto, ProductItemsDto } from '../../dtos/CreateProductDto';
import { ProductService } from '../../../services/product/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-create-update-stock-item',
  templateUrl: './create-update-stock.component.html',
  styleUrls: ['./create-update-stock.component.css']
})
export class CreateUpdateProductComponent implements OnInit {

  @Input() showModal: boolean = false;
  @Output() openModal = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();
  public stockProducts: any[] = []
  public selectedItems: any[] = []
  public measurementUnits = [
    'KG', 'UN', 'G'
  ]

  form = this.formBuilder.group({
    productName: new FormControl({ disabled: false, value: '' }),
    productPrice: new FormControl({ disabled: false, value: 0.00 }),
    stockProductsForm: this.formBuilder.array([]),
  });

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    public storageService: StorageService,
    public productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.storageService.searchStockItem("").subscribe(stockDtos => {
      this.stockProducts = stockDtos
    })

    // this.form.get('stockProductName')?.valueChanges.subscribe(value => {
    // this.stockService.searchStockItem(value).subscribe(stockDtos => {
    //   this.stockProducts = stockDtos
    // })
    // })
  }

  get stockProductsForm() {
    return this.form.controls["stockProductsForm"] as FormArray;
  }

  private newItemForm(item: any): FormGroup {
    const newForm = this.formBuilder.group({
      stockProductId: new FormControl({ disabled: true, value: item.id }),
      measurementUnit: new FormControl({ disabled: false, value: item.measurementUnit }),
      stockProductName: new FormControl({ disabled: false, value: item.productDescription }),
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
      productName: this.form.get("productName")?.value,
      productPrice: this.form.get("productPrice")?.value,
      productItems: this.stockProductsForm.getRawValue(),
    } as CreateProductDto
    this.productService.createProduct(product).subscribe(value => {
      this.closeModal.emit()
    }, (err: HttpErrorResponse) => {
      console.log(err)
    })
  }

}
