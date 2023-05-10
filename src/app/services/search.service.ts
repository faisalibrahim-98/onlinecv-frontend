import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  async getCvByField(query: any): Promise<any> {
    try {
      return lastValueFrom(
        this.http.post(`http://localhost:3000/api/findCVByField`, query)
      ) as any;
    } catch {
      return {};
    }
  }

  async getCvByUserId(id: string): Promise<any> {
    try {
      return lastValueFrom(
        this.http.post(`http://localhost:3000/api/findCVByUserId`, {
          userId: id,
        })
      ) as any;
    } catch {
      return {};
    }
  }
}
