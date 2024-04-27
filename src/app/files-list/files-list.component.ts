import { Component, EventEmitter, Input, Output } from '@angular/core';
import { W2Form } from '../shared/interfaces/w2-form.interface';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrl: './files-list.component.scss'
})
export class FilesListComponent {
  @Input() w2Forms: W2Form[] = [];
  @Output() selectedW2Form = new EventEmitter<number>();
  selectedIndex: number = 0;

  onSelectW2Form(index: number) {
    this.selectedIndex = index;
    this.selectedW2Form.emit(index);
  }
}
