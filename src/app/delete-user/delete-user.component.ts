import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute , Router} from '@angular/router';
@Component({
  selector: 'app-delete-user',
  standalone: true,
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  @Input() sdt: string | null = null;
  @Output() userDeleted = new EventEmitter<void>();

  constructor(private userService: UserService, private route: ActivatedRoute,private router: Router ) {this.sdt = this.route.snapshot.paramMap.get('sdt');}

  deleteUser() {
    if (this.sdt && confirm('Bạn có chắc chắn muốn xóa người dùng này ?')) {
      this.userService.deleteUser(this.sdt).subscribe({
        next: () => {
          alert('Người dùng đã được xóa thành công!');
          this.userDeleted.emit(); // Emit event to notify parent component

          this.router.navigate(['/main']);
        },
        error: (err) => {
          console.error('Có lỗi xảy ra khi xóa người dùng', err);
          alert('Có lỗi xảy ra khi xóa người dùng');
        }
      });
    }
  }
}
