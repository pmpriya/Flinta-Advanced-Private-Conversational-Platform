import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServerDbSelfdestructProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerDbSelfdestructProvider {
    db1: any;
    remote1: any;
    data: any;
    constructor(public http: HttpClient) {
      
    }
    updatesSelfdesMessage(todo) {
        console.log("updateStatusMessage : " + JSON.stringify(todo));
        this.db1.put(todo).catch((err) => {
            console.log(err);
        });
    }
    
    updateSelfDestruct(todo) {
        console.log("updateSelfDestruct")

        var checkfalg = false;

        this.db1.find({
            selector: {
                "$or": [
                    {
                        "message_id": {
                            "$eq": todo.selffrom + "_" + todo.selfto
                        }
                    },
                    {
                        "message_id": {
                            "$eq": todo.selfto + "_" + todo.selffrom
                        }
                    }
                ]
                // $or	  "message_id":  uid + "_" + buddyid  ,
            },
            // fields: ['groupKey', groupKey],
            // sort: ['name']
        }).then((result) => {
            console.log("updateSelfDestruct getall:" + JSON.stringify(result["docs"]));

            var tempdata = [];
            if (result.docs.length != 0) {
                result.docs.forEach(element => {
                    if (element.selffrom == todo.selffrom && element.selfto == todo.selfto) {
                        checkfalg = true;
                        tempdata.push(element) ;
                    }

                })

                console.log("checkfalg :" + checkfalg)
                if (checkfalg == false) {
                    this.db1.post(todo).catch((err) => {
                        console.log(err);
                    });
                }
                else {
                    var send=null;

                    tempdata.forEach(element => {
                         send = {
                            _id:element._id,
                            _rev:element._rev,
                            message_id: element.message_id,
                            self: todo.self,
                            selffrom: todo.selffrom,
                            selfto: todo.selfto
                        }

                    });
                    

                    console.log("exits mesage:"+JSON.stringify(send))
                    this.db1.put(send).catch((err) => {
                        console.log(err);
                    });
                }
            }
            else {
                console.log("new insert :" + checkfalg)

                this.db1.post(todo).catch((err) => {
                    console.log(err);
                });
            }


        })





    }
    getDestructData(uid, buddyid) {
        console.log("uid,buddyid", uid, buddyid)

        return new Promise(resolve => {

            this.db1.find({
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
                        console.log("row.doc :" + JSON.stringify(element))


                        // if (row.doc.sentby != uid) {
                        //     var updatedata = {
                        //         _id: row.doc._id,
                        //         _rev: row.doc._rev,
                        //         message_id: row.doc.message_id,
                        //         Destruct:true,

                        //     }

                        //     // this.updateStatusMessage(updatedata)
                        // }
                        // }
                    }
                });

                resolve(this.data);

                // this.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
                //     console.log("live changes")
                //     this.handleChange(change);
                //     // this.events.publish('newmessage');
                // });

            }).catch((error) => {

                console.log(error);

            });

        });
    }
}
