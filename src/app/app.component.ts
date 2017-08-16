import { Component, OnInit } from '@angular/core';
import { MenubarModule, MenuItem } from 'primeng/primeng';
import { NotificationsService } from '../providers/notifications.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ProSolution.Wow! (right click for context menu)';
  items: MenuItem[] = [];
  contextitems: MenuItem[] = [];


  constructor(
    private notificationsService: NotificationsService) { }

  ngOnInit() {
    // declarative
    this.items = [
      {
        label: 'Home',
        icon: 'fa-home',
        routerLink: ['/dashboard']
      },
      {
        label: 'Rooms',
        icon: 'fa-users',
        routerLink: ['/rooms']
      },
      {
        label: 'Students',
        icon: 'fa-users',
        items: [
          {
            label: 'Search',
            icon: 'fa-search',
            routerLink: ['/students']
          },
          {
            label: 'Applications',
            icon: 'fa-pencil',
            routerLink: ['/applications']
          },
          {
            label: 'Interviews',
            icon: 'fa-black-tie',
            routerLink: ['/interviews']
          },
          {
            label: 'Student Change Requests',
            icon: 'fa-id-card-o',
            routerLink: ['/changerequests/student']
          },
          {
            label: 'Additional Learning Support',
            icon: 'fa-life-ring',
            routerLink: ['/als']
          }
        ]
      },
      {
        label: 'Offerings',
        icon: 'fa-book',
        items: [
          {
            label: 'Search',
            icon: 'fa-search',
            routerLink: ['/offerings']
          },
        ]
      },
      {
        label: 'Registers',
        icon: 'fa-pencil',
        routerLink: ['/registers']
      },
      {
        label: 'Timetables',
        icon: 'fa-calendar',
        routerLink: ['/timetables']
      },
      {
        label: 'Exams',
        icon: 'fa-pencil-square-o',
        routerLink: ['/exams']
      },
      {
        label: 'Reports',
        icon: 'fa-file-text-o',
        routerLink: ['/reports']
      },
      {
        label: 'Other',
        icon: 'fa-circle-o',
        routerLink: ['/other']
      },
      {
        label: 'User Area',
        icon: 'fa-info',
        routerLink: ['/userarea']
      },
      {
        label: 'Help',
        icon: 'fa-help',
        routerLink: ['/help']
      },
    ];
    // alternative way to populate array
    this.contextitems.push({ label: 'Filter By Selection', icon: 'fa-filter', command: (event) => { this.notificationsService.notify('info', 'Filter', 'Filter Clicked'); } });
    this.contextitems.push({ label: 'Export to Excel', icon: 'fa-export', command: (event) => { this.notificationsService.notify('info', 'Export', 'Export Clicked'); } });
  }
}
