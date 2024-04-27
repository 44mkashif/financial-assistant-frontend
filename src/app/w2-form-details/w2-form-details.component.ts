import { Component, Input } from '@angular/core';
import { W2Form } from '../shared/interfaces/w2-form.interface';

@Component({
  selector: 'app-w2-form-details',
  templateUrl: './w2-form-details.component.html',
  styleUrl: './w2-form-details.component.scss'
})
export class W2FormDetailsComponent {
  @Input() w2Form: W2Form | null = null;
}
