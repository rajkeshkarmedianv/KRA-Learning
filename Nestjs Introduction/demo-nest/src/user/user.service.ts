/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    { id: 1, name: 'Raj', email: 'raj@gmail.com' },
    { id: 2, name: 'Aman', email: 'aman@gmail.com' },
  ];

  // get all users
  getAllUsers() {
    return this.users;
  }

  // get user by id
  getUserById(id: number) {
    return this.users.find(user => user.id === id);
  }

  // add new user
  addUser(user: { name: string; email: string }) {
    const newUser = {
      id: this.users.length + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }
}
