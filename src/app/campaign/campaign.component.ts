import { Component, OnInit,Output } from '@angular/core';
import { NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-campaign',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './campaign.component.html',
  styleUrl: './campaign.component.css'
})
export class CampaignComponent {
  
  isDropdownOpen: boolean = false;
  @Output() campaignSelected = new EventEmitter<any>();
  campaigns = [];
  selectedCampaign: any;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen; 
  }
  selectCampaign(campaign: any) {
    this.selectedCampaign = campaign;
    this.campaignSelected.emit(campaign); 
  }
}
