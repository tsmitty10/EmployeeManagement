import { Component, OnInit } from '@angular/core';
import { Employee } from '../../interfaces/employee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Roles } from '../../interfaces/roles';
import { Genders } from '../../interfaces/genders';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css'
})
export class UpdateEmployeeComponent implements OnInit {

  employee: Employee;
  updateEmployeeForm: FormGroup;
  roles = Roles;
  genders = Genders;

  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.employeeService.getEmployeeById(this.route.snapshot.params.id).subscribe(data => {
      this.employee = data;
      this.updateEmployeeForm = this.fb.group({
        employeeId: [data.employeeId],
        firstName: [data.firstName, Validators.required],
        lastName: [data.lastName, Validators.required],
        role: [data.role, Validators.required],
        biography: [data.biography, Validators.required],
        gender: [data.gender, Validators.required],
        hireDate: [data.hireDate, Validators.required],
        salary: [data.salary, Validators.required]
      });
    });
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.updateEmployeeForm.value).subscribe(data => {
      this.router.navigate(["/employee"]);
    });
  }
}
