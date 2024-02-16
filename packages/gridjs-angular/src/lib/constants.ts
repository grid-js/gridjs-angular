import type { Config } from 'gridjs';
import { GridEvents } from 'gridjs/dist/src/events';

export const GRID_JS_EVENTS: (keyof GridEvents)[] = [
  'beforeLoad',
  'cellClick',
  'load',
  'rowClick',
  'ready',
];

export const GRID_JS_PROPS: (keyof Config)[] = [
  'eventEmitter',
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
  'processingThrottleMs',
];
