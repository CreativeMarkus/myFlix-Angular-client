import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
    selector: 'app-welcome',
    standalone: true,
    imports: [MatButtonModule, MatCardModule, MatToolbarModule, MatIconModule],
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
    constructor(private router: Router) { }

    openLoginDialog(): void {
        console.log('Login button clicked');
    }

    openRegisterDialog(): void {
        console.log('Register button clicked');
    }
}