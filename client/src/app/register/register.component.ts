import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { passwordMatchValidator } from './passwordMatch.validator';

@Component({
 selector: 'app-registration',
 templateUrl: './register.component.html',
 styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 registrationForm!: FormGroup;

 isSubmitted = false;

 constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,) {}

 ngOnInit() :void {
    this.createForm();

 }

 createForm() : void{
     this.registrationForm = this.fb.group({
       userName:['', [Validators.required]],
       password:['', [Validators.required, Validators.minLength(6)]],
       confirmPassword: ['', [Validators.required]],
       jobId: [null, Validators.required]
     }, {validators: passwordMatchValidator});
 }

 get userName(){
    return this.registrationForm.get('userName');
 }



 onSubmit() : void{

    if (this.registrationForm.valid) {
      const { confirmPassword, jobId, ...userData } = this.registrationForm.value;
      this.isSubmitted = true;

      this.authService.registerUser({ ...userData}).subscribe({
        next: (response) => {
          console.log("Registration successful: ",response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log('Registration failed: ', error);
        }
      });
    }
 }

 canExit(){
  if(this.registrationForm.dirty && this.isSubmitted==false){
    return window.confirm("Information on the register page can be lost unless saved before leaving")
  }
 }

 goToLogin(){
    this.router.navigate(['/login'])
 }
}
