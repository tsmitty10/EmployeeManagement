import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { Roles } from '../../interfaces/roles';
import { Genders } from '../../interfaces/genders';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {

  addEmployeeForm: FormGroup;
  showError: boolean;
  roles = Roles;
  genders = Genders;

  constructor(private employeeService: EmployeeService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.addEmployeeForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      role: [null, Validators.required],
      biography: [null, Validators.required],
      gender: [null, Validators.required],
      hireDate: [null, Validators.required],
      salary: [null, Validators.required]
    });
  }

  onSubmit() {
    this.employeeService.addEmployee(this.addEmployeeForm.value).subscribe(data => {
      this.router.navigate(["/employee"]);
    }, error => {
      this.showError = true;
    });
  }

}
