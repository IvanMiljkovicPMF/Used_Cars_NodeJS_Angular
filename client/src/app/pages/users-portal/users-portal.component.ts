import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service/users.service';

@Component({
  selector: 'app-users-portal',
  templateUrl: './users-portal.component.html',
  styleUrls: ['./users-portal.component.css']
})
export class UsersPortalComponent {

  loading: boolean = true

  users:any[]=[]


  constructor(private userService:UsersService,
      private router:Router,
    ){

  }

  ngOnInit(){
    this.getAllUsers()
  }

  getAllUsers(){
    this.loading=true
    this.userService.getUsers().subscribe({
      next:val=>{
        this.loading = false
        this.users = []
        
        for(let i =0;i<val.users.length;i++){
          this.users.push(val.users[i])
        }

      },
      error:err=>{
        console.log(err);
        
      }
    })
  }

  navigateToEdit(id:string){
    this.router.navigate([`edit-user/${id}`])
  }

  deleteUser(id:string){
    if (window.confirm("Are you sure you want to delete this user?")) {
      this.userService.deleteUser(id).subscribe({
        next:val=>{
          alert("You have deleted a user.")
          this.users = this.users.filter(user => user._id !== id);
        },
        error:err=>{
          console.log(err);
          alert("An error has occured")
          
        }
      })
    }

   
  }

}
