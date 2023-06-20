import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NoticeService {
  // Notice API URL
  apiUrl = 'http://localhost:3000/notice';

  constructor(private http: HttpClient) {}

  // Add Notice
  addNotice(noticeData: any) {
    return this.http.post(`${this.apiUrl}`, noticeData);
  }

  // Fetching all notices
  getAllNotice() {
    return this.http.get(this.apiUrl);
  }

  // Fetching notice by id.
  getById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Updating notice.
  updateNotice(id: any, noticeDate: any) {
    return this.http.put(`${this.apiUrl}/${id}`, noticeDate);
  }

  // Deleting notice.
  deleteNotice(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
