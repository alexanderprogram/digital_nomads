import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent implements OnInit {
  posts: Post[] = [];
  fetchError: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http.get<Post[]>('https://api.todo.com/posts')
      .pipe(
        catchError(error => {
          console.error('Error fetching posts:', error);
          this.fetchError = 'Failed to fetch posts';
          return of([]);
        })
      )
      .subscribe(posts => {
        this.posts = posts;
      });
  }
}