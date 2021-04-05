import { UserConfig } from 'gridjs';
import { GridEvents } from 'gridjs/dist/src/events';

export const GRIDJS_EVENTS: (keyof GridEvents)[] = [
  'beforeLoad',
  'cellClick',
  'load',
  'rowClick',
  'ready',
];

export const GRIDJS_PROPS: (keyof UserConfig)[] = [
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
  'plugins',
];
