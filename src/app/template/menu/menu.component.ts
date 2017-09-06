import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toggle()
  {
      $('.ui.sidebar').sidebar('setting', 'transition', 'uncover').sidebar('toggle');
  }
}
