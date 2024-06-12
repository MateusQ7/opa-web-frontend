import { Component,OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs'
import { AuthService } from 'src/app/services/auth/auth.service';
import { Menu } from 'src/app/services/menu/menu.interface';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  showModal = false;

  loading = false;

  menuList:Menu[]=[]

  constructor(
    public auth:AuthService,
    private menuService:MenuService
  ){}

  async ngOnInit(): Promise<void> {
    await this.getData()
  }

  async getData(){
    try{
      const data = await firstValueFrom(this.menuService.getMenu());
      this.menuList = [];
      data.map((menu: Menu) => {
          this.menuList.push({
            id:menu.id,
            name:menu.name,
            description:menu.description,
            price:menu.price,
            items: [],
          });
        })
      this.loading = false;
    }catch(error: any){
      console.log(error);
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.getData();
  }

  public handleShowModal() {
    this.showModal = !this.showModal
  }
}
