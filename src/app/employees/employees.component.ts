import {Component, inject, OnInit} from '@angular/core';
import {EmployeeService} from "../service/employee.service";
import {Employee} from "../model/employee";
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
    standalone: true,
    imports: [RouterLink, NgFor, AsyncPipe, DatePipe]
})
export class EmployeesComponent implements OnInit{

  employees: Employee[] = [];

  // Inject EmployeeService in the constructor
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
      this.employeeService.getEmployees().subscribe((data: Employee[]) => {
        this.employees = data.map(emp => ({
          ...emp,
          dateOfBirth: emp.dateOfBirth ? new Date(emp.dateOfBirth) : null
        }));
      });
  }

}
