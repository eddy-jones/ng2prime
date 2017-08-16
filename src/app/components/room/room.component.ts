import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../providers/data.service';
import { Room } from '../../../objects';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  cols: any[] = [];
  rooms: Room[] = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.cols = [
      {field: 'RoomID', header: 'RoomID'},
      {field: 'RoomNo', header: 'RoomNo'},
      {field: 'Description', header: 'Description'}

  ];
  this.dataService.getRoomsMedium().then((rooms) => {
    this.rooms = rooms;
  });
  }

}
