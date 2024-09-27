import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListUserComponent } from "../list-user/list-user.component";
import { AddUserComponent } from "../add-user/add-user.component";
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LogoutComponent } from "../logout/logout.component";
import { FilterComponent } from "../filter/filter.component";
import { SendComponent } from "../send/send.component";
import { User } from '../user.model';
import { CampaignComponent } from "../campaign/campaign.component";
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLink, RouterOutlet, ListUserComponent, AddUserComponent, CommonModule, FormsModule, LogoutComponent, FilterComponent, SendComponent, CampaignComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  @Input() filteredUsers: User[] = []; 
  @Input() selectedUsers: User[] = [];
  isMenuVisible = true; 
  searchText: string = '';
  
  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible; 
  }
  onFilterChanged(searchText: string) {
    this.searchText = searchText;
  }
  onFilteredUsersChange(filteredUsers: User[]) {
    this.filteredUsers = filteredUsers;
  }
}
