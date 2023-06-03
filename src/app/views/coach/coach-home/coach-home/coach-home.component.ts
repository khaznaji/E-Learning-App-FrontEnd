import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-coach-home',
  templateUrl: './coach-home.component.html',
  styleUrls: ['./coach-home.component.css']
})
export class CoachHomeComponent {
  ngOnInit() {
    var myChart = new Chart("myChart", {
      type: 'pie',
      data: {
          datasets: [{
              label: 'Number of Votes',
              data: [23, 10, 3, 5],
              backgroundColor: [
                'rgba(34, 83, 84, 1)',
                  'rgba(224, 129, 14, 1)',
                  'rgba(164, 12, 63, 1)',
                  'rgba(54, 54, 54, 1)',
                  
               
              ],
       
              borderRadius:5,
              borderWidth: 1
          }]
      },
      options: {
      
      }
    });
  }
}
