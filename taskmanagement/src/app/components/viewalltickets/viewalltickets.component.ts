import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-viewalltickets',
  templateUrl: './viewalltickets.component.html',
  styleUrls: ['./viewalltickets.component.scss'],
})
export class ViewallticketsComponent implements OnInit {
  displayedColumns: string[] = [
    'Title',
    'Status',
    'DueDate',
    'Edit',
    'Delete'
  ];
  userId = 0;
  displayedTickets = new MatTableDataSource<any>([]);
  itemsPerPage = 5;
  currentPage = 1;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private filterService: FilterService,
    private ticketService: TicketService,
    private authService: AuthService,
    private router: Router
  ) {
    this.userId = this.authService.getUserId()!;
  }

  ngOnInit(): void {
    this.fetchOpenTickets();
    this.filterService.getFilter().subscribe((filter) => {
      this.filterTickets(filter);
    });
  }

  fetchOpenTickets(): void {
    this.ticketService.getTickets(this.userId).subscribe((tickets) => {
      this.displayedTickets = new MatTableDataSource(tickets);
      this.displayedTickets.paginator = this.paginator;
      this.displayedTickets.sort = this.sort;
      this.filterTickets(''); // Apply initial filtering
    });
  }

  filterTickets(filter: string): void {
    this.currentPage = 1; // Reset current page when filtering
    this.displayedTickets.filter = filter.trim().toLowerCase();
    if (this.displayedTickets.paginator) {
      this.displayedTickets.paginator.firstPage();
    }
  }
  
  logDueDate(row: any) {
    console.log('DueDate:', row.DueDate );
    return row.DueDate; // You can return the DueDate if needed
  }

  editTicket(ticketId: number): void {
    this.router.navigate(['/dashboard', 'editticket', ticketId]);
  }
  
  // In your component
deleteTicket(id: number): void {
  this.ticketService.deleteTicket(id).subscribe(
    () => {
      console.log('Ticket deleted successfully');
      this.fetchOpenTickets();
      this.filterService.getFilter().subscribe((filter) => {
        this.filterTickets(filter);
      });
      // Optionally, update your local data or UI here
    },
    (error) => {
      console.error('Error deleting ticket:', error);
      // Handle the error and update the UI accordingly
    }
  );
}


}
