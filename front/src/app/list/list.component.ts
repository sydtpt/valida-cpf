import { Component, OnInit, ViewChild } from '@angular/core';
import { CpfService } from '../providers/cpf.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public list = [];

  displayedColumns: string[] = ['cpf', 'createdAt','remove'];
  dataSource;

  @ViewChild(MatSort, {static: true}) paginator: MatSort;



  constructor(private cpfService: CpfService,private router: Router) { }

  ngOnInit() {
    this.cpfService.getAll().subscribe((res: any) => {
      this.list = res.items;
      this.dataSource = new MatTableDataSource<CpfElement>(this.list);

    });
  }
  back(){
    this.router.navigate(['/validation']);
  }

  unblock(cpf: string){
    this.cpfService.unblock(cpf).subscribe(res => {
      this.list = this.list.filter(item => item.cpf !== cpf);
      this.dataSource = new MatTableDataSource<CpfElement>(this.list);
    },error => {

    })
  }

}
export interface CpfElement {
  cpf: string;
  createdAt: string;
}