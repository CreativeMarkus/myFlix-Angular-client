import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieGenreDialog } from './movie-genre-dialog';

describe('MovieGenreDialog', () => {
  let component: MovieGenreDialog;
  let fixture: ComponentFixture<MovieGenreDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieGenreDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieGenreDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
