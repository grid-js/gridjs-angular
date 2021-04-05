import { Component } from '@angular/core';
import { h, PluginPosition } from 'gridjs';

@Component({
  selector: 'gridjs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public config = {
    sort: true,
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
    plugins: [
      {
        id: 'myplugin',
        component: h(() => h('h1', {}, 'Hello world!'), {}),
        position: PluginPosition.Header,
      },
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
  handleGridReady(event: any) {
    console.log('ready', event);
  }
}
