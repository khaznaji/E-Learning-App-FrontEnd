import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  ngOnInit() {
    var myChart = new Chart("myChart", {
      type: 'bar',
      data: {
          labels: ['php', 'js', 'spring', 'java', 'html', 'css'],
          datasets: [{
              label: 'Number of inscriptions',
              data: [80, 19,90,45, 30, 25],
              backgroundColor: [
                '#AF3065',
              ],
        
              borderRadius:5,
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                min: 0,
                max: 100
                
                
                  
              }
          }
      }
  });
  
  }
}
