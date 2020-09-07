# gridjs-angular

Angular wrapper for [Gridjs](https://github.com/grid-js/gridjs)

## Install

```bash
npm install gridjs gridjs-angular
```

## Usage

In your module

```ts
import { GridjsAngularModule } from 'gridjs-angular';

@NgModule({
  imports: [CommonModule,GridjsAngularModule],
  declarations: [...],
  exports: [...],
})
export class AppModule {}
```

In your component template

```ts
import { Component } from '@angular/core';
import { GridJsConfig } from 'gridjs-angular';

@Component({
  template: `<gridjs-angular
    [gridConfig]="gridConfig"
    (cellClick)="handleCellClick($event)"
    (rowClick)="handleRowClick($event)"
    (beforeLoad)="handleBeforeLoad($event)"
    (gridLoad)="handleGridLoad($event)"
  ></gridjs-angular>`,
})
class ExampleComponent {
  public gridConfig: GridJsConfig = {
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
```

Finally don't forget to add gridjs theme in your index.html

```html
<link
  href="https://unpkg.com/gridjs/dist/theme/mermaid.min.css"
  rel="stylesheet"
/>
```

## Inputs

- You can pass all Grid.js configs to the `<gridjs-angular>` component as inputs. See [Grid.js Config](https://gridjs.io/docs/config) for more details.

- `gridConfig` You can all pass Gridjs config as one object and it will be merged other gridjs inputs.

- `plugins` Gridjs plugins array. See [Grid.js Plugins](https://gridjs.io/docs/plugin/basics)

## Outputs

- You can pass all Gridjs events as outputs with a little difference `load` event renamed to `beforeLoad`. See [Gridjs Events](https://gridjs.io/docs/examples/event-handler)

### Can I Grid.js rendering helpers? Yes

- Using `h` function is working fine. See this example plugin.

```ts
 {
    id: 'myplugin',
    component: h(() => h('h1', {}, 'Hello world!'), {}),
    position: PluginPosition.Header,
  }
```

- You can also use `html` in column formatter like this.

```ts
 {
    name: 'Email',
    formatter: (_, row) => html(
        `<a href='mailto:${row.cells[1].data}'>${row.cells[1].data}</a>`
      )
  }
```

### Can I use Angular components in plugins, formatters, etc? Not yet
