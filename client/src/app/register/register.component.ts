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


  constructor(private fb: FormBuilder, private authService : AuthService, private router: Router) {}


  registerForm!: FormGroup;
  newIsSaved!:boolean;

  register : any = {
    userName: '',
    password: '',
    confirmPassword:''}

  createForm(){
    this.registerForm = this.fb.group({
      userName:['', [Validators.required]],
      password:['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    } ,{validators:  passwordMatchValidator}); }

    onSubmit(): void {
      if (this.registerForm.valid) {
        const { userName, password } = this.registerForm.value;
    
        this.authService.registerUser({ username: userName, password:password }).subscribe({
          next: (response) => {
            console.log("Registration successful:", response);
            this.newIsSaved = true;
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Registration failed:', error.error); 
          }
        });
      }
    }


ngOnInit() : void {
  this.createForm();
  this.newIsSaved = false;
}

canExit(){
  if(!this.newIsSaved){
    return window.confirm('You have unsaved changes. Do you really want to discard this change?');
    
  }else{
    return true;
  }
}

 goToLogin(){
    this.router.navigate(['/login'])
 }
}
