import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: string = "http://employee-env.eba-at4dsqbh.us-east-2.elasticbeanstalk.com/api/v1/employees";

  constructor(private http: HttpClient) { }

  getAllEmployees() {
    return this.http.get<Employee[]>(this.baseUrl);
  }

  getEmployeeById(id: string) {
    return this.http.get<Employee>(this.baseUrl + "/" + id);
  }

  addEmployee(employee: Employee) {
    return this.http.post(this.baseUrl, employee);
  }

  updateEmployee(employee: Employee) {
    return this.http.put(this.baseUrl + "/" + employee.employeeId, employee);
  }

  deleteEmployee(id: string) {
    return this.http.delete<Employee>(this.baseUrl + "/" + id);
  }
}
