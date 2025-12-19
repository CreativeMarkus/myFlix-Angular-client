import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSynopsisDialog } from './movie-synopsis-dialog';

describe('MovieSynopsisDialog', () => {
  let component: MovieSynopsisDialog;
  let fixture: ComponentFixture<MovieSynopsisDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSynopsisDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSynopsisDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
