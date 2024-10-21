import { Employee } from "../model/employee";
import { inject, Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, setDoc, deleteDoc } from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private firestore: Firestore = inject(Firestore);

  getEmployees(): Observable<Employee[]> {
    const employees = collection(this.firestore, 'employees');
    return collectionData(employees, { idField: 'id' }) as Observable<Employee[]>;
  }

  createEmployee(employee: Employee) {
    const employees = collection(this.firestore, 'employees');
    delete employee.id;
    // @ts-ignore
    return addDoc(employees, { ...employee });
  }

  updateEmployee(employee: Employee) {
    const employeeId = employee.id;
    delete employee.id;
    const employees = collection(this.firestore, 'employees');
    const employeeRef = doc(employees, employeeId!);
    // @ts-ignore
    return setDoc(employeeRef, employee);
  }

  deleteEmployee(employeeId: string): Promise<void> {
    const employees = collection(this.firestore, 'employees');
    const employeeRef = doc(employees, employeeId);
    return deleteDoc(employeeRef);
  }
}
