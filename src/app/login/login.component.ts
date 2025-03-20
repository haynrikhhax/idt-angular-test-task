import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { takeUntil, Subject } from 'rxjs';
import { LoginService } from '../services/login.service';
import { TranslatePipe } from '../shared/pipes/translate.pipe';
import { phoneNumberAsyncValidator } from '../shared/validators/phone-number-async-validator.validator';
import { CountryCode } from '../shared/interfaces/countryCode.interface';
import { LanguagePickerComponent } from "../shared/components/language-picker/language-picker.component";
import { DropdownComponent } from "../shared/components/dropdown/dropdown.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, TranslatePipe, LanguagePickerComponent, DropdownComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  private static readonly SUCCESS_MESSAGE = 'Success';
  private readonly destroy$ = new Subject<void>();
  readonly loginForm: FormGroup;
  readonly expiresInMinutes = 60;

  countryCodes: CountryCode[] = [];
  selectedCountryCode!: CountryCode;
  userExists = false;
  isPasswordVisible = false;
  buttonText = 'Next';

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.loginForm = this.fb.group({
      countryCode: [374, Validators.required],
      phoneNumber: [
        null,
        [Validators.required, Validators.pattern('^[0-9]*$')],
        [phoneNumberAsyncValidator()]
      ],
      password: [null]
    });
  }

  ngOnInit(): void {
    this.fetchCountryCodes();
  }

  private fetchCountryCodes(): void {
    this.loginService.getCountryCodes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ message, result }) => {
          if (message !== LoginComponent.SUCCESS_MESSAGE) {
            console.error('Error fetching country codes:', message);
            throw new Error('Error fetching country codes');
          }

          this.countryCodes = result;
          this.selectedCountryCode = this.countryCodes.find(c => c.countryCode === 374) ?? this.countryCodes[0];
        },
        error: err => console.error('Error fetching country codes:', err)
      });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.router.navigate(['/system']);
    }
  }

  selectItem(item: CountryCode): void {
    this.countryCodeControl.setValue(item.countryCode);
    this.selectedCountryCode = item;
  }

  checkUserExists(): void {
    const phone = this.fullPhoneNumber;

    this.loginService.checkUserExists(phone)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ message }) => {
          if (message === LoginComponent.SUCCESS_MESSAGE) {
            this.userExists = true;
            this.buttonText = 'Login';
            this.passwordControl.setValidators([Validators.required, Validators.minLength(6)]);
            this.passwordControl.updateValueAndValidity();
            this.cdr.markForCheck();
          } else {
            console.error('Error checking user existence');
          }
        },
        error: err => console.error('Error checking user existence:', err)
      });
  }

  login(): void {
    if (this.loginForm.invalid) return;

    const { password } = this.loginForm.value;
    const fullPhoneNumber = this.fullPhoneNumber;

    this.loginService.login(fullPhoneNumber, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ token }) => {
          const expirationTime = Date.now() + this.expiresInMinutes * 60 * 1000;
          localStorage.setItem('auth_data', JSON.stringify({ token, expiresAt: expirationTime }));
          this.router.navigate(['/system']);
        },
        error: err => console.error('Login failed', err)
      });
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private get countryCodeControl() {
    return this.loginForm.controls['countryCode'];
  }

  private get phoneNumberControl() {
    return this.loginForm.controls['phoneNumber'];
  }

  private get passwordControl() {
    return this.loginForm.controls['password'];
  }

  private get fullPhoneNumber(): string {
    return `${this.countryCodeControl.value}${this.phoneNumberControl.value}`;
  }
}
