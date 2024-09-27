import { Component, OnInit, Output, EventEmitter, Input , OnChanges, SimpleChanges } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { CommonModule } from '@angular/common';
import { Route, RouterLink } from '@angular/router';
import { routes } from '../app.routes';
import { LogoutComponent } from "../logout/logout.component";
@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [CommonModule, RouterLink, LogoutComponent],
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit, OnChanges {
  users: User[] = [];
  filteredUsers: User[] = []; 
  selectedUsers: User[] = [];
  isSubscribed: boolean = false; 
  @Input() searchText: string = ''; 
  @Output() editUserEvent = new EventEmitter<string>();
  @Output() deleteUserEvent = new EventEmitter<string>();
  @Output() filterUsersChange = new EventEmitter<User[]>();
  @Output() selectedUsersChange = new EventEmitter<User[]>();
  constructor(private userService: UserService) {}
  toggleUserSelection(user: User) {
    const index = this.selectedUsers.indexOf(user);
    if (index > -1) {
      this.selectedUsers.splice(index, 1); // Nếu người dùng đã được chọn, bỏ chọn
    } else {
      this.selectedUsers.push(user); // Nếu chưa chọn, thêm vào danh sách đã chọn
    }
    this.selectedUsersChange.emit(this.selectedUsers);
  }

  ngOnInit(): void {
    this.loadUsers();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchText']) {
      this.filterUsers(this.searchText); // Call filterUsers when searchText changes
    }
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      data => {
      this.users = data;
      this.filteredUsers = data;
      this.filterUsersChange.emit(this.filteredUsers);
    },
    error => {
      console.error('Lỗi khi tải danh sách !', error);
    }
  );
  }
  filterUsers(searchText: string) {
    if (searchText) {
      this.filteredUsers = this.users.filter(user => user.sdt.includes(searchText));
    } else {
      this.filteredUsers = [...this.users]; // If no searchText, show all users
    }
    this.filterUsersChange.emit(this.filteredUsers);
  }

  editUser(sdt: string) {
    this.editUserEvent.emit(sdt);
  }

  deleteUser(sdt: string) {
    this.deleteUserEvent.emit(sdt);
  }

  isDetailVisible: { [key: string]: boolean } = {}; 

  toggleDetails(sdt: string) {
    this.isDetailVisible[sdt] = !this.isDetailVisible[sdt];
  }
  closeModal(sdt:string): void {
    this.isDetailVisible[sdt] = false;
  }
}
