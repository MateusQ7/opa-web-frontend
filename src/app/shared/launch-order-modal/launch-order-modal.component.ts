import { Component,Output,EventEmitter, OnInit, inject, ViewChild, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'src/app/services/table/table.interface';
import { TableService } from 'src/app/services/table/table.service';
import { WaiterService } from 'src/app/services/waiter/waiter.service';
import { MenuService } from 'src/app/services/menu/menu.service';
import { Menu } from 'src/app/services/menu/menu.interface';
import { Customer } from 'src/app/services/customer/customer.interface';
import { firstValueFrom } from 'rxjs';
import { InProgressTables } from 'src/app/home/order/InProgressTables.interface';
import { LauchOrder } from './lauchOrder.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderComponent } from 'src/app/home/order/order.component';

@Component({
  selector: 'opa-launch-order-modal',
  templateUrl: './launch-order-modal.component.html',
  styleUrls: ['./launch-order-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LaunchOrderModalComponent implements OnInit {

  @ViewChild('launchOrder', { static: true })
  modalContent!: TemplateRef<any>;

  @Output()
  emitOrders:EventEmitter<LauchOrder[]> = new EventEmitter<LauchOrder[]>

  @Output()
  close: EventEmitter<boolean> = new EventEmitter<boolean>

  choosenPersonNames:string[] = [];

  loading = false;

  menu:Menu[] = []

  tablesAvailables:InProgressTables[] = []

  orderList:LauchOrder[] = []

  selectedTable!:Table;

  selectedCustomers:Customer[] = [];

  form!:FormGroup

  allCheckboxChecked:boolean = false;

  isAnyCheckBoxChecked:boolean = false;

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
    public menuService:MenuService,
    public orderCompoenent:OrderComponent
  ) {
    this.form = this.formBuilder.group({
      productName:['',
        Validators.required,
      ],
      tableId:['',
        Validators.required,
      ],
      customersList:['',
        Validators.required,
      ],
      qt:['',
        [
          Validators.required,
          Validators.maxLength(4),
        ],
      ],
      status:['',
        Validators.required,
      ],
    });
  }

  async ngOnInit(): Promise<void> {
    await this.getData()
    this.modalService.open(this.modalContent, { size: 'xl' });
  }

  async getData() {
    this.loading = true;
    try{
      const menuData = await firstValueFrom(this.menuService.getMenu());
      menuData.map((menu: Menu) => {
        this.menu.push({
          id:menu.id,
          name:menu.name,
          description:menu.description,
          price:menu.price,
          type:menu.type,
          items: [],
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

  allChecked() {
    if (this.allCheckboxChecked) {
      this.orderList.map((ingredient) => {
        ingredient.checked = false;
        this.isAnyCheckBoxChecked = false;
      })
    }
    else {
      this.orderList.map((ingredient) => {
        ingredient.checked = true;
        this.isAnyCheckBoxChecked = true;
      })
    }

    this.allCheckboxChecked = !this.allCheckboxChecked
  }

  checkOrder(index:number) {
    this.allCheckboxChecked = false;
    this.orderList[index].checked = !this.orderList[index].checked;

    if (this.orderList[index].checked) {
      this.isAnyCheckBoxChecked = true;
    }
    else {
      let found = false;
      this.orderList.map((ingredient) => {
        if (ingredient.checked) {
          this.isAnyCheckBoxChecked = true;
          found = true;
        }
      });

      if (!found) {
        this.isAnyCheckBoxChecked = false;
      }
    }
  }

  addOrder() {
    if(this.form.valid) {
      const menuItem = this.findOrderMenu(parseInt(this.form.value.productName));

      let formattedNames = 'Não foi encontrado nenhum cliente.'
      if (this.choosenPersonNames.length != 0) {
        formattedNames = this.formatNames(this.choosenPersonNames);
      }

      const order:LauchOrder = {
        checked:false,
        menuItem: menuItem,
        status:this.form.value.status,
        tableId:this.form.value.tableId,
        customersList: this.form.value.customersList,
        totalValue: (parseInt(this.form.value.qt) * parseInt(String(menuItem.price))),
        quantity:this.form.value.qt,
        formattedNames:formattedNames,
      }

      this.orderList.push(order);
    }
  }

  closePopUp() {
    this.close.emit(false);
    this.modalService.dismissAll()
    this.orderList = [];
  }

  async submitForm() {
    this.emitOrders.emit(this.orderList);
    this.modalService.dismissAll();
  }

  updateTable(event:any) {
    const table = this.tablesAvailables.find((e:InProgressTables)=>{
      return e.id === event.id;
    })
    if(table){
      this.selectedTable = table.table
      this.selectedCustomers = this.selectedTable.customers
    }
  }

  findOrderMenu(id:number):Menu {
    const menuItem = this.menu.find((e:Menu)=>{
      return e.id === id;
    })
    if(menuItem){
      return menuItem;
    }
    else{
      return {
        id:0,
        name:'Item não encontrado no menu',
        description:'Item não encontrado no menu',
        price:0.00,
        type:'oloco',
        items: [],
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

  addCustomerToOrderTable($event:any) {
    this.choosenPersonNames.push($event.name);
  }

  removeCustomerToOrderTable($event:any) {
    this.choosenPersonNames.splice(this.choosenPersonNames.indexOf($event.name), 1);
  }

  formatNames(names:string[]) {
    return names.join(', ');
  }

  removeOrderFromTable() {
    if (this.allCheckboxChecked) {
      this.orderList = [];
      return
    };

    this.orderList = this.orderList.filter(order => order.checked === false);
    this.isAnyCheckBoxChecked = false;
  }

}
