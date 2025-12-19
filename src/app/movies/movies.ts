import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: false,
  templateUrl: './movies.html',
  styleUrl: './movies.scss',
})
export class MoviesComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    // Check if user is logged in, if not redirect to welcome
    const user = localStorage.getItem('user');
    if (!user) {
      this.router.navigate(['welcome']);
      return;
    }

    // Open movies dialog automatically when component loads
    this.openMoviesDialog();
  }

  openMoviesDialog(): void {
    const dialogRef = this.dialog.open(MovieCardComponent, {
      width: '80vw',
      maxWidth: '1200px',
      height: '80vh',
      maxHeight: '800px'
    });

    // Navigate back to welcome when dialog closes
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['welcome']);
    });
  }
}
