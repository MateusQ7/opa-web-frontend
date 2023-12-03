import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Chart } from 'chart.js/auto'
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { firstValueFrom } from 'rxjs';
import { PayedBills } from 'src/app/services/dashboard/payedBills';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public revenueChart: any;
  public memberChart: any;
  public locationChart: any;
  public perMonthRevenue: number[] = [];
  public perMonthTicket: number[] = [];
  public revenueValue!: string;
  public ticketValue!: string;
  public productList: any[] = [];

  string = 'Dashboard';

  constructor(
    public auth:AuthService,
    private dashboardService: DashboardService
  ){}

  async ngOnInit(): Promise<void> {
    await this.getData();
  }

  createRevenueChart(data: PayedBills[]) {
    let info = [
      { month: 'jan', value: 0, count: 0 },
      { month: 'fev', value: 0, count: 0 },
      { month: 'mar', value: 0, count: 0 },
      { month: 'abr', value: 0, count: 0 },
      { month: 'mai', value: 0, count: 0 },
      { month: 'jun', value: 0, count: 0 },
      { month: 'jul', value: 0, count: 0 },
      { month: 'ago', value: 0, count: 0 },
      { month: 'set', value: 0, count: 0 },
      { month: 'out', value: 0, count: 0 },
      { month: 'nov', value: 0, count: 0 },
      { month: 'dez', value: 0, count: 0 },
    ];

    for (const bill of data) {
      const month = bill.monthDate;
      info[month].value += bill.totalValue;
      info[month].count += 1;
    }

    this.revenueChart = new Chart('graph-target-revenue', {
      type: 'bar',
      data: {
        labels: info.map(row => row.month),
        datasets: [
          {
            label: 'Ticket Médio em R$',
            type: 'line',
            data: info.map((row) => {
              if (row.count == 0) {
                return 0;
              }
              return row.value / row.count;
            }),
            fill: false,
            backgroundColor: '#956004',
            borderColor: '#956004',
            borderWidth: 2,
            pointRadius: 2,
            pointBackgroundColor: '#956004',
          },
          {
            label: 'Faturamento em R$',
            type: 'bar',
            data: info.map(row => row.value),
            backgroundColor: '#eec222',
          }
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Valor em R$'
            }
          }
        }
      }
    });
  }

  createMemberChart() {
    this.memberChart = new Chart('graph-gender-member', {
      type: 'bar',
      data: {
        labels: [
          '0 - 20',
          '21 - 30',
          '31 - 40',
          '41 - 50',
          '51 - 60',
          '60+'
        ],
        datasets: [
          {
            label: 'Mulher',
            data: [10, 20, 15, 25, 22, 10],
            backgroundColor: '#f1aeb5',
          },
          {
            label: 'Homem',
            data: [20, 40, 30, 50, 44, 10],
            backgroundColor: '#9ec5fe',

          },
          {
            label: 'Outros',
            data: [15, 25, 20, 30, 27, 10],
            backgroundColor: '#fff3cd',
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: 'y',
        scales: {
          x: {
            stacked: true,
            display: false,
          },
          y: {
            stacked: true,
            title: {
              display: true,
            },
          }
        }
      }
    });
  }

  createLocationChart() {
    this.memberChart = new Chart('graph-location-member', {
      type: 'doughnut',
      data: {
        labels: ['Messejana', 'Montese', 'Cambeba', 'Pici', 'Quintino Cunha'],
        datasets: [
          {
            label: 'Clientes',
            data: [10, 13, 7, 3, 18],
            backgroundColor: ['#f1aeb5', '#9ec5fe', '#fff3cd', '#c3e6cb', '#dfd2f7'],
          }
        ],
      }
    });
  }

  createTopProducts(data: PayedBills[]) {
    let topProducts: any = {};
    for (const bill of data) {
      const baseProductName = bill.productName.replace(/\d+$/, '').trim();

      if (!topProducts[baseProductName]) {
        topProducts[baseProductName] = {
          productName: baseProductName,
          totalValue: 0
        };
      }

      topProducts[baseProductName].totalValue += bill.totalValue;
    }

    this.productList = Object.values(topProducts).sort((a: any, b: any) => b.totalValue - a.totalValue).slice(0, 5);
  }

  async getData() {
    try {
      const data = await firstValueFrom(this.dashboardService.getPayedBills());
      let revenueValue = 0;
      let bills = 0;

      let topProducts: any = {};
      for (const bill of data) {
        bills++;
        revenueValue += bill.totalValue;

        const baseProductName = bill.productName.replace(/\d+$/, '').trim();

        if (!topProducts[baseProductName]) {
          topProducts[baseProductName] = {
            productName: baseProductName,
            totalValue: 0
          };
        }

        topProducts[baseProductName].totalValue += bill.totalValue;
      }

      const topProductsList = Object.values(topProducts).sort((a: any, b: any) => b.totalValue - a.totalValue).slice(0, 5);
      console.log(topProductsList);
      this.createRevenueChart(data);
      this.createTopProducts(data);

      this.revenueValue = revenueValue.toFixed(2).replace('.', ',');
      this.ticketValue = (revenueValue / bills).toFixed(2).replace('.', ',');

    } catch(error: any){
      console.log(error);
    }
  }

}
