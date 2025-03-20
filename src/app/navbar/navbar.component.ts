import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LanguagePickerComponent } from "../shared/components/language-picker/language-picker.component";
import { SearchComponent } from "../shared/components/search/search.component";
import { Company } from '../shared/interfaces/company.interface';
import { DropdownComponent } from "../shared/components/dropdown/dropdown.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, LanguagePickerComponent, SearchComponent, DropdownComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public router: Router) { }

  @Input() userName: string = '';
  @Input() userPassportNumber: string = '';
  @Input() notificationCount: number = 2;

  companies: Company[] = [
    {
      name: "‘’Company’’ LLC",
      level: "Owner"
    },
    {
      name: "‘’Company’’ 2",
      level: "Executive director"
    },
    {
      name: "‘’Company’’ 2",
      level: "Manager"
    },
    {
      name: "‘’Company’’ 2",
      level: "Owner"
    },
  ];

  selectedCompany: Company = {
    name: "‘’Company’’ LLC",
    level: "Owner"
  }

  selectItem(item: Company) {
    this.selectedCompany = item;
  }

  logout() {
    localStorage.removeItem('auth_data');
    this.router.navigate(['/login'])
  }
}
