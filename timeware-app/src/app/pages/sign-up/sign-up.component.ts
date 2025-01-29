import { Router } from '@angular/router';
import { UserService } from '../../services/users/user.service';
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
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;
  errorMessage: string = '';  // Para armazenar a mensagem de erro

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    const userData = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.userService.CreateUsers(userData).subscribe(
      (response) => {
        console.log('Usuário registrado com sucesso:', response);
        alert('Usuário registrado com sucesso!');
        this.router.navigate(['/login']);
        this.loading = true;
      },
      (error) => {
        console.error('Erro no registro:', error);
        this.errorMessage = error;  // Armazenando a mensagem de erro
        alert(this.errorMessage);  // Exibindo o erro em um alert
        this.loading = false;
      }
    );
  }
}
