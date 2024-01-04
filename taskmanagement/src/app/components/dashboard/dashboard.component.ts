import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { FilterService } from '../../services/filter.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private router: Router, private filterService: FilterService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isViewAllTicketsActive();
    });
  }

  isViewAllTicketsActive(): boolean {
    return this.router.url === '/dashboard/viewalltickets';
  }

  openTickets = [
    {
      id: 1,
      department: 'IT',
      category: 'Software',
      subCategory: 'Bug',
      status: 'Open',
      customer: 'John Doe',
      issueTime: new Date('2023-01-01T10:30:00'),
      age: 5, 
      lastModifiedDate: new Date('2023-01-05T15:45:00'),
      rootCauseAnalysis: 'Pending',
    },
    {
      id: 2,
      department: 'HR',
      category: 'Employee Relations',
      subCategory: 'Conflict Resolution',
      status: 'In Progress',
      customer: 'Jane Smith',
      issueTime: new Date('2023-01-02T08:45:00'),
      age: 3, 
      lastModifiedDate: new Date('2023-01-05T11:20:00'),
      rootCauseAnalysis: 'Completed',
    },
    
  ];
  
  filteredTickets = this.openTickets;

  displayedColumns: string[] = [
    'id',
    'department',
    'category',
    'subCategory',
    'status',
    'customer',
    'issueTime',
    'age',
    'lastModifiedDate',
    'rootCauseAnalysis',
  ];

  applyFilter(event: any): void {
    const filterValue = event.target.value.toLowerCase();
    this.filterService.setFilter(filterValue);
  }
 
}
