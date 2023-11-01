import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-toolbar-landing',
    templateUrl: './toolbar-landing.component.html',
    styleUrls: ['./toolbar-landing.component.css']
})

export class ToolbarLandingComponent {

    constructor(private router: Router) { }

    pageLanding(){
        this.router.navigateByUrl('/home');
    }

    pageLandingAbout(){
        this.router.navigateByUrl('/home#about');
    }

    pageLandingFeatures(){
        this.router.navigateByUrl('/home#features');
    }

    pageLandingTeam(){
        this.router.navigateByUrl('/home#team');
    }

    pageLandingDownload(){
        this.router.navigateByUrl('/home#download');
    }

    pageLandingContact(){
        this.router.navigateByUrl('/home#contact');
    }

    pageLoginForm(){
        this.router.navigateByUrl('/login');
    }
}
