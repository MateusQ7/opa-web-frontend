import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import Chart, { ChartItem } from 'chart.js/auto'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public revenueChart: any;
  public memberChart: any;
  public perMonthRevenue: number[] = [];
  public perMonthTicket: number[] = [];

  string = 'Dashboard';

  billing:string = `18.309,35`

  ticket:string =`1.309,42`


  constructor(
    public auth:AuthService
  ){}

  ngOnInit(): void {
    this.createRevenueChart();
    this.createMemberChart();
  }

  createRevenueChart() {
    this.revenueChart = new Chart('graph-target-revenue', {
      type: 'bar',
      data: {
        labels: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
        datasets: [
          {
            label: 'Ticket Médio em R$',
            type: 'line',
            data: [10, 20, 22, 20, 11, 15, 28, 31, 36, 40, 27, 21],
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
            data: [10, 20, 15, 25, 22, 30, 28, 13, 2, 15, 17, 29],
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
          '21 - 25',
          '26 - 30',
          '31 - 35',
          '36 - 40',
          '41 - 45',
          '46 - 50',
          '51 - 55',
          '56 - 60',
          '61 - 65',
          '66 - 70',
          '70+',
        ],
        datasets: [
          {
            label: 'Mulher',
            data: [10, 20, 15, 25, 22, 30, 28, 13, 2, 15, 17, 29],
            backgroundColor: '#f1aeb5',
          },
          {
            label: 'Homem',
            data: [20, 40, 30, 50, 44, 60, 56, 26, 4, 30, 34, 58],
            backgroundColor: '#9ec5fe',

          },
          {
            label: 'Outros',
            data: [15, 25, 20, 30, 27, 35, 33, 18, 7, 20, 22, 34],
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
}
