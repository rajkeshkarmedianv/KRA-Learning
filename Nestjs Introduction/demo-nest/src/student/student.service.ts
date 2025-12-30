/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StudentService {
  private students = [
    { id: 1, name: 'Raj', age: 24 },
    { id: 2, name: 'Rakesh', age: 32 },
    { id: 3, name: 'Brijesh', age: 31 },
  ];

  // GET ALL
  getAllStudents() {
    return this.students;
  }

  // GET BY ID
  getStudentById(id: number) {
    const student = this.students.find((s) => s.id === id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  // CREATE
  createStudent(data: { name: string; age: number }) {
    const newStudent = {
      id: Date.now(),
      ...data,
    };
    this.students.push(newStudent);
    return newStudent;
  }

  // UPDATE (PUT)
  updateStudent(id: number, data: { name: string; age: number }) {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new NotFoundException('Student not found');
    }

    this.students[index] = { id, ...data };
    return this.students[index];
  }

  // PATCH
  patchStudent(id: number, data: Partial<{ name: string; age: number }>) {
    const student = this.getStudentById(id);
    Object.assign(student, data);
    return student;
  }

  // DELETE
  deleteStudent(id: number) {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new NotFoundException('Student not found');
    }

    const deletedStudent = this.students[index];
    this.students.splice(index, 1);

    return {
      message: 'Student deleted successfully',
      student: deletedStudent,
    };
  }
}
