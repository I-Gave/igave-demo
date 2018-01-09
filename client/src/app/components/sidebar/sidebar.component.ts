import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    faclass: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '', faclass: '' },
    { path: 'mytokens', title: 'I Gave', icon: '', class: '', faclass: 'fas fa-heart' },
    { path: 'campaigns', title: 'Campaigns',  icon: 'event', class: '', faclass: ''  },
    { path: 'mycampaigns', title: 'My Campaigns', icon: 'content_paste', class: '', faclass: ''  },
    { path: 'user-profile', title: 'My Profile',  icon:'person', class: '', faclass: ''  },
/*
    { path: 'table-list', title: 'Table List',  icon:'content_paste', class: '', faclass: ''  },
    { path: 'typography', title: 'Typography',  icon:'library_books', class: '', faclass: ''  },
    { path: 'icons', title: 'Icons', icon: 'bubble_chart', class: '', faclass: ''  },
    { path: 'maps', title: 'Maps',  icon:'location_on', class: '', faclass: ''  },
    { path: 'notifications', title: 'Notifications',  icon:'notifications', class: '', faclass: ''  },
*/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
