import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';

describe('WelcomeComponent', () => {
    let component: WelcomeComponent;
    let fixture: ComponentFixture<WelcomeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WelcomeComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(WelcomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have welcome message', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('mat-card-title')?.textContent).toContain('Welcome to myFlix!');
    });

    it('should have login and register buttons', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const buttons = compiled.querySelectorAll('button');
        expect(buttons.length).toBe(2);
        expect(buttons[0].textContent?.trim()).toBe('Register');
        expect(buttons[1].textContent?.trim()).toBe('Login');
    });
});