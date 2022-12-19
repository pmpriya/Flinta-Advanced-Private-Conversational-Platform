import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import PouchDB from 'pouchdb';
// import * as PouchDB from 'pouchdb';
import { BuddyRecentDBProvider } from "../ServerDb/buddyRecentDB";
/*
  Generated class for the TodosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

//Poopandi (23/05/2019)
@Injectable()
export class BuddyChatBlockProvider {

    data: any;
    db: any;
    remote: any;
    buddy: any;
    unseenCount: any;
    myInfo: any;
   
    constructor( private BuddyRecentDB: BuddyRecentDBProvider) {
        console.log('Hello BuddyChatProvider ');


       
      

        // this.databaseservice.getLoggedUserInfo().then((val) => {
        //     this.myInfo = val;
        // })
    }

    // blockChat(data,uid, buddyid){
    //     console.log("data",buddyid,uid)
    //     var send={

    //         message_id:uid+"_"+buddyid,
    //         block:data,
            
    //         }

    //     this.updateBlock(send)
    // }

    getBlockData(uid,buddyid){
    
        return new Promise(resolve => {

            this.db.find({
                selector: {
                    "$or": [
                        {
                            "message_id": {
                                "$eq": uid + "_" + buddyid
                            }
                        },
                        {
                            "message_id": {
                                "$eq": buddyid + "_" + uid
                            }
                        }
                    ]
                    // $or	  "message_id":  uid + "_" + buddyid  ,
                },
                // fields: ['groupKey', groupKey],
                // sort: ['name']
            }).then((result) => {
                console.log("getbuddychat 22:" + JSON.stringify(result["docs"]));

                this.data = [];

                result.docs.forEach(element => {
                   

                    if (element.message_id == uid + "_" + buddyid || element.message_id == buddyid + "_" + uid) {
                        this.data.push(element);
                        console.log("row.doc :"+ JSON.stringify(element))

                        // if (row.doc.sentby != uid) {
                        //     var updatedata = {
                        //         _id: row.doc._id,
                        //         _rev: row.doc._rev,
                        //         message_id: row.doc.message_id,
                        //         block:true,
                                
                        //     }
            
                        //     // this.updateStatusMessage(updatedata)
                        // }
                    // }
                    }
                });

                resolve(this.data);


            }).catch((error) => {

                console.log(error);

            });

        });
    }

   


    // selfDestructChat(destruct) {
    //     console.log("destruct",destruct)
    //     try {
    //       var promise = new Promise((resolve, reject) => {
    //         // this.firebuddychatsINfo.child(firebase.auth().currentUser.uid).child(this.buddy.uid).update({
    //         //   SelfDestruction: destruct,
    //         //   timestamp: firebase.database.ServerValue.TIMESTAMP,
    //         // })
    
    //       });
    //       return promise;
    //     }
    //     catch (error) {
    //       //console.log("selfblockchat :" + error)
    //     }
    //   }

    retryUntilWritten(doc) {

        var self = this;
        return self.db.get(doc._id).then(function (origDoc) {
            console.log("retryUntilWritten 1:" + JSON.stringify(origDoc))

            doc._rev = origDoc._rev;
            return self.db.put(doc);
        }).catch(function (err) {
            console.log("retryUntilWritten 2err:" + JSON.stringify(err))

            if (err.status === 409) {
                return self.retryUntilWritten(doc);
            } else { // new doc
                return self.db.put(doc);
            }
        });
    }

    updateStatusMessage(todo) {
        console.log("updateStatusMessage : "+JSON.stringify(todo));
        this.retryUntilWritten(todo);
        // this.db.put(todo).catch((err) => {
        //     console.log(err);
        // });
    }
    
    updateBlock(todo) {
        console.log("post")
        try{
            this.db.post(todo).catch((err) => {
                console.log(err);
            });
        }
        catch(ex){
            console.log(ex);
        }
      
        
    }

    updateMessage(todo) {
        this.retryUntilWritten(todo);

        // this.db.put(todo).catch((err) => {
        //     console.log(err);
        // });
    }

    handleChange(change) {
        let changedDoc = null;
        let changedIndex = null;

        this.data.forEach((doc, index) => {

            if (doc._id === change.id) {
                changedDoc = doc;
                changedIndex = index;
            }

        });

        //A document was deleted
        if (change.deleted) {
            this.data.splice(changedIndex, 1);
        }
        else {

            //A document was updated
            if (changedDoc) {
                this.data[changedIndex] = change.doc;
            }

            //A document was added
            else {
                this.data.push(change.doc);
            }

        }

    }


}
