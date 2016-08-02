import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage, SqlStorage} from 'ionic-angular';
//import * as pouch from 'pouchdb';
import * as PouchDB from 'pouchdb';

//var PouchDB = require('pouchdb');

@Injectable()
export class Data {
  data: any;
  db: any;
  remote: any;
  username : string;
  password : string; 


/*
api: https://dbe71cc5-edb3-4fed-ad92-3edae4126125-bluemix.cloudant.com/testdb/_security
Key:rightsentookedgeneachark
Password:c3a8ec22efd6cb959e04f4e2597dd25ab2dad405
*/
  constructor() {
   this.db = new PouchDB('testdb');
    this.username = 'rightsentookedgeneachark';
    this.password = 'c3a8ec22efd6cb959e04f4e2597dd25ab2dad405';
    this.remote = 'https://dbe71cc5-edb3-4fed-ad92-3edae4126125-bluemix.cloudant.com/testdb';
 
    let options = {
      live: true,
      retry: true,
      continuous: true,
      auth: {
        username: this.username,
        password: this.password
      }
    };
 
    this.db.sync(this.remote, options);
  }

  addDocument(doc){
    this.db.put(doc);
  }
 
  getDocuments(){
 
    return new Promise(resolve => {
      this.db.allDocs({
        include_docs: true
 
      }).then((result) => { 
        this.data = [];
        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
          resolve(this.data);
        });
        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });
 
      }).catch((error) => {
 
        console.log("fallo:"+error);
      }); 
    });
  }
 
  handleChange(change){
 
    let changedDoc = null;
    let changedIndex = null;
 
    this.data.forEach((doc, index) => {
      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }
    });
    //A document was deleted
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    } 
    else {
      //A document was updated
      if(changedDoc){
        this.data[changedIndex] = change.doc;
      } 
      //A document was added
      else {
        this.data.push(change.doc);        
      }
    }
  }  

 
}

