import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-user-profile',
    standalone: false,
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
    user: any = {};
    favoriteMovies: any[] = [];
    allMovies: any[] = [];
    editMode: boolean = false;
    updatedUser: any = {};

    constructor(
        public fetchApiData: FetchApiDataService,
        public snackBar: MatSnackBar,
        private router: Router,
        public dialog: MatDialog
    ) { }

    ngOnInit(): void {
        console.log('=== User Profile Component Init ===');
        const userFromStorage = localStorage.getItem('user');
        console.log('User in localStorage:', userFromStorage);
        console.log('Token in localStorage:', localStorage.getItem('token') ? 'Present' : 'Missing');

        // Get favorites directly from localStorage first for immediate display
        if (userFromStorage) {
            const userData = JSON.parse(userFromStorage);
            const localFavorites = userData.FavoriteMovies || userData.Favorites || userData.favoriteMovies || userData.favorites || [];
            console.log('Direct localStorage favorites:', localFavorites);
            if (Array.isArray(localFavorites)) {
                this.favoriteMovies = localFavorites;
                console.log('Set favoriteMovies from localStorage:', this.favoriteMovies);
            }
        }
        this.getFavoriteMovies();
        this.getAllMovies();
    }

    getUserProfile(): void {
        this.fetchApiData.getOneUser().subscribe((result: any) => {
            console.log('getUserProfile - Full API response:', result);
            this.user = result;
            this.updatedUser = { ...result };

            // Try to extract favorites directly from user data
            const favorites = result.FavoriteMovies || result.Favorites || result.favoriteMovies || result.favorites || [];
            console.log('getUserProfile - Extracted favorites:', favorites);

            if (Array.isArray(favorites)) {
                this.favoriteMovies = favorites;
                console.log('getUserProfile - Set favoriteMovies to:', this.favoriteMovies);
            }
        }, (error: any) => {
            console.error('Error fetching user profile:', error);
            this.snackBar.open('Error loading profile', 'OK', { duration: 3000 });
        });
    }

    getFavoriteMovies(): void {
        this.fetchApiData.getFavouriteMovies().subscribe((result: any) => {
            console.log('User Profile - Favorite movies API response:', result);
            console.log('User Profile - Type of result:', typeof result);
            console.log('User Profile - Is array:', Array.isArray(result));
            this.favoriteMovies = result || [];
            console.log('User Profile - Final favoriteMovies array:', this.favoriteMovies);
        }, (error: any) => {
            console.error('Error fetching favorite movies:', error);
            this.favoriteMovies = [];
        });
    }

    getAllMovies(): void {
        this.fetchApiData.getAllMovies().subscribe((result: any) => {
            this.allMovies = result;
        }, (error: any) => {
            console.error('Error fetching all movies:', error);
        });
    }

    toggleEditMode(): void {
        this.editMode = !this.editMode;
        if (!this.editMode) {
            this.updatedUser = { ...this.user };
        }
    }

    updateProfile(): void {
        this.fetchApiData.editUser(this.updatedUser).subscribe((result: any) => {
            this.user = result;
            localStorage.setItem('user', JSON.stringify(result));
            this.editMode = false;
            this.snackBar.open('Profile updated successfully!', 'OK', { duration: 3000 });
        }, (error: any) => {
            console.error('Error updating profile:', error);
            this.snackBar.open('Error updating profile', 'OK', { duration: 3000 });
        });
    }

    removeFromFavorites(movieId: string): void {
        this.fetchApiData.deleteFavouriteMovie(movieId).subscribe((result: any) => {
            // Remove the movieId from the favorites array (since favoriteMovies is an array of IDs)
            this.favoriteMovies = this.favoriteMovies.filter(id => id !== movieId);
            this.snackBar.open('Movie removed from favorites!', 'OK', { duration: 2000 });

            // Refresh the favorites list to ensure sync
            this.getFavoriteMovies();
        }, (error: any) => {
            console.error('Error removing from favorites:', error);
            this.snackBar.open('Error removing movie from favorites', 'OK', { duration: 3000 });
        });
    }

    deleteAccount(): void {
        const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
        if (confirmed) {
            this.fetchApiData.deleteUser().subscribe((result: any) => {
                localStorage.clear();
                this.snackBar.open('Account deleted successfully', 'OK', { duration: 3000 });
                this.router.navigate(['welcome']);
            }, (error: any) => {
                console.error('Error deleting account:', error);
                this.snackBar.open('Error deleting account', 'OK', { duration: 3000 });
            });
        }
    }

    getFavoriteMovieDetails(): any[] {
        console.log('=== getFavoriteMovieDetails Debug ===');
        console.log('All movies loaded:', this.allMovies?.length || 0);
        console.log('Favorite movie IDs:', this.favoriteMovies);
        console.log('Type of favoriteMovies:', typeof this.favoriteMovies);
        console.log('Is favoriteMovies an array:', Array.isArray(this.favoriteMovies));

        if (!this.favoriteMovies || !this.allMovies || this.favoriteMovies.length === 0) {
            console.log('Early return: No favorites or movies found');
            return [];
        }

        const favoriteMovies = this.allMovies.filter(movie => {
            const isIncluded = this.favoriteMovies.includes(movie._id);
            if (isIncluded) {
                console.log(`✓ Movie ${movie.Title} (${movie._id}): INCLUDED`);
            }
            return isIncluded;
        });

        console.log('Final filtered favorite movies:', favoriteMovies.length);
        console.log('=== End Debug ===');
        return favoriteMovies;
    }

    refreshFavorites(): void {
        console.log('=== Manual Refresh Favorites ===');
        this.getFavoriteMovies();
        this.snackBar.open('Refreshing favorites...', 'OK', { duration: 1000 });
    }

    testApi(): void {
        console.log('=== API Test ===');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const token = localStorage.getItem('token');

        console.log('Current user:', user);
        console.log('Current token exists:', !!token);

        // Test the raw API call
        this.fetchApiData.getOneUser().subscribe((result: any) => {
            console.log('RAW API Response for user:', result);
            if (result.FavoriteMovies) console.log('FavoriteMovies found:', result.FavoriteMovies);
            if (result.Favorites) console.log('Favorites found:', result.Favorites);
            if (result.favoriteMovies) console.log('favoriteMovies found:', result.favoriteMovies);
            if (result.favorites) console.log('favorites found:', result.favorites);

            this.snackBar.open('Check console for API test results', 'OK', { duration: 3000 });
        }, (error: any) => {
            console.error('API Test Error:', error);
            this.snackBar.open('API test failed - check console', 'OK', { duration: 3000 });
        });
    }

    logout(): void {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Logged out successfully!', 'OK', { duration: 2000 });
    }
}