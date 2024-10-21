import {Component, inject, OnInit} from '@angular/core';
import {EmployeeService} from "../service/employee.service";
import {Employee} from "../model/employee";
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe, DatePipe } from '@angular/common';
import { Timestamp } from '@angular/fire/firestore';

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
    this.employeeService.getEmployees().subscribe(
        (data: Employee[]) => {
          console.log('Received employees:', data);
          this.employees = data.map(emp => {
            let dateOfBirth = emp.dateOfBirth;
            if (dateOfBirth instanceof Timestamp) {
              dateOfBirth = dateOfBirth.toDate();
            }
            return {
              ...emp,
              dateOfBirth: dateOfBirth && !isNaN(dateOfBirth.getTime()) ? dateOfBirth : null
            };
          });
          console.log('Processed employees:', this.employees);
        },
        error => {
          console.error('Error fetching employees:', error);
        }
      );

  }

}
