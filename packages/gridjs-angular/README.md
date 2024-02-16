# gridjs-angular

Angular wrapper for [Grid.js](https://github.com/grid-js/gridjs)

[![gridjs-angular repository on GitHub](https://img.shields.io/badge/github-gridjs--angular-green?logo=github&link=https%3A%2F%2Fgithub.com%2Fgrid-js%2Fgridjs-angular)](https://github.com/grid-js/gridjs-angular)
![GridJS peer Dependency Version](https://img.shields.io/npm/dependency-version/gridjs-angular/peer/gridjs)

## Install

```bash
npm install gridjs gridjs-angular
```

## Usage

In your component template

```ts
import { Component } from '@angular/core';
import { GridjsAngularModule } from 'gridjs-angular';
import { Config } from 'gridjs';

@Component({
  standalone: true,
  imports: [GridJsAngularComponent],
  template: `
    <gridjs-angular
      [gridConfig]="gridConfig"
      (cellClick)="handleCellClick($event)"
      (rowClick)="handleRowClick($event)"
      (beforeLoad)="handleBeforeLoad($event)"
      (gridLoad)="handleGridLoad($event)"
    ></gridjs-angular>
  `
})
class ExampleComponent {
  public gridConfig: Config = {
    columns: ['Name', 'Email', 'Phone Number'],
    data: [
      ['John', 'john@example.com', '(353) 01 222 3333'],
      ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
      ['Eoin', 'eoin@gmail.com', '0097 22 654 00033'],
      ['Sarah', 'sarahcdd@gmail.com', '+322 876 1233'],
      ['Afshin', 'afshin@mail.com', '(353) 22 87 8356']
    ]
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

Finally don't forget to add gridjs theme to your `angular.json` file, or import it some other way.

```json
styles: ["node_modules/gridjs/dist/theme/mermaid.min.css"]
```

## Inputs

- You can pass all Grid.js configs to the `<gridjs-angular>` component as inputs. See [Grid.js Config](https://gridjs.io/docs/config) for more details.

- `gridConfig` You can pass Grid.js config as one object and it will be merged with other Grid.js inputs.

- `plugins` Grid.js plugins array. See [Grid.js Plugins](https://gridjs.io/docs/plugin/basics)

## Outputs

- You can bind to all Grid.js events as outputs. Additionally, the `load` event can also be accessed via `gridLoad` (to avoid conflict with the native DOM `load` event). See [Grid.js Events](https://gridjs.io/docs/examples/event-handler)

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

### Can I use Angular template syntax in plugins, formatters, etc?

Not currently.

You can't use Angular template syntax in Grid.js plugins, formatters, etc. because they cannot be connected to Angular's change detection system. You can use `h` function or `html` function to create custom HTML for your grid.

## Development

The `gridjs-angular` repository is a monorepo that uses [Nx](https://nx.dev) and [pnpm](https://pnpm.io/).

### Useful commands

- `pnpm install` - Install all dependencies
- `nx serve demo` - Run demo app
- `nx migrate latest` - Update Nx to the latest version, and upgrade all packages from package.json to their latest version
