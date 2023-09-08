import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service/users.service';

@Component({
  selector: 'app-users-portal',
  templateUrl: './users-portal.component.html',
  styleUrls: ['./users-portal.component.css']
})
export class UsersPortalComponent {

  constructor(private userService:UsersService){

  }

  ngOnInit(){
    this.getAllUsers()
  }

  getAllUsers(){
    this.userService.getUsers().subscribe({
      next:val=>{
        console.log(val);
        
      },
      error:err=>{
        console.log(err);
        
      }
    })
  }

}
