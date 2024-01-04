import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editticket',
  templateUrl: './editticket.component.html',
  styleUrls: ['./editticket.component.scss']
})
export class EditticketComponent implements OnInit {
  editing: boolean = true;
  ticket={
    'Id' : 0,
    'Category': '',
    'Title':'',
    'Status' : '',
    'DueDate' : '',
  };

  constructor(private route: ActivatedRoute, private ticketService: TicketService, private router:Router) {}

  ngOnInit() {
    // Retrieve the 'id' parameter from the route
    this.route.paramMap.subscribe(params => {
      const ticketId = parseInt(params.get('id')!);

      // Fetch ticket details using the TicketService
      this.fetchTicket(ticketId);
    });
  }

  fetchTicket(ticketId: number) {
    // Use the TicketService to fetch the ticket details
    this.ticketService.getTicketById(ticketId).subscribe(
      (response: any) => {
        this.ticket = response; // Assuming your API returns the ticket details
      },
      (error) => {
        console.error('Error fetching ticket:', error);
      }
    );
  }

  updateTicket() {

    // Convert the date string to a JavaScript Date object
    const dueDate = new Date(this.ticket.DueDate);
    // Format the date as "yyyy-MM-dd"
    const formattedDueDate = dueDate.toISOString().split('T')[0];
    // Update the ticket object with the formatted date
    this.ticket.DueDate = formattedDueDate;

    // Update the existing ticket
    this.ticketService.updateTicket(this.ticket.Id, this.ticket).subscribe(
      (updatedTicket: any) => {
        console.log('Ticket updated successfully:', updatedTicket);
        setTimeout(() => {
          this.router.navigate(['/dashboard/viewalltickets']);
        }, 500); 
        // Handle success, e.g., show a success message or navigate to another page
      },
      (error) => {
        console.error('Error updating ticket:', error);
        // Handle error, e.g., show an error message
      }
    );
  }
}
