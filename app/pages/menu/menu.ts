import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from '../home/home';
import { AlertaPage} from '../alerta/alerta';




@Component({
  templateUrl: 'build/pages/menu/menu.html',
})
export class MenuPage {

  constructor(private nav: NavController) {

  }

  pages =[
	  	{id: 1, title: 'PouchDb' , component : HomePage, icon : 'md-cloud-upload'},
	  	{id :2, title: 'Local Notification' , component : AlertaPage, icon: 'md-notifications'}
	  	];

  gotoPage(pageNumber : number){
  	let page;
  	switch (pageNumber) {
  		case 1: 
  			page = this.pages[0].component;
  			console.log(this.pages[0].component);
  			break;
  		case 2: 
  			page =this.pages[1].component;
  			console.log(this.pages[1].component);
  			break;	
  		
  		default:
  			this.nav.pop();
  			break;
  	}

  	this.nav.push(page);
  }

}
