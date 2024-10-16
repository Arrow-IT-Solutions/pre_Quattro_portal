import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  basicData: any;
  basicOptions: any;
  ngOnInit(){
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [
          {
              label: 'Visitors',
              data: [540, 325, 702, 620, 500, 500, 500],
              backgroundColor: ['rgba(239,82,83,.4)'],
              borderColor: ['#EF5253'],
              borderWidth: 2,
              
          }
      ]
  };

  this.basicOptions = {
    plugins: {
        legend: {
            labels: {
                color: textColor
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                color: textColorSecondary
            },
            grid: {
                color: surfaceBorder,
                drawBorder: false
            }
        },
        x: {
            ticks: {
                color: textColorSecondary
            },
            grid: {
                color: surfaceBorder,
                drawBorder: false
            }
        }
    }
}; 
  }

}
