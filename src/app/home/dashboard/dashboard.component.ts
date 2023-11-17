import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import {Chart, registerables} from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  ngOnInit(): void {
    this.RenderChart();
  }

  RenderChart(){
    const myChart = new Chart("graph1", {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  string = 'Dashboard';

  constructor(
    public auth:AuthService
  ){}
}
