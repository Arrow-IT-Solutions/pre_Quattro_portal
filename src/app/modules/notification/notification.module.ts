import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationsComponent } from './notifications/notifications.component';
import { AddNotificationComponent } from './add-notification/add-notification.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponseBase } from 'src/app/shared/class/class';



@NgModule({
  declarations: [
    NotificationsComponent,
    AddNotificationComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class NotificationModule { }
export interface NotificationsResponse extends ResponseBase  {
    
}
