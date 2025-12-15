import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MovieCardComponent } from './movie-card.component';

describe('MovieCardComponent', () => {
    let component: MovieCardComponent;
    let fixture: ComponentFixture<MovieCardComponent>;

    const mockMovie = {
        Title: 'Test Movie',
        Description: 'A test movie description',
        Director: { Name: 'Test Director' },
        Genre: { Name: 'Test Genre' },
        ImagePath: 'test-image.jpg'
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MovieCardComponent, NoopAnimationsModule]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MovieCardComponent);
        component = fixture.componentInstance;
        component.movie = mockMovie;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display movie title', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('mat-card-title')?.textContent).toContain('Test Movie');
    });

    it('should display movie director', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('mat-card-subtitle')?.textContent).toContain('Test Director');
    });

    it('should display movie description', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.description')?.textContent).toContain('A test movie description');
    });

    it('should display movie genre', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('.genre')?.textContent).toContain('Test Genre');
    });

    it('should have action buttons', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const buttons = compiled.querySelectorAll('button');
        expect(buttons.length).toBe(4);
    });
});