import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(public authService: AuthService, private router:Router) {}
  logout(): void{
    this.authService.logout();
    setTimeout(() => {
      
      this.router.navigate(['/'])
    },500)
}

}
