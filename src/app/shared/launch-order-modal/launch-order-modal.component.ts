import { Component,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Table } from 'src/app/services/table/table.interface';
import { TableService } from 'src/app/services/table/table.service';
import { WaiterService } from 'src/app/services/waiter/waiter.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { Menu } from 'src/app/services/menu/menu.interface';
import { Order } from 'src/app/services/order/order.interface';

@Component({
  selector: 'opa-launch-order-modal',
  templateUrl: './launch-order-modal.component.html',
  styleUrls: ['./launch-order-modal.component.css']
})
export class LaunchOrderModalComponent {

  @Output()
  emitOrders:EventEmitter<Order[]> = new EventEmitter<Order[]>

  @Output()
  close: EventEmitter<boolean> = new EventEmitter<boolean>

  orderList:Order[]=[
    {
      id:3,
      checked:false,
      menuItem:{
        id:4,
        name:'catiaaaaaas',
        description:`aoskdoaks`,
        value:19.99
      },
      clients:['renatin','oclin','power ranger rosa'],
      quantity:3,
      status:2,
      table:{
        token:`sim`,
        id:25,
        openTime:`19:25`,
        responsableWaiter:'jorgin amado',
        clients:[
          `ricardo`,
          `moreno`,
          `cabeca`
        ]
      }
    },
    {
      id:1,
      checked:false,
      menuItem:{
        id:4,
        name:'catinhssssssssssssslas',
        description:`aoskdoaks`,
        value:19.99
      },
      clients:['renatin','oclin','power ranger rosa'],
      quantity:3,
      status:1,
      table:{
        token:`sim`,
        id:30,
        openTime:`19:25`,
        responsableWaiter:'hernandes',
        clients:[
          `carlos`,
          `adriano`,
          `cabeca`
        ]
      }
    },
    {
      id:2,
      checked:false,
      menuItem:{
        id:4,
        name:'catinha de parangolas',
        description:`aoskdoaks`,
        value:19.99
      },
      clients:['renatin','oclin','power ranger rosa'],
      quantity:3,
      status:3,
      table:{
        token:`sim`,
        id:40,
        openTime:`19:25`,
        responsableWaiter:'pedro cailow',
        clients:[
          `hernandes`,
          `jorge ombrinho`,
          `cabeca`
        ]
        }
    },
  ]

  selectedTable!:Table;

  selectedClients:string[]=[];

  form!:FormGroup

  allCheckboxChecked:boolean = false;

  constructor(
    private formBuilder:FormBuilder,
    public waiterService:WaiterService,
    public tableService:TableService,
    public menuService:MenuService
  ){
    this.form = this.formBuilder.group({
      name:['',
        Validators.required
      ],
      table:['',
        Validators.required
      ],
      clients:[false,
        Validators.required
      ],
      qt:['',
      [
        Validators.required,
        Validators.maxLength(4)
      ]
      ],
      responsableWaiter:['',
        Validators.required
      ],
      status:['',
        Validators.required
      ]
    })
  }

  allChecked(){
    if(this.allCheckboxChecked){
      this.orderList.map((ingredient)=>{
        ingredient.checked = false;
      })
    }
    else{
      this.orderList.map((ingredient)=>{
        ingredient.checked = true;
      })
    }
    this.allCheckboxChecked = !this.allCheckboxChecked
  }

  checkOrder(index:number){
    this.allCheckboxChecked = false;
    this.orderList[index].checked = !this.orderList[index].checked;
  }

  deleteAll(){
    this.orderList.length = 0;
    this.allCheckboxChecked = false;
  }

  deleteOrder(index:number){
    this.orderList.splice(index, 1);
  }

  submitOrder(){
    if(this.form.valid){
      const menuItem = this.findOrderMenu(parseInt(this.form.value.name))
      const order:Order ={
        id:90000,
        checked:false,
        menuItem:menuItem,
        clients:this.form.value.clients,
        quantity:this.form.value.qt,
        status:this.form.value.status,
        table:this.form.value.table,
      }
      this.orderList.push(order);
    }
  }

  closePopUp() {
    this.close.emit(false);
    console.log('and WE OCUPPYYYYYYYY')
  }

  submitForm(){
    this.emitOrders.emit(this.orderList);
  }

  updateTable(){
    const table = this.tableService.tables.find((e:Table)=>{
      return e.id === parseInt(this.form.value.table);
    })
    if(table){
      this.selectedTable = table;
      this.selectedClients = this.selectedTable.clients
    }
  }

  findOrderMenu(id:number):Menu{
    const menuItem = this.menuService.menu.find((e:Menu)=>{
      return e.id === parseInt(this.form.value.name);
    })
    if(menuItem){
      return menuItem;
    }
    else{
      return {
        id:1,
        name:'Item não encontrado no menu',
        description:'Item não encontrado no menu',
        value:0.00
      }
    }
  }

}