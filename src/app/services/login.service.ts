import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryCode } from '../shared/interfaces/countryCode.interface';
import { ApiResponse } from '../shared/interfaces/apiResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly API_BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  /**
   * Get the list of available country codes.
   */
  getCountryCodes(): Observable<ApiResponse<CountryCode[]>> {
    const url = `${this.API_BASE_URL}/GetCountryCode`;
    return this.http.get<ApiResponse<CountryCode[]>>(url);
  }

  /**
   * Check if a user already exists based on the provided phone number.
   * @param phoneNumber The phone number to check.
   */
  checkUserExists(phoneNumber: string): Observable<{ message: string }> {
    const url = `${this.API_BASE_URL}/checkPhone`;
    return this.http.post<{ message: string }>(url, { username: phoneNumber });
  }

  /**
   * Login with the given phone number and password.
   * @param phoneNumber The phone number used for login.
   * @param password The password used for login.
   */
  login(phoneNumber: string, password: string): Observable<{ token: string }> {
    const url = `${this.API_BASE_URL}/login`;
    return this.http.post<{ token: string }>(url, { username: phoneNumber, password });
  }
}
