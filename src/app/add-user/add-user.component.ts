import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UserService,  private router: Router) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      sdt: ['', Validators.required]
    });
  }


// addUser() {
  
//     if(this.userForm.valid){
//       const newUser: User = this.userForm.value;
//     this.userService.addUser(newUser).subscribe({
//         next: () => {
//             this.userForm.reset();
//             alert('Người dùng được thêm thành công!');
//             this.router.navigate(['/list']);
//         },
//         error: (err) => {
//             this.errorMessage = 'Có lỗi xảy ra khi thêm người dùng';
//         }
//     });
//     }else{
//       this.errorMessage = 'Vui lòng điền đầy đủ thông tin trước khi thêm người dùng';
//       this.userForm.markAllAsTouched();
//     }
// }

addUser() {
  let sdt = this.userForm.get('sdt')?.value;
  sdt = sdt.replace(/\s+/g, ''); 
  if (!sdt) {
    this.errorMessage = 'Số điện thoại không được để trống';
    return; // Dừng thực hiện hàm nếu số điện thoại trống
  }
  // Kiểm tra số điện thoại có tồn tại hay không
  this.userService.getAllUsers().subscribe(
    (users: User[]) => {
      const sanitizedUsers = users.map(user => user.sdt.replace(/\s+/g, '').replace(/[\r\n]+/g, ''));
      const userExists = sanitizedUsers.some(existingSdt => existingSdt === sdt);
      if (userExists) {
        // Nếu số điện thoại đã tồn tại, hiển thị thông báo lỗi
        this.errorMessage = 'Số điện thoại đã tồn tại';
      } else {
        // Nếu không tồn tại, tiến hành thêm người dùng
        this.userService.addUser(this.userForm.value).subscribe(
          {
            next: (response) => {
            this.errorMessage = '';
            this.userForm.reset();
            alert('Người dùng đã được thêm thành công!');
            this.router.navigate(['/main']);
            },
            error:(error) => {
            // Xử lý lỗi khi thêm
            this.errorMessage = 'Đã xảy ra lỗi khi thêm người dùng';
          }}
        );
      }
    },
    (error) => {
      // Xử lý lỗi khi kiểm tra số điện thoại
      this.errorMessage = 'Đã xảy ra lỗi khi kiểm tra số điện thoại';
    }
  );
}
}
