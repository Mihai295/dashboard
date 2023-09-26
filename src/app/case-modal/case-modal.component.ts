import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-case-modal',
  templateUrl: './case-modal.component.html',
  styleUrls: ['./case-modal.component.css']
})
export class CaseModalComponent {
  @Input() title!: string;
  @Input() comunicari!: { title: string, detalii: string }[];

  @Output() closeModal = new EventEmitter<void>();

  onCloseModal() {
    this.closeModal.emit();
  }
}
