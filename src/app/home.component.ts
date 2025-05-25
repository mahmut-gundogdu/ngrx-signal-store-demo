import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <h1>Welcome to the Home Page</h1>
    <p>This is the home page of your Angular app.</p>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
