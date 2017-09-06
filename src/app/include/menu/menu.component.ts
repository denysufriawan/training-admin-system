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
    $('.ui.sidebar')
    .sidebar({
      context: $('.bottom.segment')
    })
    $('.toggle-menu').on('mouseover',function(){
      $('.ui.sidebar').sidebar('show');
    });
  }
}