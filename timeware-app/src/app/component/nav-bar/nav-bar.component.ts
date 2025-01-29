import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  standalone: false,

  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  imagemLogo: string = 'src/assets/Timeware_larger_logo-2-300x145-1.png';
}
