import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from "../../models/company.model";
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-searchvehicle',
  templateUrl: './searchvehicle.component.html',
  styleUrls: ['./searchvehicle.component.css'],
})
export class SearchvehicleComponent implements OnInit {

  companyData!: Company; //! significa que se inicializara mas adelante
  dataSource_company = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'services', 'photo'];

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  constructor(private companyDataService: FastporteDataService, private router: Router) {
    this.companyData = {} as Company;
  }

  ngOnInit(): void {
    this.dataSource_company.paginator = this.paginator;
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.companyDataService.getAllCompanies().subscribe((res: any) => {
      this.dataSource_company.data = res;
    })
  }

  searchByCompanyName(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource_company.filter = filterValue.trim().toLowerCase();

    if (this.dataSource_company.paginator) {
      this.dataSource_company.paginator.firstPage();
    }
  }

  getRow(row: { id: any; }){
    console.log("Row clicked: ");
    console.log(row);
    this.router.navigateByUrl(`/company/${row.id}`);
  }
}
