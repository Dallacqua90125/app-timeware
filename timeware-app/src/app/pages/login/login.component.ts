import { UserService } from '../../services/users/user.service';
import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/Users';
import * as CryptoJS from 'crypto-js'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loading: boolean = false;
  users: Users[] = [];
  usersGeral: Users[] = [];
  email: string = '';
  password: string = '';

  constructor( private userService: UserService, private router: Router ){}

  ngOnInit(): void {
      this.userService.GetUsers().subscribe(response => {

        this.users = response;
        this.usersGeral = response;

        console.log(response)
      })
  }

  onSubmit(){

    this.loading = true;
    const hashedPassword = CryptoJS.SHA256(this.password).toString(CryptoJS.enc.Base64);
    let funf: boolean = false
    this.users.forEach(user => {
      if (this.email == user.email && hashedPassword == user.password) {
        alert(`Seja bem vindo ${user.name}`);
        funf = true
        this.loading = false;
        this.router.navigate(['/content']);
      }
    })
    if (funf == false) {
      alert("Usuário não encontrado");
      this.loading = false;
    }

  }
}
