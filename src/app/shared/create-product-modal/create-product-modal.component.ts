import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ListItem } from 'ng-multiselect-dropdown/multiselect.model';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ProductService } from 'src/app/services/product/product.service';
import { CreateProductDto } from 'src/app/home/dtos/CreateProductDto';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductType } from './createProduct.interface';
import { MenuService } from 'src/app/services/menu/menu.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'opa-create-product-modal',
  templateUrl: './create-product-modal.component.html',
  styleUrls: ['./create-product-modal.component.css']
})
export class CreateProductModalComponent {
  @ViewChild('createProduct', { static: true })
  modalContent!: TemplateRef<any>;

  @Input() showModal: boolean = false;
  @Output() openModal = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();
  public stockProducts: any[] = []
  public selectedItems: any[] = []
  public measurementUnits = [
    'KG', 'UN', 'G','L','ML'
  ]

  public modalForm!: FormGroup;

  public productTypes: ProductType[] = [];

  private modalService = inject(NgbModal);

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    public storageService: StorageService,
    public productService: ProductService,
    public menuService: MenuService,
  ) {
    this.modalForm = this.formBuilder.group({
      productName: ['',
        Validators.required
      ],
      typeToggle: [false,
        Validators.required
      ],
      productType: {
        value:'',
        disabled:true
      },
      productTypes: ['',
        Validators.required
      ],
      productPrice: ['',
        Validators.required,
      ],
      productDescription: ['',
        Validators.required,
      ],
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getData();
    this.modalService.open(this.modalContent, { size: 'xl' });
  }

  async getData() {
    try {
      const data = await firstValueFrom(this.menuService.getMenu());
      for (const product of data) {
        if (this.productTypes.every(item => item.name !== product.type)) {
          this.productTypes.push({ name: product.type });
        }
      }
    }
    catch(error: any) {
      console.log(error);
    }
  }

  public toggleNewType() {
    if (this.modalForm.get('typeToggle')?.value) {
      this.modalForm.get('productType')?.disable();
      this.modalForm.get('productTypes')?.enable();
    }
    else {
      this.modalForm.get('productType')?.enable();
      this.modalForm.get('productTypes')?.disable();
    }
  }

  public numberOnly(event: KeyboardEvent): boolean {
    const key = event.key;

    if (/^\d$/.test(key)) {
      return true;
    }
    return false;
  }

  public closePopUp() {
    this.modalService.dismissAll()
  }

  public submitForm() {
    const productType = this.modalForm.get("productType")?.value ?
      this.modalForm.get("productType")?.value :
      this.modalForm.get("productTypes")?.value;

    const product = {
      productName: this.modalForm.get("productName")?.value,
      productPrice: this.modalForm.get("productPrice")?.value,
      productDescription: this.modalForm.get("productDescription")?.value,
      productItems: [],
      type: productType,
    } as CreateProductDto

    this.productService.createProduct([product]).subscribe(
      (res) => {
        console.log(res)
        location.reload();
      },
      (err: HttpErrorResponse) => {
        console.log(err)
      }
    )

    this.closePopUp();
  }

}
