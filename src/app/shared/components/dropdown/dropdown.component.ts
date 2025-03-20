import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent<T extends { countryName?: string; countryCode?: number; name?: string; level?: string }> {
  @Input() items: T[] = [];
  @Input() selectedItem?: T;
  @Output() onItemSelected = new EventEmitter<T>();
  @ContentChild('dropdownTemplate') dropdownTemplate!: TemplateRef<any>;

  isDropdownOpen: boolean = false;

  constructor(private eRef: ElementRef) { }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown(event?: Event) {
    event?.stopPropagation();
    this.isDropdownOpen = false;
  }


  @HostListener('document:click', ['$event'])
  closeOnOutsideClick(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
}
