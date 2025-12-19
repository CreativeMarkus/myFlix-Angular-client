import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-navbar',
    standalone: false,
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    user: any = null;
    private routerSubscription!: Subscription;

    constructor(
        private router: Router,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.loadUser();

        // Listen to router events to detect navigation and refresh user state
        this.routerSubscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.loadUser();
                this.cdr.detectChanges();
            });
    }

    ngOnDestroy(): void {
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
    }

    loadUser(): void {
        const userData = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (userData && token) {
            this.user = JSON.parse(userData);
        } else {
            this.user = null;
        }
    }

    isLoggedIn(): boolean {
        return this.user !== null && localStorage.getItem('token') !== null;
    }

    logout(): void {
        localStorage.clear();
        this.user = null;
        this.cdr.detectChanges();
        this.router.navigate(['welcome']);
    }

    goToProfile(): void {
        this.router.navigate(['profile']);
    }

    goToMovies(): void {
        this.router.navigate(['movies']);
    }
}