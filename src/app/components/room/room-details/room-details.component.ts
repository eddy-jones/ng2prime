import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../../../../objects';
import { SelectItem, Dialog } from 'primeng/primeng';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {
  @Input() room: Room;
  @Input() dialog: Dialog;
  roomTypes: SelectItem[];
  submitted = false;
  orginalRoom: Room;
  constructor() {
    this.roomTypes = [];
    this.roomTypes.push({ label: '-- Please Select --', value: null });
    this.roomTypes.push({ label: 'ROOM TYPE 1', value: 26 });
    this.roomTypes.push({ label: 'THEATRE', value: 9 });
    this.roomTypes.push({ label: 'SPORTS HALL', value: 19 });

    this.orginalRoom = this.room;
  }

  ngOnInit() {
  }

  save(event: Event) {
    // console.log('saved');
    this.hide(event);
  }
  hide(event: Event) {
    this.room = this.orginalRoom; // restore data
    this.dialog.close(event);
  }
  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.room); }
}
