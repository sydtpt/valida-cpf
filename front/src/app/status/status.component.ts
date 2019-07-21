import { Component, OnInit } from '@angular/core';
import { StatusService } from '../providers/status.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  public runningDate;
  public runningTime: string = '';
  public totalConsult: number;
  public totalBlocked: number;
  constructor(private statusService: StatusService, private router: Router) { }

  ngOnInit() {
    this.statusService.getStatus().subscribe((res: any) => {
      setInterval(() => {
        this.runningDate = new Date(res.startedTime)
        this.totalConsult = res.total_consult_requests;
        this.totalBlocked = res.total_blocked;
        debugger;
        this.runningTime = this.getRunningTimeAsString();
      }, 1000);
    });
  }

  back(){
    this.router.navigate(['/validation']);
  }


  private getRunningTimeAsString() {
    let newDate = new Date();
    let newStamp = newDate.getTime();
    let diff = Math.round((newStamp - this.runningDate) / 1000);

    const d = Math.floor(diff / (24 * 60 * 60));
    diff = diff - (d * 24 * 60 * 60);
    const h = Math.floor(diff / (60 * 60));
    diff = diff - (h * 60 * 60);
    const m = Math.floor(diff / (60));
    diff = diff - (m * 60);
    const s = diff;

    if (d > 0) {
      return `${d} dias, ${h} horas, ${m} minuto(s), ${s} segundo(s)`;
    }
    if(h > 0){
      return `${h} hora(s), ${m} minuto(s), ${s} segundo(s)`;
    }
    return `${m} minuto(s), ${s} segundo(s)`;
  }

}
