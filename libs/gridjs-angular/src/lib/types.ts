import type { GridEvents } from 'gridjs/dist/src/events';
import type Header from 'gridjs/dist/src/header';
import type { Language, Translator } from 'gridjs/dist/src/i18n/language';
import type Pipeline from 'gridjs/dist/src/pipeline/pipeline';
import type { PluginManager } from 'gridjs/dist/src/plugin';
import type { ServerStorageOptions } from 'gridjs/dist/src/storage/server';
import type Storage from 'gridjs/dist/src/storage/storage';
import type Tabular from 'gridjs/dist/src/tabular';
import type {
  CSSDeclaration,
  OneDArray,
  TColumn,
  TData,
} from 'gridjs/dist/src/types';
import type Dispatcher from 'gridjs/dist/src/util/dispatcher';
import type { EventEmitter } from 'gridjs/dist/src/util/eventEmitter';
import type { PaginationConfig } from 'gridjs/dist/src/view/plugin/pagination';
import type { SearchConfig } from 'gridjs/dist/src/view/plugin/search/search';
import type { GenericSortConfig } from 'gridjs/dist/src/view/plugin/sort/sort';

// TODO: find anther way to get grid config interface type
export interface GridJsConfig {
  eventEmitter: EventEmitter<GridEvents>;
  dispatcher: Dispatcher<any>;
  plugin: PluginManager;
  data?: GridJsData;
  server?: ServerStorageOptions;
  header?: Header;
  from: HTMLElement;
  storage: Storage<any>;
  pipeline: Pipeline<Tabular>;
  autoWidth: boolean;
  width: string;
  height: string;
  translator: Translator;
  style?: Partial<GridJsStyles>;
  className?: Partial<GridJsClassName>;
  fixedHeader: boolean;
  columns: OneDArray<TColumn | string>;
  search: SearchConfig | boolean;
  pagination: PaginationConfig | boolean;
  sort: GenericSortConfig | boolean;
  language: Language;
}

export interface GridJsStyles {
  table: CSSDeclaration;
  td: CSSDeclaration;
  th: CSSDeclaration;
  container: CSSDeclaration;
  header: CSSDeclaration;
  footer: CSSDeclaration;
}

export interface GridJsClassName {
  td: string;
  container: string;
  footer: string;
  header: string;
}

export type GridJsData = TData | (() => TData) | (() => Promise<TData>);
