import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private formBuilder:FormBuilder, private router:Router, private http:HttpClient){}

loginform! : FormGroup
  ngOnInit(): void {
   this.loginform=this.formBuilder.group({
    email:['',Validators.required],
    password:['',Validators.required],
   })
  }


  login(){
   this.http.get<any>("http://localhost:3000/signup").subscribe(res=>{
// match email and password
const user =res.find((a:any)=>{
  return a.email === this.loginform.value.email && a.password=== this.loginform.value.password
})

//condition for login
if (user){
  alert("suceesfully logged in");
  this.loginform.reset();
  this.router.navigate(['header'])
} else{
  alert('user not found with cedentials');
}

   },
   err=>{
    alert("something went wrong")
   }
   )
}
}