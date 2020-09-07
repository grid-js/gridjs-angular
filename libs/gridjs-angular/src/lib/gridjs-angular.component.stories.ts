import { Component } from '@angular/core';
import { h, html, PluginPosition } from 'gridjs';
import { GridJsAngularComponent } from './gridjs-angular.component';
import { GridJsAngularModule } from './gridjs-angular.module';

export default {
  title: 'GridJsAngularComponent',
};

export const primary = () => ({
  component: GridJsAngularComponent,
  props: {
    sort: true,
    columns: [
      'Name',
      {
        name: 'Email',
        formatter: (_, row) =>
          html(
            `<a href='mailto:${row.cells[1].data}'>${row.cells[1].data}</a>`
          ),
      },
      'Phone Number',
    ],
    data: [
      ['John', 'john@example.com', '(353) 01 222 3333'],
      ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
      ['Eoin', 'eoin@gmail.com', '0097 22 654 00033'],
      ['Sarah', 'sarahcdd@gmail.com', '+322 876 1233'],
      ['Afshin', 'afshin@mail.com', '(353) 22 87 8356'],
    ],
  },
});

@Component({
  template: `<gridjs-angular
    [gridConfig]="gridConfig"
    (cellClick)="handleCellClick($event)"
    (rowClick)="handleRowClick($event)"
    (beforeLoad)="handleBeforeLoad($event)"
    (gridLoad)="handleGridLoad($event)"
  ></gridjs-angular>`,
})
class GridJsEventsExample {
  gridConfig = {
    columns: ['Name', 'Email', 'Phone Number'],
    data: [
      ['John', 'john@example.com', '(353) 01 222 3333'],
      ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
      ['Eoin', 'eoin@gmail.com', '0097 22 654 00033'],
      ['Sarah', 'sarahcdd@gmail.com', '+322 876 1233'],
      ['Afshin', 'afshin@mail.com', '(353) 22 87 8356'],
    ],
  };

  handleCellClick(event: any) {
    console.log('cellClicked', event);
  }

  handleRowClick(event: any) {
    console.log('rowClicked', event);
  }

  handleBeforeLoad(event: any) {
    console.log('beforeLoad', event);
  }

  handleGridLoad(event: any) {
    console.log('load', event);
  }
}

export const events = () => ({
  moduleMetadata: {
    imports: [GridJsAngularModule],
    declarations: [GridJsEventsExample],
  },
  component: GridJsEventsExample,
});

export const plugins = () => ({
  component: GridJsAngularComponent,
  props: {
    sort: true,
    columns: ['Name', 'Email', 'Phone Number'],
    plugins: [
      {
        id: 'myplugin',
        component: h(() => h('h1', {}, 'Hello world!'), {}),
        position: PluginPosition.Header,
      },
    ],
    data: [
      ['John', 'john@example.com', '(353) 01 222 3333'],
      ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
      ['Eoin', 'eoin@gmail.com', '0097 22 654 00033'],
      ['Sarah', 'sarahcdd@gmail.com', '+322 876 1233'],
      ['Afshin', 'afshin@mail.com', '(353) 22 87 8356'],
    ],
  },
});

export const server = () => ({
  component: GridJsAngularComponent,
  props: {
    columns: ['Name', 'Language', 'Released At', 'Artist'],
    server: {
      url: 'https://api.scryfall.com/cards/search?q=Inspiring',
      then: (data) =>
        data.data.map((card) => [
          card.name,
          card.lang,
          card.released_at,
          card.artist,
        ]),
    },
  },
});
