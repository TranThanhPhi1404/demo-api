import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute , Router} from '@angular/router';
@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  sdt: string | null = null;
  userForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: [''],
      email: ['']
    });
  }

  ngOnInit(): void {
    this.sdt = this.route.snapshot.paramMap.get('sdt');
    if (this.sdt) {
      this.loadUser();
    }
  }

  loadUser() {
    this.userService.getUserBySdt(this.sdt!).subscribe(user => {
      this.userForm.setValue({ name: user.name, email: user.email });
    });
  }

  updateUser() {
    const updatedUser: User = { ...this.userForm.value, sdt: this.sdt! };
    this.userService.updateUser(this.sdt!, updatedUser).subscribe({
      next: () => {
        alert('Thông tin người dùng đã được chỉnh sửa thành công');
        this.router.navigate(['/main']);
      },
      error: (err) => {
        console.error('Có lỗi xảy ra', err);
        alert('Có lỗi xảy ra khi chỉnh sửa thông tin !!!');
      }
    });
  }
}
