import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  constructor(private router: Router) {}

  logout() {
    // Xoá trạng thái đăng nhập
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/']); // Chuyển hướng về trang login sau khi logout
  }
}
