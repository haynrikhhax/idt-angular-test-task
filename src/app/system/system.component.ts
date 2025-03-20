import { Component, OnInit, OnDestroy } from '@angular/core';
import { SystemService } from '../services/system.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavbarComponent } from "../navbar/navbar.component";
import { User } from '../shared/interfaces/user.interface';
import { BankAccount } from '../shared/interfaces/bankAccount.interface';
import { AdditionalData } from '../shared/interfaces/additionalData.interface';
import { TranslatePipe } from '../shared/pipes/translate.pipe';
import { SearchComponent } from "../shared/components/search/search.component";

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  imports: [CommonModule, NavbarComponent, TranslatePipe, SearchComponent],
  styleUrls: ['./system.component.scss'],
})
export class SystemComponent implements OnInit, OnDestroy {
  userData!: User;
  bankAccounts!: BankAccount[];
  additionalData!: AdditionalData;
  transactions: any;
  isLoading = true;
  showAccountNumber = false;
  showBalanceNumber = false;
  error: string | null = null;
  private unsubscribe$ = new Subject<void>();

  constructor(private systemService: SystemService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.systemService.fetchSystemData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (responses) => {
          this.userData = responses.userData.result;
          this.bankAccounts = responses.bankAccounts.result;
          this.additionalData = responses.additionalData.result;
          this.transactions = responses.transactions;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Failed to load data ' + err;
          this.isLoading = false;
        },
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  toggleShowAccountNumber() {
    this.showAccountNumber = !this.showAccountNumber;
  }

  toggleShowBalanceNumber() {
    this.showBalanceNumber = !this.showBalanceNumber;
  }
}
