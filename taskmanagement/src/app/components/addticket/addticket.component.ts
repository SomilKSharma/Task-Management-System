import { Component } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrls: ['./addticket.component.scss']
})
export class AddticketComponent {
  newTicket = {
    'Id' : 0,
    'Category': '',
    'Title':'',
    'Status' : '',
    'DueDate' : '',
  };

  constructor(private ticketService: TicketService, private router:Router) {}

  createTicket(): void {
    
    // Convert the date string to a JavaScript Date object
    const dueDate = new Date(this.newTicket.DueDate);
    // Format the date as "yyyy-MM-dd"
    const formattedDueDate = dueDate.toISOString().split('T')[0];
    // Update the newTicket object with the formatted date
    this.newTicket.DueDate = formattedDueDate;
        
    this.ticketService.createTicket(this.newTicket).subscribe(
      (createdTicket) => {
        console.log('Ticket created successfully:', createdTicket);
        // Optionally, you can redirect to a different page or perform other actions
        setTimeout(() => {
          this.router.navigate(['/dashboard/viewalltickets']);
        }, 500);      },
      (error) => {
        console.error('Error creating ticket:', error);
      }
    );
  }
}
