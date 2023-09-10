import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addUserForm!: FormGroup; 
  user!:Register
  constructor(private router:Router,private userService:UsersService){}
  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      'username': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
  });
  }
  addUser(){
    this.user=this.addUserForm.value
    console.log(this.user);
    
    this.userService.addUser(this.user).subscribe({
      next:()=>{
        this.router.navigate(['users-portal']);
      }
    })
  }

}
