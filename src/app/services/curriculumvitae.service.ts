import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurriculumvitaeService {

  constructor(private http: HttpClient) { }

  async createCv(cvBody: Record<string, unknown>): Promise<any> {
    try {
      return lastValueFrom(
        this.http.post(`http://localhost:3000/api/createCV`, cvBody)
      );
    } catch {
      return {};
    }
  }

  async getCvData(id: string): Promise<any> {
    try {
      return lastValueFrom(
        this.http.get(`http://localhost:3000/api/findCV/${id}`)
      ) as any;
    } catch {
      return {};
    }
  }
}
