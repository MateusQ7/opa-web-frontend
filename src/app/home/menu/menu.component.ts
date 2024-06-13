import { HttpErrorResponse } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs'
import { AuthService } from 'src/app/services/auth/auth.service';
import { Menu } from 'src/app/services/menu/menu.interface';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  createProductModal = false;

  loading = false;


  menuList: any = {};

  constructor(
    public auth: AuthService,
    private menuService: MenuService,
    private productService: ProductService
  ){}

  async ngOnInit(): Promise<void> {
    await this.getData()
  }

  async getData() {
    try{
      const data = await firstValueFrom(this.menuService.getMenu());

      for (const product of data) {
        const currentProductItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          type: product.type,
          items: product.items
        };

        if (this.menuList[product.type]) {
          this.menuList[product.type].push(currentProductItem);
        }
        else {
          this.menuList[product.type] = [currentProductItem];
        }
      }

      this.loading = false;
    }catch(error: any){
      console.log(error);
    }
  }

  showCreateProductModal() {
    this.createProductModal = !this.createProductModal
  }

  removeProductFromMenu(productId: number) {
    this.productService.removeProduct(productId).subscribe(
      (res) => {
        console.log(res)
        location.reload();
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
