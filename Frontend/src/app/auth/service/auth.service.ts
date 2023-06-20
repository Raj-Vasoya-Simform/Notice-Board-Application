import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // User API URL
  apiUrl = 'http://localhost:3000/user';

  // Role API URL
  role_apiUrl = 'http://localhost:3000/role';

  constructor(private http: HttpClient) {}

  // Fetches all user data.
  getAll() {
    return this.http.get(this.apiUrl);
  }

  // Fetches all role data.
  getAllRole() {
    return this.http.get(this.role_apiUrl);
  }

  // Fetches user by id.
  getById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Perform user Registration
  register(inputData: any) {
    return this.http.post(`${this.apiUrl}`, inputData);
  }
  // Update's the user details
  updateUser(id: string, inputData: any) {
    return this.http.put(`${this.apiUrl}/${id}`, inputData);
  }

  // Check if user is loggedIn or not
  isLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }

  // Fetches single user's role.
  getUserRole() {
    return sessionStorage.getItem('userrole') != null
      ? sessionStorage.getItem('userrole')?.toString()
      : '';
  }
}
