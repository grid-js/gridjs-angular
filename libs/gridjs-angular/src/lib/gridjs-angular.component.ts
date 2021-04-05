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
import { GRIDJS_EVENTS, GRIDJS_PROPS } from './constants';


@Component({
  selector: 'gridjs-angular',
  template: '',
  encapsulation: ViewEncapsulation.None,
})
export class GridJsAngularComponent
  implements AfterViewInit, OnChanges, OnDestroy,UserConfig {
  private nativeElement: HTMLElement;
  private gridInstance: Grid;
  private initialized: boolean;
  private listeners: Map<string, (...args: any[]) => void> = new Map();
  @Input() config: UserConfig;
  // TODO: auto generate Inputs/Output to easily sync with grid-js main package
  // props
  @Input() plugins: UserConfig['plugins']= [];
  @Input() eventEmitter:  UserConfig['eventEmitter'];
  @Input() dispatcher:UserConfig['dispatcher'];
  @Input() plugin: UserConfig['plugin'];
  @Input() data: UserConfig['data'];
  @Input() server: UserConfig['server'];
  @Input() header: UserConfig['header'];
  @Input() from: UserConfig['from'];
  @Input() storage: UserConfig['storage'];
  @Input() pipeline: UserConfig['pipeline'];
  @Input() autoWidth: UserConfig['autoWidth'];
  @Input() width: UserConfig['width'];
  @Input() height: UserConfig['height'];
  @Input() translator: UserConfig['translator'];
  @Input() style: UserConfig['style'];
  @Input() className: UserConfig['className'];
  @Input() fixedHeader: UserConfig['fixedHeader'];
  @Input() columns: UserConfig['columns'];
  @Input() search: UserConfig['search'];
  @Input() pagination:UserConfig['pagination'];
  @Input() sort:UserConfig['sort'];
  @Input() language: UserConfig['language'];

  // events
  @Output() beforeLoad: EventEmitter<void> = new EventEmitter(true);
  // renamed load event to avoid conflict with native load event
  @Output() gridLoad: EventEmitter<any> = new EventEmitter(true);
  @Output() cellClick: EventEmitter<any> = new EventEmitter(true);
  @Output() rowClick: EventEmitter<any> = new EventEmitter(true);
  @Output() ready: EventEmitter<any> = new EventEmitter(true);

  constructor(private elementDef: ElementRef) {
    this.nativeElement = this.elementDef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.gridInstance = new Grid(this.getConfig(this.config));
    this.registerEvents();
    this.gridInstance.render(this.nativeElement);
    this.initialized = true;
  }

  ngOnChanges(): void {
    if (this.initialized) {
      this.updateConfig(this.config);
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

  private getConfig(config: Partial<UserConfig>): UserConfig {
    const newConfig = { ...config };
    for (const [key, value] of Object.entries(this)) {
      if (GRIDJS_PROPS.includes(key as any)) {
        newConfig[key] = value;
      }
    }
    this.config = newConfig;
    return newConfig;
  }
}
