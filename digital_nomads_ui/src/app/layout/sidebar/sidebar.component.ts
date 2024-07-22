import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

interface SidebarGroup {
  id: number;
  name: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  sidebar_groups: SidebarGroup[] = [];
  fetchError: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchSidebarGroups();
  }

  fetchSidebarGroups() {
    this.http.get<SidebarGroup[]>('https://todo/sidebar-groups')
      .pipe(
        catchError(error => {
          console.error('Error fetching sidebar groups:', error);
          this.fetchError = 'Failed to fetch sidebar groups';
          return of([]);
        })
      )
      .subscribe(groups => {
        this.sidebar_groups = groups;
      });
  }
}