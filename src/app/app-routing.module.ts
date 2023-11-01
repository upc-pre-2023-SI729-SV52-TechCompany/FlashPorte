import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './LoginStart/page/login/login-form.component';
import { ClientFormComponent } from './LoginStart/page/registro-cliente/registro/client-form.component';
import { ClientForm2Component } from './LoginStart/page/registro-cliente/registro-paso2/client-form2.component';
import { ClientForm3Component } from './LoginStart/page/registro-cliente/registro-paso3/client-form3.component';
import { CompanyFormComponent } from "./LoginStart/page/register-company/registro/company-form.component";
import { CompanyForm2Component } from "./LoginStart/page/register-company/registro-paso2/company-form2.component";
import { CompanyForm3Component } from "./LoginStart/page/register-company/registro-paso3/company-form3.component";
import { CompanyForm4Component } from "./LoginStart/page/register-company/registro-paso4/company-form4.component";
import { CompanyForm5Component } from "./LoginStart/page/register-company/registro-paso5/company-form5.component";
import { ProfileClientComponent } from "./LoginStart/page/profile/profile-cliente/profile-client.component";
import { ProfileCompanyComponent } from "./LoginStart/page/profile/profile-company/profile-company.component";
import { ClientSettingsComponent } from "./LoginStart/page/settings/client-settings/client-settings.component";
import { CompanySettingsComponent } from "./LoginStart/page/settings/company-settings/company-settings.component";
import { SearchvehicleComponent } from "./LoginStart/page/searchvehicle/searchvehicle.component";
import { ContractsComponent } from "./LoginStart/page/contracts/contracts.component";
import { SupportCompanyComponent } from "./LoginStart/page/support/support-company/support-company.component";
import { SupportClientComponent } from "./LoginStart/page/support/support-client/support-client.component";
import { HomeCompanyComponent } from "./LoginStart/page/Home/home-company/home-company.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'registro', component: ClientFormComponent },
  { path: 'registro/paso2', component: ClientForm2Component },
  { path: 'registro/paso3', component: ClientForm3Component },
  { path: 'registrocomp', component: CompanyFormComponent },
  { path: 'registrocomp/paso2', component: CompanyForm2Component },
  { path: 'registrocomp/paso3', component: CompanyForm3Component },
  { path: 'registrocomp/paso4', component: CompanyForm4Component },
  { path: 'registrocomp/paso5', component: CompanyForm5Component },
  { path: 'profile-client/:id', component: ProfileClientComponent },
  { path: 'profile-company/:id', component: ProfileCompanyComponent },
  { path: 'client-settings/:id', component: ClientSettingsComponent },
  { path: 'company-settings/:id', component: CompanySettingsComponent },
  { path: 'home-company/:id', component: HomeCompanyComponent },
  { path: 'searchvehicle/:id', component: SearchvehicleComponent },
  { path: 'contracts/:id', component: ContractsComponent },
  { path: 'supportcompany', component: SupportCompanyComponent },
  { path: 'supportclient', component: SupportClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
