import { Component } from '@angular/core';
import { GridJsAngularComponent } from 'gridjs-angular';
import { faker } from '@faker-js/faker/locale/en';
import { TData } from 'gridjs/dist/src/types';

@Component({
  selector: 'gridjs-angular-root',
  standalone: true,
  imports: [GridJsAngularComponent],
  template: `<gridjs-angular
    [data]="data"
    [columns]="columns"
    [sort]="true"
    [search]="true"
    [pagination]="true"
    (gridLoad)="onLoad($event)"
    (beforeLoad)="onBeforeLoad($event)"
    (ready)="onReady($event)"
    (cellClick)="onCellClick($event)"
    (rowClick)="onRowClick($event)"
  ></gridjs-angular>`,
})
export class AppComponent {
  onLoad = (event: any) => console.log('Grid loaded', event);
  onBeforeLoad = (event: any) => console.log('Before grid loaded', event);
  onReady = (event: any) => console.log('Grid ready', event);
  onCellClick = (event: any) => console.log('Grid cell clicked', event);
  onRowClick = (event: any) => console.log('Grid row clicked', event);

  columns = ['Name', 'Email', 'Phone Number'];
  data: TData = Array.from({ length: 100 }).map(() => [
    faker.person.fullName(),
    faker.internet.email(),
    faker.phone.number(),
  ]);
}
