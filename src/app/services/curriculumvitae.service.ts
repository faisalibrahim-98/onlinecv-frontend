import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurriculumvitaeService {
  constructor(private http: HttpClient) {}

  async createCv(cvBody: Record<string, unknown>): Promise<any> {
    try {
      return lastValueFrom(
        this.http.post(`http://localhost:3000/api/createCV`, cvBody)
      );
    } catch {
      return {};
    }
  }

  async updateCv(id: string, cvBody: Record<string, unknown>): Promise<any> {
    try {
      return lastValueFrom(
        this.http.put(`http://localhost:3000/api/updateCV/${id}`, cvBody)
      );
    } catch {
      return {};
    }
  }

  async getCvData(id: string): Promise<any> {
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

  async deleteCv(cvId: string): Promise<any> {
    try {
      return lastValueFrom(
        this.http.delete(`http://localhost:3000/api/deleteCV/${cvId}`)
      );
    } catch {
      return {};
    }
  }
}
