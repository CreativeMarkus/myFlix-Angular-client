import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDirectorDialog } from './movie-director-dialog';

describe('MovieDirectorDialog', () => {
  let component: MovieDirectorDialog;
  let fixture: ComponentFixture<MovieDirectorDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDirectorDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDirectorDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
