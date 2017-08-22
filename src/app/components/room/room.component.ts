import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../providers/data.service';
import { NotificationsService } from '../../../providers/notifications.service';
import { Room, CCCDataSource } from '../../../objects';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  dialogVisible: boolean;
  DS: CCCDataSource;
  constructor(private dataService: DataService, private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.loadData('Room');
  }

  loadData(dataSource: string) {
    this.dataService.getDataSourceFromName(dataSource) // Get DataSourceID
      .then((res) => {
        this.DS = res[0]; // this triggers the grid load
      });
  }

  onRowSelected($event: Event) {
    this.dialogVisible = true;
  }
  dialogOpened() {
    this.notificationsService.notify('info', 'Dialog Opened', 'Room Details Form Opened');
  }

  dialogClosed() {
    this.notificationsService.notify('info', 'Dialog Closed', 'Room Details Form Closed');
  }
}
