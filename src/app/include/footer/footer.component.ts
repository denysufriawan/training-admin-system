import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event)=>{
      if(this.router.url.match('/login'))
        $('.footer.segment').addClass('hide')
      else
        $('.footer.segment').removeClass('hide')
    })
  }

}
