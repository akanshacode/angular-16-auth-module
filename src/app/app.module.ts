// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module'; 
import { AppComponent } from './app.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule], 
  providers: [], 
  bootstrap: [AppComponent],
})
export class AppModule {}