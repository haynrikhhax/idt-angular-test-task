import { Component, Input, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-language-picker',
  imports: [TranslatePipe, AsyncPipe],
  templateUrl: './language-picker.component.html',
  styleUrl: './language-picker.component.scss'
})
export class LanguagePickerComponent implements OnInit {
  constructor(public languageService: LanguageService) { }

  @Input() bgColor = '#4d4d4d';

  ngOnInit() {
    this.changeBackground(this.bgColor);
  }

  changeBackground(color: string) {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--bg-color', color);
      const textColor = color.toLowerCase() === '#ffffff' ? '#000000' : '#ffffff';
      document.documentElement.style.setProperty('--text-color', textColor);
    }
  }

  setLanguage(lang: string): void {
    this.languageService.setLanguage(lang as 'en' | 'hy' | 'ru');
  }
}
