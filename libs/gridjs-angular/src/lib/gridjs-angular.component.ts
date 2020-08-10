import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Grid, UserConfig } from 'gridjs';
import type { GridEvents } from 'gridjs/dist/src/events';
import type Header from 'gridjs/dist/src/header';
import type { Language, Translator } from 'gridjs/dist/src/i18n/language';
import type Pipeline from 'gridjs/dist/src/pipeline/pipeline';
import type { Plugin, PluginManager } from 'gridjs/dist/src/plugin';
import type { ServerStorageOptions } from 'gridjs/dist/src/storage/server';
import type Storage from 'gridjs/dist/src/storage/storage';
import type Tabular from 'gridjs/dist/src/tabular';
import type { OneDArray, TColumn } from 'gridjs/dist/src/types';
import type Dispatcher from 'gridjs/dist/src/util/dispatcher';
import type { EventEmitter as GridJsEventEmitter } from 'gridjs/dist/src/util/eventEmitter';
import type { PaginationConfig } from 'gridjs/dist/src/view/plugin/pagination';
import type { SearchConfig } from 'gridjs/dist/src/view/plugin/search/search';
import type { GenericSortConfig } from 'gridjs/dist/src/view/plugin/sort/sort';
import { GRIDJS_EVENTS, GRIDJS_PROPS } from './constants';
import {
  GridJsClassName,
  GridJsConfig,
  GridJsData,
  GridJsStyles,
} from './types';
@Component({
  selector: 'gridjs-angular',
  template: '',
  encapsulation: ViewEncapsulation.None,
})
export class GridJsAngularComponent
  implements AfterViewInit, OnChanges, OnDestroy, GridJsConfig {
  private nativeElement: HTMLElement;
  private gridInstance: Grid;
  private initialized: boolean;
  private listeners: Map<string, (...args: any[]) => void> = new Map();
  @Input() gridConfig: Partial<UserConfig>;
  @Input() plugins: Plugin[] = [];
  // TODO: auto generate Inputs/Output to easily sync with grid-js main package
  // props
  @Input() eventEmitter: GridJsEventEmitter<GridEvents>;
  @Input() dispatcher: Dispatcher<any>;
  @Input() plugin: PluginManager;
  @Input() data?: GridJsData;
  @Input() server?: ServerStorageOptions;
  @Input() header?: Header;
  @Input() from: HTMLElement;
  @Input() storage: Storage<any>;
  @Input() pipeline: Pipeline<Tabular>;
  @Input() autoWidth: boolean;
  @Input() width: string;
  @Input() height: string;
  @Input() translator: Translator;
  @Input() style?: Partial<GridJsStyles>;
  @Input() className?: Partial<GridJsClassName>;
  @Input() fixedHeader: boolean;
  @Input() columns: OneDArray<TColumn | string>;
  @Input() search: SearchConfig | boolean;
  @Input() pagination: PaginationConfig | boolean;
  @Input() sort: GenericSortConfig | boolean;
  @Input() language: Language;
  // events
  @Output() beforeLoad: EventEmitter<void> = new EventEmitter(true);
  // renamed load event to avoid conflict with native load event
  @Output() gridLoad: EventEmitter<any> = new EventEmitter(true);
  @Output() cellClick: EventEmitter<any> = new EventEmitter(true);
  @Output() rowClick: EventEmitter<any> = new EventEmitter(true);

  constructor(elementDef: ElementRef) {
    this.nativeElement = elementDef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.gridInstance = new Grid(this.getConfig(this.gridConfig));
    this.registerPlugins();
    this.registerEvents();
    this.gridInstance.render(this.nativeElement);
    this.initialized = true;
  }

  ngOnChanges(changes: any): void {
    if (this.initialized) {
      this.updateConfig(this.gridConfig);
    }
  }

  ngOnDestroy(): void {
    if (this.initialized) {
      if (this.gridInstance) {
        this.unregisterEvents();
        this.gridInstance = null;
      }
    }
  }
  // public api to interact with grid instance
  getGridInstance() {
    return this.gridInstance;
  }

  updateConfig(config: Partial<UserConfig>) {
    this.gridInstance.updateConfig(this.getConfig(config)).forceRender();
  }

  private registerEvents() {
    for (const event of GRIDJS_EVENTS) {
      const emitter =
        event === 'load'
          ? this.gridLoad
          : <EventEmitter<any>>(<any>this)[event];
      const listener = (...args: any[]) => emitter.emit(args);
      this.listeners.set(event, listener);
      if (emitter) {
        this.gridInstance.on(event as any, listener);
      }
    }
  }

  private unregisterEvents() {
    for (const [event, listener] of this.listeners.entries()) {
      this.gridInstance.off(event as any, listener);
    }
  }

  private registerPlugins() {
    for (const plugin of this.plugins) {
      if (!this.gridInstance.plugin.get(plugin.id)) {
        this.gridInstance.plugin.add(plugin);
      }
    }
  }
  private getConfig(config: Partial<UserConfig>): UserConfig {
    const newConfig = { ...config };
    for (const [key, value] of Object.entries(this)) {
      if (GRIDJS_PROPS.includes(key as any)) {
        newConfig[key] = value;
      }
    }
    this.gridConfig = newConfig;
    return newConfig;
  }
}
