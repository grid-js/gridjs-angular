import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';
import { Config, Grid } from 'gridjs';
import { GRID_EVENTS, GridJsAngularBindingBase } from './gridjs-binding-base';
import { GridEvents } from 'gridjs/dist/src/events';

/** only properties that exist on the Config interface (not the Config class) */
type EventName = keyof GridEvents;
type EventHandler = (...args: any[]) => void;

@Component({
  selector: 'gridjs-angular',
  standalone: true,
  template: '',
})
export class GridJsAngularComponent
  extends GridJsAngularBindingBase
  implements AfterViewInit, OnDestroy
{
  private readonly listeners = new Map<EventName, EventHandler>();

  /** alias of `load` event due to possible conflict with native load event */
  @Output() readonly gridLoad = this.load;

  constructor(private readonly host: ElementRef) {
    super();
  }

  ngAfterViewInit(): void {
    const instance = new Grid(this.config());
    this.instance.set(instance);
    this.registerEvents();
    instance.render(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.instance()) {
      this.unregisterEvents();
      this.instance.set(undefined);
    }
  }

  // public api to interact with grid instance
  getGridInstance() {
    return this.instance();
  }

  updateConfig(config: Partial<Config> = {}) {
    this.gridConfig.set(config);
  }

  private registerEvents() {
    for (const event of GRID_EVENTS) {
      const emitter = (<any>this)[event] as EventEmitter<any>;
      if (!emitter) {
        continue;
      }
      const listener = (...args: any[]) => emitter.emit(args);
      this.listeners.set(event, listener);
      this.instance()?.on(event, listener);
    }
  }

  private unregisterEvents() {
    for (const [event, listener] of this.listeners.entries()) {
      this.instance()?.off(event, listener);
    }
  }
}
