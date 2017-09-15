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
    $('.ui.dropdown').dropdown();
    $('.ui.sidebar')
    .sidebar({
      context: $('body')
    })
    $('.toggle-menu').on('mouseover',function(){
      $('.ui.sidebar').sidebar('toggle');
    });
  }
}
