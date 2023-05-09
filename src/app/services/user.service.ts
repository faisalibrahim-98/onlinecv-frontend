import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  async login(userBody: Record<string, unknown>): Promise<any> {
    try {
      return lastValueFrom(
        this.http.post(`http://localhost:3000/api/login`, userBody)
      );
    } catch {
      return {};
    }
  }

  async signup(userBody: Record<string, unknown>) {
    try {
      return (await lastValueFrom(
        this.http.post(`http://localhost:3000/api/register`, userBody)
      )) as any;
    } catch {
      return {};
    }
  }

  async getUserData(id: string): Promise<any> {
    try {
      return lastValueFrom(
        this.http.get(`http://localhost:3000/api/findUser/${id}`)
      ) as any;
    } catch {
      return {};
    }
  }

  async logout(userBody: Record<string, unknown>) {
    try {
      return (await lastValueFrom(
        this.http.post(`http://localhost:3000/api/logout`, userBody)
      )) as any;
    } catch {
      return {};
    }
  }
}
