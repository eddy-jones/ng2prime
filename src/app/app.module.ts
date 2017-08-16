import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// custom modules
import { AppRoutingModule } from './modules/app-routing.module';

// components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StaffComponent } from './components/staff/staff.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { InputTextModule,
  DataTableModule,
  ButtonModule,
  DialogModule,
  SharedModule,
  MenubarModule,
  ConfirmDialogModule,
  GrowlModule,
  ContextMenuModule
 } from 'primeng/primeng';

 // services
import { ConfirmationService } from 'primeng/primeng';
import { NotificationsService } from '../providers/notifications.service';
import { DataService } from '../providers/data.service';

import 'rxjs/add/operator/map';


@NgModule({
  declarations: [
    AppComponent,
    NotificationsComponent,
    DashboardComponent,
    StaffComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    InputTextModule,
    DataTableModule,
    ButtonModule,
    DialogModule,
    SharedModule,
    MenubarModule,
    ConfirmDialogModule,
    GrowlModule,
    ContextMenuModule
  ],
  providers: [ConfirmationService, NotificationsService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
