import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  originalEmail: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.originalEmail = this.route.snapshot.paramMap.get('email') || '';
    const user = this.userService.getUserByEmail(this.originalEmail);

    this.userForm = this.fb.group({
      name: [user?.name, Validators.required],
      email: [user?.email, [Validators.required, Validators.email]],
      role: [user?.role, Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.updateUser(this.originalEmail, this.userForm.value);
      this.router.navigate(['/user-list']);
    }
  }
}