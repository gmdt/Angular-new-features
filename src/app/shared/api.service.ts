import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../model/company.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'http://localhost:3000/company';
  constructor(private httpClient: HttpClient) {}

  getAllCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.apiUrl);
  }

  createCompany(payload: any) {
    return this.httpClient.post(this.apiUrl, payload);
  }
  updateCompany(id: any, payload: any) {
    return this.httpClient.put(`${this.apiUrl}/${id}`, payload);
  }

  getCompanyById(id: any): Observable<Company> {
    return this.httpClient.get<Company>(`${this.apiUrl}/${id}`);
  }

  removeCompanyById(id: any) {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }
}
