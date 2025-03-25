import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';  // Ensure this path is correct

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/transactions`);//, { headers });
  }

  addTransaction(transaction: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/transaction`, transaction);
  }

  updateTransaction(id: string, transaction: any): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/transaction/${id}`, transaction);
  }

  deleteTransaction(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/transaction/${id}`);
  }
}
