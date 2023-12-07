import { Component,Output,EventEmitter, OnInit, inject, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'src/app/services/table/table.interface';
import { TableService } from 'src/app/services/table/table.service';
import { WaiterService } from 'src/app/services/waiter/waiter.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { Menu } from 'src/app/services/menu/menu.interface';
import { Order } from 'src/app/services/order/order.interface';
import { Customer } from 'src/app/services/customer/customer.interface';
import { firstValueFrom } from 'rxjs';
import { InProgressTables } from 'src/app/home/order/InProgressTables.interface';
import { OrderToBackend } from 'src/app/services/order/orderToBackend.interface';
import { LauchOrder } from './lauchOrder.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'opa-launch-order-modal',
  templateUrl: './launch-order-modal.component.html',
  styleUrls: ['./launch-order-modal.component.css']
})
export class LaunchOrderModalComponent implements OnInit{

  @ViewChild('launchOrder', { static: true })
  modalContent!: TemplateRef<any>;

  @Output()
  emitOrders:EventEmitter<LauchOrder[]> = new EventEmitter<LauchOrder[]>

  @Output()
  close: EventEmitter<boolean> = new EventEmitter<boolean>

  loading = false;

  menu:Menu[] = []

  tablesAvailables:InProgressTables[]=[]

  orderList:LauchOrder[]=[]

  selectedTable!:Table;

  selectedCustomers:Customer[]=[];

  form!:FormGroup

  allCheckboxChecked:boolean = false;

  orderStatus = [
    { id: 1, name: 'Em andamento' },
    { id: 2, name: 'Entregue' },
    { id: 3, name: 'Cancelado' },
  ]

  private modalService = inject(NgbModal);

  constructor(
    private formBuilder:FormBuilder,
    public waiterService:WaiterService,
    public tableService:TableService,
    public menuService:MenuService
  ){

    this.form = this.formBuilder.group({
      productName:['',
        Validators.required
      ],
      tableId:['',
        Validators.required
      ],
      customersList:[[],
        Validators.required
      ],
      qt:['',
      [
        Validators.required,
        Validators.maxLength(4)
      ]
      ],
      status:['',
        Validators.required
      ]
    })
  }

  async ngOnInit(): Promise<void> {
    await this.getData()
    this.modalService.open(this.modalContent, { size: 'xl' });
  }

  async getData(){
    this.loading = true;
    try{
      const menuData = await firstValueFrom(this.menuService.getMenu());
      menuData.map((menu: Menu) => {
        this.menu.push({
          id:menu.id,
          name:menu.name,
          description:menu.description,
          price:menu.price
        });
      });
      const menuTable = await firstValueFrom(this.tableService.getInProgressTables());
      menuTable.map((table:InProgressTables)=>{
        this.tablesAvailables.push({
          id:table.id,
          table:table.table,
          orders:table.orders,
          orderQt:table.orderQt
        })
      })
      this.loading = false;
      }catch(error: any){
        console.log(error);
      }
  }

  allChecked(){
    // console.log(`alow`)
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
      const menuItem = this.findOrderMenu(parseInt(this.form.value.name));

      const order:LauchOrder ={
        checked:false,
        menuItem: menuItem,
        status:this.form.value.status,
        tableId:this.form.value.tableId,
        customerList: [this.form.value.customerList],
        totalValue: (parseInt(this.form.value.qt) * parseInt(String(menuItem.price))),
        quantity:this.form.value.qt
      }
      this.orderList.push(order);
    }
  }

  closePopUp() {
    this.close.emit(false);
  }

  submitForm(){
    this.emitOrders.emit(this.orderList);
    this.closePopUp();
  }

  updateTable(event:any) {
    const table = this.tablesAvailables.find((e:InProgressTables)=>{
      return e.id === event.id;
    })
    if(table){
      this.selectedTable = table.table
      console.log(this.selectedTable);
      this.selectedCustomers = this.selectedTable.customers
      console.log(this.selectedTable.customers);
    }
  }

  findOrderMenu(id:number):Menu{
    const menuItem = this.menu.find((e:Menu)=>{
      return e.id === parseInt(this.form.value.name);
    })
    if(menuItem){
      return menuItem;
    }
    else{
      return {
        id:0,
        name:'Item não encontrado no menu',
        description:'Item não encontrado no menu',
        price:0.00
      }
    }
  }

  numberOnly(event: KeyboardEvent): boolean {
    const key = event.key;

    if (/^\d$/.test(key)) {
      return true;
    }
    return false;
  }

}
