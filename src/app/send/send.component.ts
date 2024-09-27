import { Component, Input , OnChanges, SimpleChanges} from '@angular/core';
import { UserService } from '../user.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../user.model';
@Component({
  selector: 'app-send',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './send.component.html',
  styleUrl: './send.component.css'
})
export class SendComponent  implements OnChanges{
  @Input() filteredUsers: User[] = []; 
  @Input() selectedUsers: User[] = [];
  @Input() selectedCampaign: any;
  
  message: string = ''; 
  selectedOption: string = ''; 

  constructor(private userService: UserService) {}
  onCampaignSelected(campaign: any) {
    this.selectedCampaign = campaign;
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['filteredUsers']) {
      console.log('Filtered users updated:', this.filteredUsers);
    }
  }
  sendMessage() {

    let usersToSend: User[];
    let selectedCampaign = this.selectedCampaign;

    if (this.selectedUsers.length > 0) {
      usersToSend = this.selectedUsers;
    } 
    else if (this.filteredUsers.length > 0) {
        usersToSend = this.filteredUsers; 
    } 

    else {
        this.userService.getAllUsers().subscribe(data => {
            this.sendToUsers(data, selectedCampaign);
        });
        return; 
    }
    if (usersToSend.length > 0) {
        this.sendToUsers(usersToSend, selectedCampaign);
    }
      
  }
  private sendToUsers(users: User[], campaign: any) {
    let successfulSends = 0;

    users.forEach(user => {
      const messagePayload = {
        recipient: user.sdt,
        message: this.message
      };

    
      if (this.selectedOption === 'zalo') {
        this.userService.sendViaZalo(messagePayload).subscribe(
          {
            next: (response) => {
              console.log(`Tin nhắn đã gửi đến Zalo cho ${user.email}:`, response);
              successfulSends++;
              this.updateCampaignStatus(campaign, successfulSends);
            },
  
            error: (error) =>{
              console.error(`Lỗi gửi tin nhắn đến Zalo cho ${user.email}:`, error);
              console.error('Mã trạng thái:', error.status); // Mã trạng thái HTTP
              console.error('Thông điệp lỗi:', error.message); // Thông điệp lỗi
              console.error('Chi tiết lỗi:', error.error); },
            
        
          });

      } else if (this.selectedOption === 'gmail') {
        this.userService.sendViaGmail(messagePayload).subscribe( 
          {
            next: (response) => {
              console.log(`Tin nhắn đã gửi đến Gmail cho ${user.email}:`, response);
              successfulSends++;
              this.updateCampaignStatus(campaign, successfulSends);
            },
            error: (error) => console.error(`Lỗi gửi tin nhắn đến Gmail cho ${user.email}:`, error),
            complete:() =>{
              console.log('Gửi Gmail thành công.');
            }
          });
      } else {
        this.userService.sendViaZalo(messagePayload).subscribe(
          {
            next: (response) => {
              console.log(`Tin nhắn đã gửi đến Zalo cho ${user.email}:`, response);
              successfulSends++;
              this.updateCampaignStatus(campaign, successfulSends);
            },
            error: (error) =>console.error(`Lỗi gửi tin nhắn đến Zalo cho ${user.email}:`, error),
          });

        this.userService.sendViaGmail(messagePayload).subscribe(
          {
            next: (response) => {
              console.log(`Tin nhắn đã gửi đến Gmail cho ${user.email}:`, response);
              successfulSends++;
              this.updateCampaignStatus(campaign, successfulSends);
            },
            error: (error) => {
              console.error(`Lỗi gửi tin nhắn đến Gmail cho ${user.email}:`, error);
            }
          })
      
      }
    });
  }
  showError(errorMessage: string) {
    alert(errorMessage);
  }
  updateCampaignStatus(campaign: any, successfulSends: number) {
    campaign.successfulRecipients = successfulSends;
    const completionPercentage = (successfulSends / campaign.totalRecipients) * 100;
    campaign.status = `${completionPercentage}% `;
  }
}
