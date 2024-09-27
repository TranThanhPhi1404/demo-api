import { Component , EventEmitter, Output} from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  searchText: string = '';

  @Output() filterChanged = new EventEmitter<string>();

  // Gọi phương thức này khi nhấn nút tìm kiếm
  onSearch() {
    this.filterChanged.emit(this.searchText);
  }
}
