import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


// import { DatabaseProvider } from "../../providers/database/database";
import { ApiserviceService } from "../../app/apiservice.service";
/*
  Generated class for the TodosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

//Poopandi (23/05/2019)
@Injectable()
export class BuddyRecentDBProvider {

    recentList: any;
    data: any;
    db: any;
    remote: any;
    buddy: any;
    myInfo: any;
    constructor(private ApiserviceService: ApiserviceService, private HttpClient: HttpClient) {
        console.log('Hello BuddyRecentDBProvider ');



        // this.db.replicate.from(this.remote).on('complete', function () {

        // })

        // this.db.replicate.to(this.remote).on('complete', function () {

        // })
        //  this.db.sync(this.remote, options)
        // this.db.setMaxListeners(20);  // or 30 or 40 or however many you need


        // //this.db.replicate.to('http://mydesk.flinta.uk:5984/cloudo').
        // this.db.sync(this.remote, options);

        // this.databaseservice.getLoggedUserInfo().then((val) => {
        //     this.myInfo = val;
        // })
    }


    getrecentdb(uid) {
        console.log("Logged user:" + localStorage.getItem("FlintauserID"))
        var promise = new Promise((resolve, reject) => {

            var obj = {
                "myid": uid,

            }
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/getrecent_chatlist1", obj).then(res => {
                resolve(res)
            })

        });
        return promise;
    }
   
  

   
  
    cleardata() {

    }
 

 

    initializebuddy(buddy) {
        console.log("buddy#############################", buddy)
        this.buddy = buddy;

    }
    createMessage(todo) {
        console.log("#############################", +JSON.stringify(todo));
        return new Promise(resolve => {

            this.db.post(todo)

            resolve(true)
        })
        // PouchDB.replicate('flinta_checkrecentdb', this.remote, { batch_size: 110 })

        // this.db.replicate.from(this.remote).on('complete', function () {
        //     console.log("replicate changes")

        // })
        // this.db.replicate.to(this.remote).on('complete', function () {
        //     console.log("replicate changes")
        // })
    }
 
   



}
