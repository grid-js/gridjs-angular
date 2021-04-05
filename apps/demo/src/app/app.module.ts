import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GridJsAngularModule } from 'gridjs-angular';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, GridJsAngularModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
