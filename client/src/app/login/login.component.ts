import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoggedIn: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,) {}
  loginForm!: FormGroup;
  createForm() : void{
    this.loginForm = this.fb.group({
      userName:['', [Validators.required]],
      password:['', [Validators.required, Validators.minLength(6)]]
    });
 }

 ngOnInit() :void {
  this.createForm();
}

   
async onSubmit(){
  try {
     if (this.loginForm.valid) {
       const userData = this.loginForm.value;
       
       this.authService.loginUser(userData).subscribe(
         (response: any) => {
           console.log('logged in successfully: ', response);
  

           const jwtToken = response;
           localStorage.setItem('token', jwtToken);
            if(jwtToken){
              this.router.navigate(['/books']);
            }
        
         },
         (error) => {
           console.log('login failed: ', error);
         }
       );
     }
  } catch (error) {
     console.log('login failed: ', error);
  }
 }


  goToRegister(){
    this.router.navigate(['/register'])
  }

  //Missing Code

}
