import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';
import {Data} from '../../providers/data/data';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

	items : any;
	count : number ;

  constructor(private navController: NavController, private _dataServices : Data) {
  	
  }

  ionViewLoaded(){
   	this.items= [];
  	this._dataServices.getDocuments().then((result) => {
      this.items = result;
    });
    this.count = 0;

   }

   addData(){
 	
 	this.count +=1;
    let date = new Date();

    /*
		let utc = new Date().toJSON().slice(0,10);
if (datetoDay === undefined ){
this.transferDate = utc;
    */
 
    let newDoc = {
        '_id': date,
        'message': date.toJSON().slice(0,10) +"|test Nº: "+ this.count
    };
 
    this._dataServices.addDocument(newDoc);
  }

}
