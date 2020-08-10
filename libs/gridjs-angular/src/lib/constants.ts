import { GridEvents } from 'gridjs/dist/src/events';
import { GridJsConfig } from './types';

export const GRIDJS_EVENTS: (keyof GridEvents)[] = [
  'beforeLoad',
  'cellClick',
  'load',
  'rowClick',
];

export const GRIDJS_PROPS: (keyof GridJsConfig)[] = [
  'eventEmitter',
  'dispatcher',
  'plugin',
  'data',
  'server',
  'header',
  'from',
  'storage',
  'pipeline',
  'autoWidth',
  'width',
  'height',
  'translator',
  'style',
  'className',
  'fixedHeader',
  'columns',
  'search',
  'pagination',
  'sort',
  'language',
];
