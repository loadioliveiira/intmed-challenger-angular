import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-default',
  standalone: true,
  imports: [],
  templateUrl: './modal-default.component.html',
  styleUrl: './modal-default.component.scss'
})
export class ModalDefaultComponent {

  @Input() title!: string;
  @Input() message!: string;

  @Output() onClick = new EventEmitter<void>();


  buttonClick(){
    this.onClick.emit();
  }
}
