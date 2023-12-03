import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import Chart, { ChartItem } from 'chart.js/auto'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public chart: any;
  public perMonthRevenue: number[] = [];
  public perMonthTicket: number[] = [];

  string = 'Dashboard';

  billing:string = `18.309,35`

  ticket:string =`1.309,42`


  constructor(
    public auth:AuthService
  ){}

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.chart = new Chart('graph-target-member', {
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
    })


  }
}
