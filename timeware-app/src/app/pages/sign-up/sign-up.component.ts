import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-sign-up',
  standalone: false,

  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  name: string = '';
  email: string = '';
  password: string = ''
  confirmPassword: string = ''
  loading: boolean = false;

  constructor(private userService: UserService, private router: Router){}

  onSubmit(){
    this.loading = true;
    if (this.password !== this.confirmPassword) {
      alert("As senhas não coincidem!");
      return
    }

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.userService.CreateUsers(userData).subscribe(
      (response) => {
        console.log('Usuário registrado com sucesso:', response);
        alert('Usuário registrado com sucesso:');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Erro no registro:', error);
        alert('Erro ao registrar usuário. Tente novamente.');
        // Trate os erros de registro
      }
    )
  }
}
