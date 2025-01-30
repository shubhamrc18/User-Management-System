import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersKey = 'users';

  constructor() {}

  getUsers(): any[] {
    const users = localStorage.getItem(this.usersKey);
    return users ? JSON.parse(users) : [];
  }

  addUser(user: any): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  getUserByEmail(email: string): any {
    return this.getUsers().find(u => u.email === email);
  }

  updateUser(originalEmail: string, updatedUser: any): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.email === originalEmail);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem(this.usersKey, JSON.stringify(users));
    }
  }

  deleteUser(email: string): void {
    const users = this.getUsers().filter(u => u.email !== email);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }
}