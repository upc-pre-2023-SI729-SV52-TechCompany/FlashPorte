import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-toolbar-login',
    templateUrl: './toolbar-login.component.html',
    styleUrls: ['./toolbar-login.component.css']
})

export class ToolbarLoginComponent {

    constructor(private router: Router) { }

    pageUs(){
        this.router.navigateByUrl('/#');
    }

    pageAboutUs(){
        this.router.navigateByUrl('/#');
    }
}
