import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GridJsAngularComponent } from 'gridjs-angular';
import 'gridjs/dist/theme/mermaid.css';

@Component({
  standalone: true,
  imports: [GridJsAngularComponent, RouterModule],
  selector: 'gridjs-angular-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  columns = ['Name', 'Email', 'Phone Number'];
  data = [
    ['John', 'john@example.com', '(353) 01 222 3333'],
    ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
  ];
}
