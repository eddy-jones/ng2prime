import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// custom modules
import { AppRoutingModule } from './modules/app-routing.module';

// components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoomComponent } from './components/room/room.component';
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
 import { MultiSelect, Dropdown } from 'primeng/primeng';

 // services
import { ConfirmationService } from 'primeng/primeng';
import { NotificationsService } from '../providers/notifications.service';
import { DataService } from '../providers/data.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { RoomDetailsComponent } from './components/room/room-details/room-details.component';
import { GridComponent } from './components/grid/grid.component';
@NgModule({
  declarations: [
    AppComponent,
    NotificationsComponent,
    DashboardComponent,
    RoomComponent,
    MultiSelect,
    Dropdown,
    RoomDetailsComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot(),
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
