import { Component, Input, OnInit } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [TranslatePipe, NgStyle],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Input() iconColor = '';
  @Input() inputColor = '';
  @Input() placeholderColor = '';
  @Input() borderColor = '';
  @Input() backgroundColor = '';
}
