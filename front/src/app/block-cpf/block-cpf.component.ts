import { Component, OnInit } from '@angular/core';
import { CpfService } from '../providers/cpf.service';

@Component({
  selector: 'app-block-cpf',
  templateUrl: './block-cpf.component.html',
  styleUrls: ['./block-cpf.component.scss']
})
export class BlockCpfComponent implements OnInit {
  public cpf: string = '';
  public view = 'entry';
  public lottie;
  constructor(private cpfService: CpfService) { }

  ngOnInit() {
  }

  submit(){


    this.cpfService.block(this.cpf).subscribe(res => {
      this.lottie = {
        path: 'assets/lottie/block.json',
        renderer: 'canvas',
        autoplay: true,
        loop: false
      };
      this.view = 'result';

    },error => {
      if(error.status === 400){
        this.lottie = {
          path: 'assets/lottie/invalid.json',
          renderer: 'canvas',
          autoplay: true,
          loop: false
        };
        this.view = 'invalid-cpf';
      }else{
        if(error.status === 409){
          this.lottie = {
            path: 'assets/lottie/invalid.json',
            renderer: 'canvas',
            autoplay: true,
            loop: false
          };
          this.view = 'already-blocked';
      }
    }
    });
  }

  public reset(){
    this.view = 'entry';
  }

}
