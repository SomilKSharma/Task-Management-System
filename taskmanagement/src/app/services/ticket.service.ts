import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiUrl = 'http://localhost:3000/api'; // Update with your JSON server URL

  constructor(private http: HttpClient) { }

  // Fetch all tickets
  getTickets(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/tickets?userId=${userId}`);
  }

  // Fetch a single ticket by ID
  getTicketById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tickets/${id}`);
  }

  // Create a new ticket
  createTicket(ticketData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/tickets`, ticketData, { headers });
  }

  // Update an existing ticket
  updateTicket(id: number, updatedData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.apiUrl}/tickets/${id}`, updatedData, { headers });
  }

  // Delete a ticket by ID
  deleteTicket(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/tickets/${id}`);
  }
}
