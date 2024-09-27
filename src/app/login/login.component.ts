import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.username === 'admin' && this.password === 'a@1') {
      // Lưu trữ trạng thái đăng nhập (có thể dùng localStorage hoặc sessionStorage)
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/main']); // Chuyển hướng sau khi đăng nhập thành công
    } else {
      alert('Invalid credentials!');
    }
  }
}

