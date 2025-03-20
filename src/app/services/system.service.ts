import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../shared/interfaces/user.interface';
import { ApiResponse } from '../shared/interfaces/apiResponse.interface';
import { BankAccount } from '../shared/interfaces/bankAccount.interface';
import { AdditionalData } from '../shared/interfaces/additionalData.interface';

@Injectable({
  providedIn: 'root',
})
export class SystemService {
  private readonly API_BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**
   * Get the authorization headers with the token from local storage.
   */
  private getHeaders(): HttpHeaders {
    const authDataString = localStorage.getItem('auth_data');

    if (!authDataString) {
      return new HttpHeaders();
    }

    try {
      const authData = JSON.parse(authDataString);
      return new HttpHeaders({ Authorization: authData.token });
    } catch (error) {
      console.error('Invalid auth data in localStorage', error);
      return new HttpHeaders();
    }
  }

  /**
   * Fetch system data from multiple endpoints and handle errors gracefully.
   */
  fetchSystemData(): Observable<{
    userData: ApiResponse<User>;
    bankAccounts: ApiResponse<BankAccount[]>;
    additionalData: ApiResponse<AdditionalData>;
    transactions: ApiResponse<{ message: string }>;
  }> {
    const headers = this.getHeaders();

    return forkJoin({
      userData: this.getData('/getUserData', headers),
      bankAccounts: this.getData('/getBankAccounts', headers),
      additionalData: this.getData('/getAdditionalData', headers),
      transactions: this.getData('/getTransactions', headers),
    });
  }

  /**
   * Helper method to handle API requests and error handling.
   * @param endpoint The API endpoint to call.
   * @param headers The headers to use for the request.
   */
  private getData(endpoint: string, headers: HttpHeaders): Observable<any> {
    const url = `${this.API_BASE_URL}${endpoint}`;
    return this.http.get(url, { headers }).pipe(
      catchError(() => of(null))
    );
  }
}
