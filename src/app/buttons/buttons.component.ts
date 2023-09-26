import { Component } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent{
  filterModalVisible = false;

  openFilterModal() {
    this.filterModalVisible = true; // Set to true to open the filter modal
  }
}
