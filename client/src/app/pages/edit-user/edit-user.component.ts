import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cars } from 'src/app/models/cars';
import { Register } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  userId!: string
  user!: Register
  editedUser!:Register
  loading:boolean = true
  editUserForm!: FormGroup; 
  finalUser:Register={
    _id: '',
    username: '',
    email: '',
    password: ''
  }
  constructor(
    private route: ActivatedRoute,private router: Router,
    private userService: UsersService,
    )
  {

  } 

  ngOnInit(){
    this.route.paramMap.subscribe(params =>{
      this.userId = params.get('id')!
      this.getUserById()
    })
    
    
  }

  getUserById(){
    this.loading = true
    this.userService.getUserById(this.userId).subscribe({
      next: val=>{
        this.user = val.user

        this.editedUser=this.user
        this.editUserForm = new FormGroup({
          '_id':new FormControl(this.editedUser._id, Validators.required),
          'username':new FormControl(this.editedUser.username, Validators.required),
          'email':new FormControl(this.editedUser.email, Validators.required),
          'newpassword':new FormControl('', Validators.required),
          'repeatpassword':new FormControl('', Validators.required),
          
         
      });
        this.loading = false
        
      },
      error: err=>{
        alert(err)
        
      }
    })
  }

  editUser(){
    this.finalUser._id=this.editUserForm.value._id
    this.finalUser.username=this.editUserForm.value.username
    this.finalUser.email=this.editUserForm.value.email
    if(this.editUserForm.value.newpassword===this.editUserForm.value.repeatpassword)
    {
      this.finalUser.password=this.editUserForm.value.newpassword
      this.userService.editUser(this.finalUser).subscribe({
        next:()=>{
          alert("You have changed "+this.finalUser.email+" data.")
          this.router.navigate(['users-portal'])
        },
        error:err=>{
          console.log(err);
          
        }
      })
    }
    else
    {
      alert("Passwords do not match!")
    }

    
     
    
  }
}
