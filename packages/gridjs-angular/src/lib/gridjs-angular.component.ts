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
import { CommonModule } from '@angular/common';
import { Config, Grid } from 'gridjs';
import { GRID_JS_EVENTS, GRID_JS_PROPS } from './constants';
import { GridEvents } from 'gridjs/dist/src/events';

type GridJsAngularComponentProps = Omit<
  Partial<Config>,
  'instance' | 'store' | 'assign' | 'update'
>;
type GridEvent = keyof GridEvents;
type GridEventData<T extends GridEvent> = Parameters<
  GridEvents[T]
>[0] extends undefined
  ? void
  : Parameters<GridEvents[T]>[0];

type AnyFn = (...args: any[]) => any;
@Component({
  selector: 'gridjs-angular',
  template: '',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class GridJsAngularComponent
  implements AfterViewInit, OnChanges, OnDestroy, GridJsAngularComponentProps
{
  private nativeElement: HTMLElement;
  private instance?: Grid;
  private initialized = false;
  private listeners: Map<GridEvent, AnyFn> = new Map();
  @Input() config?: Partial<Config>;

  // props
  @Input() plugins: Config['plugins'] = [];
  @Input() eventEmitter?: Config['eventEmitter'];
  @Input() plugin?: Config['plugin'];
  @Input() data: Config['data'];
  @Input() server: Config['server'];
  @Input() header: Config['header'];
  @Input() from?: Config['from'];
  @Input() storage?: Config['storage'];
  @Input() pipeline?: Config['pipeline'];
  @Input() autoWidth?: Config['autoWidth'];
  @Input() width?: Config['width'];
  @Input() height?: Config['height'];
  @Input() translator?: Config['translator'];
  @Input() style: Config['style'];
  @Input() className: Config['className'];
  @Input() fixedHeader?: Config['fixedHeader'];
  @Input() columns?: Config['columns'];
  @Input() search?: Config['search'];
  @Input() pagination?: Config['pagination'];
  @Input() sort?: Config['sort'];
  @Input() language?: Config['language'];
  @Input() resizable?: Config['resizable'];
  @Input() processingThrottleMs?: Config['processingThrottleMs'];

  // events
  @Output() beforeLoad: EventEmitter<GridEventData<'beforeLoad'>> =
    new EventEmitter(true);
  // renamed load event to avoid conflict with native load event
  @Output() gridLoad: EventEmitter<GridEventData<'load'>> = new EventEmitter(
    true,
  );
  @Output() cellClick: EventEmitter<GridEventData<'cellClick'>> =
    new EventEmitter(true);
  @Output() rowClick: EventEmitter<GridEventData<'rowClick'>> =
    new EventEmitter(true);
  @Output() ready: EventEmitter<GridEventData<'ready'>> = new EventEmitter(
    true,
  );

  constructor(private elementDef: ElementRef) {
    this.nativeElement = this.elementDef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.instance = new Grid(this.getConfig(this.config ?? {}));
    this.registerEvents();
    this.instance.render(this.nativeElement);
    this.initialized = true;
  }

  ngOnChanges(): void {
    if (this.initialized) {
      this.updateConfig(this.config);
    }
  }

  ngOnDestroy(): void {
    if (this.initialized) {
      if (this.instance) {
        this.unregisterEvents();
        this.instance = undefined;
      }
    }
  }
  // public api to interact with grid instance
  getGridInstance() {
    return this.instance;
  }

  updateConfig(config: Partial<Config> = {}) {
    this.instance?.updateConfig(this.getConfig(config)).forceRender();
  }

  private registerEvents() {
    for (const event of GRID_JS_EVENTS) {
      const emitter = event === 'load' ? this.gridLoad : this[event];
      if (!emitter) {
        continue;
      }
      const listener: AnyFn = (args) => emitter.emit(args);
      this.listeners.set(event, listener);
      if (emitter) {
        this.instance?.on(event, listener);
      }
    }
  }

  private unregisterEvents() {
    for (const [event, listener] of this.listeners.entries()) {
      this.instance?.off(event, listener);
    }
  }

  private getConfig(config: Partial<Config> = {}) {
    const newConfig: Record<string, unknown> = structuredClone(config);
    for (const [key, value] of Object.entries(this)) {
      if (GRID_JS_PROPS.includes(key as keyof Config)) {
        newConfig[key] = value;
      }
    }
    this.config = newConfig;
    return newConfig;
  }
}
