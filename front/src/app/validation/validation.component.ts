import { Component, OnInit } from '@angular/core';
import { CpfService } from '../providers/cpf.service';
import {MatDialog} from '@angular/material/dialog';
import { BlockCpfComponent } from '../block-cpf/block-cpf.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {
  public cpf: string = '';
  public cpfHistory: string = '';
  public status: string = '';


  public lottie;

  constructor(private cpfService: CpfService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
  }


  submit() {
    this.cpfService.isBlocked(this.cpf).subscribe((res: any) => {
      this.cpfHistory = this.cpf;
      this.cpf = '';
      this.status = res.isBlocked ? 'blocked' : 'free'
      if (res.isBlocked) {
        this.lottie = {
          path: 'assets/lottie/block.json',
          renderer: 'canvas',
          autoplay: true,
          loop: false
        };

      } else {
        this.lottie = {
          path: 'assets/lottie/free.json',
          renderer: 'canvas',
          autoplay: true,
          loop: false
        };
      }
    }, error => {
      this.cpfHistory = this.cpf;
      this.cpf = '';
      this.status = 'invalid'
      this.lottie = {
        path: 'assets/lottie/invalid.json',
        renderer: 'canvas',
        autoplay: true,
        loop: false
      };
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(BlockCpfComponent,{

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  viewBlocked(){
    this.router.navigate(['/list']);
  }
  viewServer(){
    this.router.navigate(['/status']);
  }
}
