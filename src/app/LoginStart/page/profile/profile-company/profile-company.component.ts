import { Component, OnInit } from '@angular/core';
import { FastporteDataService } from 'src/app/services/fastporte-data.service';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.css'],
})
export class ProfileCompanyComponent implements OnInit  {
    company: any = '';
  errorMessage: string = '';
  emailVerify: string = '';
  passwordVerify: string = '';
  showPersonalInformation: boolean = true;
  showExperience: boolean = false;
  showAboutVehicle: boolean = false;
  showComments: boolean = false;

  constructor(private companyDataService: FastporteDataService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(
        params => {
          this.getCompany(params['id']);
        }
    );
  }
    ngOnInit(): void {
    }

    getCompany(id: any) {
        this.companyDataService.getCompanyById(id).subscribe(
            (res: any) =>
            {
                console.log("Company detail:", (res[id-1]));
                this.company = res[id-1];
            },
            err => {
                console.log("Error:", err);
            }
        );
    }

  pageSettings() {
    const companyId = this.company.id;
    this.router.navigateByUrl(`/company-settings/${companyId}`);
  }

  showSection(section: string) {
    this.showPersonalInformation = section === 'PersonalInformation';
    this.showExperience = section === 'Experience';
    this.showAboutVehicle = section === 'AboutVehicle';
    this.showComments = section === 'Comments';
  }
}
