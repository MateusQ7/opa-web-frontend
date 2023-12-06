import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Chart } from 'chart.js/auto'
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { firstValueFrom } from 'rxjs';
import { PayedBills } from 'src/app/services/dashboard/payedBills';
import * as bootstrap from 'bootstrap';
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
    const tooltipTriggetList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    tooltipTriggetList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl)
    });

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

  createMemberChart(data: PayedBills[]) {
    const genders: string[] = ['0', '1', '2'];
    let info: { [key: string]: { [key: string]: number } } = {};
    let ageRanges: string[] = ['0 - 20', '21 - 30', '31 - 40', '41 - 50', '51 - 60', '60+'];

    genders.forEach((gender) => {
      info[gender] = {
        '0 - 20': 0,
        '21 - 30': 0,
        '31 - 40': 0,
        '41 - 50': 0,
        '51 - 60': 0,
        '60+': 0,
        'total': 0,
      }
    });

    data.forEach((data) => {
      const gender = data.personInfos[0].gender;
      const birthDate = new Date(data.personInfos[0].birthDate);
      const age = this.calculateAge(birthDate);

      let ageRange:string = this.getAgeRange(age);
      info[gender][ageRange] += data.totalValue;
      info[gender]['total'] += data.totalValue;
    });

    let dataSets = [];

    for (const key in info) {
      if (info.hasOwnProperty(key)) {
        const currentGender = info[key];
        if (currentGender['total'] != 0) {
          dataSets.push({
            label: key == '0' ? 'Outros' : key == '1' ? 'Homem' : 'Mulher',
            data: Object.values(currentGender).slice(0, -1),
            backgroundColor: key == '0' ? '#fff3cd' : key == '1' ? '#9ec5fe' : '#f1aeb5',
          })
        }
      }
    }

    this.memberChart = new Chart('graph-gender-member', {
      type: 'bar',
      data: {
        labels: ageRanges,
        datasets: dataSets,
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

  createLocationChart(data: PayedBills[]) {
    const neighborhoodCount: { [key: string]: Set<number> } = {};

    data.forEach((item) => {
      item.personInfos.forEach((person) => {
        if (!neighborhoodCount[person.neighborhood]) {
          neighborhoodCount[person.neighborhood] = new Set();
        }
        neighborhoodCount[person.neighborhood].add(person.id);
      });
    });

    const sortedNeighborhoods = Object.entries(neighborhoodCount)
      .map(([name, ids]) => ({ name, count: ids.size }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    this.memberChart = new Chart('graph-location-member', {
      type: 'doughnut',
      data: {
        labels: sortedNeighborhoods.map((row) => row.name),
        datasets: [
          {
            label: 'Clientes',
            data: sortedNeighborhoods.map((row) => row.count),
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

  calculateAge(birthDate: Date): number {
    const today = new Date();
    const birthYear = birthDate.getFullYear();
    const currentYear = today.getFullYear();
    let age = currentYear - birthYear;

    // Check if already had birthday this year
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  getAgeRange(age: number): string {
    if (age <= 20) {
      return '0 - 20';
    } else if (age <= 30) {
      return '21 - 30';
    } else if (age <= 40) {
      return '31 - 40';
    } else if (age <= 50) {
      return '41 - 50';
    } else if (age <= 60) {
      return '51 - 60';
    }

    return '60+';
  }

  async getData() {
    try {
      const data = await firstValueFrom(this.dashboardService.getPayedBills());
      let revenueValue = 0;
      let bills = 0;
      for (const bill of data) {
        bills++;
        revenueValue += bill.totalValue;
      }

      this.createRevenueChart(data);
      this.createMemberChart(data);
      this.createLocationChart(data);
      this.createTopProducts(data);

      this.revenueValue = revenueValue.toFixed(2).replace('.', ',');
      this.ticketValue = (revenueValue / bills).toFixed(2).replace('.', ',');
    } catch(error: any){
      console.log(error);
    }
  }

}
