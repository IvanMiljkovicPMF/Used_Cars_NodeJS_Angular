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
        console.log(val);
        console.log(val.users);
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

    // Use the filter method to create a new array without the item with the matching ID
    // this.allCars = this.allCars.filter(car => car._id !== id);
    
    this.userService.deleteUser(id).subscribe({
      next:val=>{
        console.log(val);
        this.users = this.users.filter(user => user._id !== id);
      },
      error:err=>{
        console.log(err);
        alert("An error has occured")
        
      }
    })
  }

}
