import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToggleButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isDarkMode = false;

  ngOnInit() {
    // Check if dark mode is already enabled
    const element = document.querySelector('html');
    this.isDarkMode = element?.classList.contains('my-app-dark') || false;
  }

  onToggleChange(event: any) {
    this.isDarkMode = event.checked;
    const element = document.querySelector('html');
    if (this.isDarkMode) {
      element?.classList.add('my-app-dark');
    } else {
      element?.classList.remove('my-app-dark');
    }
  }
}
