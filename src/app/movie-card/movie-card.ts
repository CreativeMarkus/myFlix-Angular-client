import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog';

@Component({
  selector: 'app-movie-card',
  standalone: false,
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.scss']
})
export class MovieCardComponent implements OnInit, AfterViewInit {
  movies: any[] = [];
  favoriteMovies: string[] = [];
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // Initialize empty array - don't call API here to avoid change detection errors
  }

  ngAfterViewInit(): void {
    // Call API after view is initialized to prevent change detection errors
    this.loadUserData();
    this.getMovies();
    this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log('Movies received:', this.movies);
      // Manually trigger change detection after data is loaded
      this.cdr.detectChanges();
      return this.movies;
    }, (error) => {
      console.log('Error fetching movies:', error);
      // Add some mock data to test the dialog
      this.movies = [
        { Title: 'Test Movie 1', ImagePath: 'https://via.placeholder.com/300x400?text=Movie1' },
        { Title: 'Test Movie 2', ImagePath: 'https://via.placeholder.com/300x400?text=Movie2' }
      ];
      this.cdr.detectChanges();
    });
  }

  loadUserData(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavouriteMovies().subscribe((result: any) => {
      this.favoriteMovies = result || [];
      console.log('Movie card - Favorite movies from API:', this.favoriteMovies);
      this.cdr.detectChanges();
    }, (error) => {
      console.log('Error fetching favorite movies:', error);
      this.favoriteMovies = [];
    });
  }

  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie._id)) {
      this.removeFromFavorites(movie._id);
    } else {
      this.addToFavorites(movie._id);
    }
  }

  addToFavorites(movieId: string): void {
    console.log('Adding movie to favorites:', movieId);
    console.log('Current user:', this.user);
    console.log('API URL will be:', `https://movieapi1-40cbbcb4b0ea.herokuapp.com/users/${this.user.Username}/favorites/${movieId}`);

    this.fetchApiData.addFavouriteMovie(movieId).subscribe((result: any) => {
      console.log('Add favorite API response:', result);
      this.favoriteMovies.push(movieId);
      this.snackBar.open('Movie added to favorites!', 'OK', { duration: 2000 });

      // Refresh favorites list to ensure sync
      this.getFavoriteMovies();
      this.cdr.detectChanges();
    }, (error) => {
      console.error('Error adding to favorites:', error);
      console.error('Error status:', error.status);
      console.error('Error message:', error.message);
      console.error('API URL:', error.url);

      if (error.status === 0) {
        this.snackBar.open('Network connection error. Please check your internet connection.', 'OK', { duration: 5000 });
      } else {
        this.snackBar.open('Error adding movie to favorites', 'OK', { duration: 3000 });
      }
    });
  }

  removeFromFavorites(movieId: string): void {
    this.fetchApiData.deleteFavouriteMovie(movieId).subscribe((result: any) => {
      this.favoriteMovies = this.favoriteMovies.filter(id => id !== movieId);
      this.snackBar.open('Movie removed from favorites!', 'OK', { duration: 2000 });

      // Refresh favorites list to ensure sync
      this.getFavoriteMovies();
      this.cdr.detectChanges();
    }, (error) => {
      console.error('Error removing from favorites:', error);
      this.snackBar.open('Error removing movie from favorites', 'OK', { duration: 3000 });
    });
  }

  showMovieDetails(movie: any): void {
    console.log('Movie clicked:', movie);
    this.dialog.open(MovieDetailsDialogComponent, {
      width: '600px',
      data: movie
    });
  }
}
