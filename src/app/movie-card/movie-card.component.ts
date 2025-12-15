import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FetchApiDataService } from '../fetch-api-data';

@Component({
    selector: 'app-movie-card',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
    templateUrl: './movie-card.component.html',
    styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
    @Input() movie: any;
    movies: any[] = [];

    constructor(private fetchApiData: FetchApiDataService) { }

    ngOnInit(): void {
        this.getMovies();
    }

    getMovies(): void {
        this.fetchApiData.getAllMovies().subscribe(
            (result: any) => {
                this.movies = result;
                console.log('Movies loaded:', this.movies);
            },
            (error: any) => {
                console.error('Error loading movies:', error);
            }
        );
    }

    onGenreClick(): void {
        console.log('Genre clicked:', this.movie?.Genre?.Name);
    }

    onDirectorClick(): void {
        console.log('Director clicked:', this.movie?.Director?.Name);
    }

    onSynopsisClick(): void {
        console.log('Synopsis clicked:', this.movie?.Title);
    }

    onFavoriteClick(): void {
        console.log('Favorite clicked:', this.movie?.Title);
    }
}