/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // GET ALL
  @Get()
  getAll() {
    return this.studentService.getAllStudents();
  }

  // GET BY ID
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.studentService.getStudentById(Number(id));
  }

  // CREATE
  @Post()
  create(@Body() body: { name: string; age: number }) {
    return this.studentService.createStudent(body);
  }

  // UPDATE (PUT)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { name: string; age: number },
  ) {
    return this.studentService.updateStudent(Number(id), body);
  }

  // PATCH
  @Patch(':id')
  patch(
    @Param('id') id: string,
    @Body() body: Partial<{ name: string; age: number }>,
  ) {
    return this.studentService.patchStudent(Number(id), body);
  }

  // DELETE
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.studentService.deleteStudent(Number(id));
  }
}
