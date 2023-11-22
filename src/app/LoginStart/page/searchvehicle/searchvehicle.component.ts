import { Component, OnInit, ViewChild } from '@angular/core';
import { Company } from "../../models/company.model";
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from "../../../services/contracts/shared.service";

@Component({
  selector: 'app-searchvehicle',
  templateUrl: './searchvehicle.component.html',
  styleUrls: ['./searchvehicle.component.css'],
})
export class SearchvehicleComponent implements OnInit {


  companyData!: Company;
  originalData: any[] = [];
  dataSource_company = new MatTableDataSource();
  clientId: string = '';
  displayedColumns: string[] = ['id', 'name', 'services', 'location', 'photo'];

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  constructor(private companyDataService: FastporteDataService, private router: Router, private sharedService: SharedService) {
    this.companyData = {} as Company;
  }

  ngOnInit(): void {
    this.getUserDistrict();
    this.dataSource_company.paginator = this.paginator;
    this.getAllCompanies();
    this.searchByLocation();
  }

  getAllCompanies() {
    this.companyDataService.getAllCompanies().subscribe((res: any) => {
      this.dataSource_company.data = res;
      this.originalData = res;
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
    this.sharedService.selectedCompanyId = row.id;
    this.router.navigateByUrl(`/vehiclereservation/${row.id}`);
  }

  searchMethod: string = 'noFilter';
  manualLocation: string = '';
  userLocation: string = '';

  getUserDistrict() {
    this.companyDataService.getClientById(this.clientId).subscribe(
      (clients) => {
        this.userLocation = clients.country;
        console.log("Distrito del usuario:", this.userLocation);
      },
      (error) => {
        console.error('Error al obtener el distrito del cliente:', error);
      }
    );
  }

  searchByLocation() {
    if (this.searchMethod === 'userLocation') {
      this.dataSource_company.data = this.originalData.filter((company) => {
        return company.country.toLowerCase().includes(this.userLocation.toLowerCase());
      });
    } else if (this.searchMethod === 'manualLocation') {
      this.dataSource_company.data = this.originalData.filter((company) => {
        return company.country.toLowerCase().includes(this.manualLocation.toLowerCase());
      });
    } else {
      // Si se selecciona "Sin filtro", no se aplica ningún filtro
      this.dataSource_company.data = this.originalData;
      this.searchMethod='';
    }
  }
}
