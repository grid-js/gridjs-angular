import { Component } from '@angular/core';
import { GridJsAngularComponent } from 'gridjs-angular';
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
  data: TData = [
    {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone_number: '555-123-4567',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone_number: '555-543-2109',
    },
    {
      name: 'Mike Johnson',
      email: 'm.johnson@example.com',
      phone_number: '555-987-6543',
    },
    {
      name: 'Sara Lee',
      email: 's.lee@example.com',
      phone_number: '555-345-6789',
    },
    {
      name: 'William Brown',
      email: 'w.brown@example.com',
      phone_number: '555-234-5678',
    },
    {
      name: 'Mary White',
      email: 'mary.white@example.com',
      phone_number: '555-765-4321',
    },
    {
      name: 'Daniel Green',
      email: 'd.green@example.com',
      phone_number: '555-456-7890',
    },
    {
      name: 'Emma Black',
      email: 'emma.black@example.com',
      phone_number: '555-876-5432',
    },
    {
      name: 'James Young',
      email: 'j.young@example.com',
      phone_number: '555-678-9012',
    },
    {
      name: 'Grace Kim',
      email: 'grace.kim@example.com',
      phone_number: '555-321-0987',
    },
    {
      name: 'Thomas Lee',
      email: 'thomas.lee@example.com',
      phone_number: '555-901-2345',
    },
    {
      name: 'Elizabeth Davis',
      email: 'elizabeth.davis@example.com',
      phone_number: '555-432-1098',
    },
    {
      name: 'Michael Harris',
      email: 'm.harris@example.com',
      phone_number: '555-789-0123',
    },
    {
      name: 'Laura Nguyen',
      email: 'laura.nguyen@example.com',
      phone_number: '555-234-5678',
    },
    {
      name: 'Kenneth Wilson',
      email: 'k.wilson@example.com',
      phone_number: '555-678-9012',
    },
    {
      name: 'Nancy Moore',
      email: 'nancy.moore@example.com',
      phone_number: '555-321-0987',
    },
    {
      name: 'Andrew Taylor',
      email: 'andrew.taylor@example.com',
      phone_number: '555-901-2345',
    },
    {
      name: 'Steven Thompson',
      email: 's.thompson@example.com',
      phone_number: '555-432-1098',
    },
  ].map((x) => [x.name, x.email, x.phone_number]);

}
