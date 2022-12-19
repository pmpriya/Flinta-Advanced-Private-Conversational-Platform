import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BuddyRecentDBProvider } from "../ServerDb/buddyRecentDB";
// import { LoginProvider } from "../ServerDb/loginprovider";
import { FirebaseMessagingProvider } from "../firebase-messaging/firebase-messaging";
import { Platform } from '@ionic/angular';
import { ApiserviceService } from "../../app/apiservice.service";
import { NetworkService } from "../../app/network.service";
/*
  Generated class for the TodosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
// import * as io from 'socket.io-client';
import { Socket } from 'ngx-socket-io';

//Poopandi (23/05/2019)
@Injectable()
export class BuddyChatProvider {

    data: any;
    db: any;
    remote: any;
    buddy: any;
    selDestTime: any;
    // socket: any;

    unseenCount: any;
    myInfo: any;
    checkallcount = [];
    // private LoginProvider: LoginProvider,
    constructor(private fcm: FirebaseMessagingProvider, private networkProvider: NetworkService, private socket: Socket, private ApiserviceService: ApiserviceService, private platform: Platform, private HttpClient: HttpClient, private BuddyRecentDB: BuddyRecentDBProvider) {
        console.log('Hello BuddyChatProvider ');
        // PouchDB.plugin(PouchdbFind);
        // this.socket = io('http://192.168.43.73:3000');
        // this.socket = io(this.ApiserviceService.socketconfig);
        this.socket.connect();

        // this.databaseservice.getLoggedUserInfo().then((val) => {
        //     this.myInfo = val;
        //     console.log("this.myInfo :" + JSON.stringify(this.myInfo))
        // })
    }

    updatefavouritechat(message_id,timestamp,sentby,favourite){
        return new Promise(resolve => {

            var obj = {
                "message_id":message_id,
                "timestamp": timestamp,
                "sentby": sentby,
                "myfavourite":favourite
            }
            if (sentby == localStorage.getItem("FlintauserID")) {
                this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/updateMyfavouritechat", obj).then(res => {
                    resolve(true)
                }).catch(err => {
                    resolve(true)
                })
            }
            else {
                this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/updateMyFriendChat", obj).then(res => {
                    resolve(true)
                }).catch(err => {
                    resolve(true)
                })
            }

        })
    }
    getbuddychat(message_id, message_id1) {
        //  this.BuddyRecentDB.upadteStatus(buddyid);

        console.log("getbuddychat" + message_id + ":" + message_id1 + ":" + JSON.stringify(this.data));
        this.unseenCount = 0;
        if (this.data != undefined && this.data.length != 0) {
            return Promise.resolve(this.data);
        }

        return new Promise(resolve => {



            var obj = {
                "message_id": message_id,
                "message_id1": message_id1,

            }
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/buddy_chatlist", obj).then(res => {
                resolve(res)
            })

        });
    }



    selfDestruct(time) {
        try {

            this.selDestTime = time;
            console.log("this.selDestTime", this.selDestTime)


            this.data.forEach(element => {
                var chval = element;
                if (chval.timestamp != undefined && chval.status == "2" && chval.timestamp > this.selDestTime || chval.timestamp == this.selDestTime) {
                    setTimeout(() => {
                        var send = {

                            "_id": element._id,
                            "_rev": element._rev,
                            "message_id": element.message_id,
                            "Destruct": false,

                        }
                        this.deleteMessage(send)
                    }, 3000);
                }

            });

            //Me
            // this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).on('value', (childSnapshot) => {
            //   // console.log("me childSnapshot : " + JSON.stringify(childSnapshot));

            //   childSnapshot.forEach(element => {
            //     var pkey = element.key;
            //     var chval = element.val();
            //     console.log("setInterval:" + chval.timestamp > this.selDestTime);
            //     console.log("setInterval:" + chval.timestamp + ":" + this.selDestTime);

            //     if (chval.timestamp != undefined && chval.status == "2" && chval.timestamp > this.selDestTime || chval.timestamp == this.selDestTime) {


            //       console.log("chval clear me: " + chval.timestamp + "pkey : " + pkey);
            //       // this.firebuddychats.child(this.buddy.uid).child(firebase.auth().currentUser.uid).child(pkey).remove();
            //       this.hideFooterTimeout = setTimeout(() => {

            //         this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).child(pkey).remove();
            //       }, 3000);



            //     } else {
            //       clearInterval(this.hideFooterTimeout)
            //     }
            //   });

            // });


        }
        catch (error) {
            // //console.log("deleteMessage :" + error)
        }
    }

    initializebuddy(buddy) {
        this.buddy = buddy;

    }


    clearChat() {
        this.data = [];
    }


    updateCreateMessage(todo) {



        console.log("insert new chat :" + JSON.stringify(todo))
        var data = 1;


        this.checkallcount.push({
            count: data
        });


        var array = {
            message: this.ApiserviceService.encryptText(todo.message),
            sentby: todo.sentby,
            displayName: todo.displayName,
            // photourl: this.BuddyChatProvider.buddy.photourl,
            message_id: todo.message_id,
            timestamp: todo.timestamp,
            sentto: todo.sentto,
            location: todo.location,
            latitude: todo.latitude,
            status: todo.status,
            filetype: todo.filetype,
            TagMessage: this.ApiserviceService.encryptText(todo.TagMessage),
            TagfileExtension: todo.TagfileExtension,
            TagTime: todo.TagTime,
            Tagsend: todo.Tagsend,
            Tagto: todo.Tagto,
            Date: todo.Date,
            Tagfiletype: todo.Tagfiletype,
            Taglatitude: todo.Taglatitude,
            Taglocation: todo.Taglocation,
            fileextension: todo.fileextension,
            Taskfrom: todo.Taskfrom,
            Taskto: todo.Taskto,
            chatType: todo.chatType
        }

        this.db.post(array);



    }
    deleteforme(array){
        return new Promise(resolve => {

            array.forEach(element => {
                console.log("message_id :" + element.message_id)
                var obj = {
                    "message_id": element.message_id,
                    "timestamp": element.timestamp,
                    "sentby": element.sentby,
                    "deletevalue": "1"
                }

                
                console.log("deleteMessage :"+element.sentby +":"+localStorage.getItem("FlintauserID"))
                if (element.sentby == localStorage.getItem("FlintauserID")) {
                    this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/deleteMyBuddyChat", obj).then(res => {
                        resolve(true)
                    }).catch(err => {
                        resolve(true)
                    })
                }
                else {
                    this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/deleteFriendChat", obj).then(res => {
                        resolve(true)
                    }).catch(err => {
                        resolve(true)
                    })
                }

                
              

            });
        })
    }

    deleteforEveryone(array){
        return new Promise(resolve => {

            array.forEach(element => {
                console.log("message_id :" + element.message_id)
                var obj = {
                    "message_id": element.message_id,
                    "timestamp": element.timestamp,
                    "sentby": element.sentby
                }
                this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/deleteBuddyChat", obj).then(res => {
                    resolve(true)
                }).catch(err => {
                    resolve(true)
                })
            });
        })
    }
    deleteMessage(array) {
        return new Promise(resolve => {

            array.forEach(element => {
                console.log("message_id :" + element.message_id)
                var obj = {
                    "message_id": element.message_id,
                    "timestamp": element.timestamp,
                    "sentby": element.sentby,
                    "deletevalue": "1"
                }

                if (element.sentby == localStorage.getItem("FlintauserID")) {
                    this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/deleteMyBuddyChat", obj).then(res => {
                        resolve(true)
                    }).catch(err => {
                        resolve(true)
                    })
                }
                else {
                    this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/deleteFriendChat", obj).then(res => {
                        resolve(true)
                    }).catch(err => {
                        resolve(true)
                    })
                }

            });
        })
        // return new Promise(resolve => {

        //     array.forEach(element => {
        //         console.log("message_id :" + element.message_id)
        //         var obj = {
        //             "message_id": element.message_id,
        //             "timestamp": element.timestamp,
        //             "sentby": element.sentby
        //         }
        //         this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/deleteBuddyChat", obj).then(res => {
        //             resolve(true)
        //         }).catch(err => {
        //             resolve(true)
        //         })
        //     });
        // })
    }
    clearMessage(cleartimestamp, uid, buddy) {
        return new Promise(resolve => {
            var obj = {
                "cleartimestamp": cleartimestamp,
                "sentby": uid,
                "message_id": uid + "_" + buddy

            }
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/clearSingleChatMessage", obj).then(res => {
                resolve(true)
            }).catch(err => {
                resolve(true)
            })
            // array.forEach(element => {
            //     console.log("message_id :" + element.message_id)
            //     var obj = {
            //        "sentto":element.sentto,
            //         "sentby": element.sentby
            //     }
            //     this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/ClearChat", obj).then(res => {
            //         resolve(true)
            //     }).catch(err => {
            //         resolve(true)
            //     })
            // });
        })
    }

    updatechatlocationmesage(message_id, timestamp) {
        return new Promise(resolve => {

            console.log("message_id :" + message_id)
            var obj = {
                "message_id": message_id,
                "timestamp": timestamp,
                "livelocation": false
            }
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/updatechatlocation", obj).then(res => {
                resolve({ "message_id": message_id })
            }).catch(err => {
                resolve(true)
            })
        })
    }
    updatechatmesage(message_id) {
        return new Promise(resolve => {

            console.log("message_id :" + message_id)
            var obj = {
                "message_id": message_id,
                "status": "2"
            }
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/updatechatmesage", obj).then(res => {
                resolve({ "message_id": message_id })
            }).catch(res => {
                resolve({ "message_id": message_id })
            })
        })
    }

    updatemystatus(mobile, status, last_changed, deviceid) {
        return new Promise(resolve => {

            var obj = {
                mobile: mobile,
                status: status,
                last_changed: last_changed,
                deviceid: deviceid
            }
            this.socket.emit('online_offline', obj);
            if (this.platform.is('android')) {
                // this.LoggedLoggedUserInfoProvider.updateBuddyStatus(obj)
            }
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/updatemystatus", obj).then(res => {
                resolve(true)
            }).catch(err=>{
                resolve(true)
            })
        })
    }

    getMyinfo(mobile) {
        return new Promise(resolve => {

            // this.socket.emit('online_offline', mobile);
            var obj = {
                mobile: mobile,
            }
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/getUserInfo", obj).then(res => {

                var getdata: any;
                getdata = res;
                resolve(res)

                console.log("getdata :" + JSON.stringify(getdata))
                // getdata.forEach(element => {
                //     console.log("element.photourl " + element.photourl)
                //     this.convertToDataURLviaCanvas(element.photourl, "image/jpeg")
                //         .then(base64Img => {
                //             // console.log("base64Img:" + base64Img);
                //             element.photourl = base64Img;
                //             resolve(getdata)

                //         }).catch(err => {
                //             console.log("base64Im error")
                //         })
                // })

            })
        })
    }

    getMyProfileinfo(mobile) {
        return new Promise(resolve => {

            // this.socket.emit('online_offline', mobile);
            var obj = {
                mobile: mobile,
            }
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/getUserInfo", obj).then(res => {
                resolve(res)
            })
        })
    }

    // // convert to firebase url to canvas
    convertToDataURLviaCanvas(url, outputFormat) {
        return new Promise((resolve, reject) => {
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                let canvas = <HTMLCanvasElement>document.createElement('CANVAS'),
                    ctx = canvas.getContext('2d'),
                    dataURL;
                canvas.height = img.height;
                canvas.width = img.width;
                ctx.drawImage(img, 0, 0);
                dataURL = canvas.toDataURL(outputFormat);
                resolve(dataURL);
                canvas = null;
            };
            img.src = url;
        });
    }
    eventSharedList(todo) {
        this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/add_sharedevent", todo).then(res => {
        })
    }

    async createMessage(todo, value) {
        console.log("createMessage 1:" + JSON.stringify(todo) + ":" + value)
        var mydata = null;

        if (value == "1") {

            console.log("todo :" + JSON.stringify(todo))

        }

        return new Promise(resolve => {


            var getdata = todo;

            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/add_Chatinformation", todo).then(res => {
                var obj = {
                    "message_id": todo.sentby + "_" + todo.sentto,
                    "status": "1"
                }
                console.log("todo.deviceid 1:" + todo.deviceid)
                var unreadmessagecount = 1;
                if (value != "2") {
                    this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/getunreadmessage", obj).then(res => {
                        console.log("getunreadmessage 1:" + JSON.stringify(res))
                        if (res["count"] != null) {
                            unreadmessagecount = unreadmessagecount + parseInt(res["count"])
                        }

                        //push notification
                        if (todo.deviceid != null && todo.deviceid != "0" && todo.deviceid != 0) {
                            this.fcm.initPushNotification(todo.deviceid, this.ApiserviceService.decryptText(todo.message), localStorage.getItem("username"), todo.filetype, todo.sentby, unreadmessagecount, localStorage.getItem("photourl"), todo.sentto)
                        }
                        //Mine

                        if (getdata.buddyimage != null) {
                            getdata.buddyImage = getdata.buddyimage
                        }
                        else {
                            getdata.buddyImage = getdata.buddyImage

                        }
                        var addnewdata = {
                            "sender": getdata.sentby,
                            "uid": getdata.sentby,
                            "buddyid": getdata.sentto, // friend 
                            "sentby": getdata.sentby, // Me
                            "sentto": getdata.sentto, // Friend
                            "message_id": getdata.sentby + "_" + getdata.sentto,//me and friend
                            "buddyImage": getdata.buddyImage,
                            "username": getdata.username,
                            "Filedate": getdata.Date,
                            "messagecount": 0,
                            "fileType": getdata.filetype,
                            "filetype": getdata.filetype,
                            "groupKey": getdata.groupKey,
                            "groupName": getdata.groupName,
                            "groupimage": getdata.groupimage,
                            "message": getdata.message,
                            "openGroup": false,
                            "timestamp": getdata.timestamp,
                            "fileextension": getdata.fileextension,
                            "selfdestruct": todo.self_destruct, // for Selfdestruct
                        }


                        //friend chat
                        var addnewdata1 = {
                            "sender": getdata.sentby,
                            "message_id": getdata.sentto + "_" + getdata.sentby,//friend and me
                            "buddyid": getdata.sentby, // Me 
                            "sentby": getdata.sentto, // Friend
                            "sentto": getdata.sentby, // Me 
                            "uid": getdata.sentto, //
                            "username": localStorage.getItem("username"),
                            "buddyImage": localStorage.getItem("photourl"),
                            "Filedate": getdata.Date,
                            "messagecount": unreadmessagecount,
                            "fileType": getdata.filetype,
                            "filetype": getdata.filetype,
                            "groupKey": getdata.groupKey,
                            "groupName": getdata.groupName,
                            "groupimage": getdata.groupimage,
                            "message": getdata.message,
                            "openGroup": false,
                            "timestamp": getdata.timestamp,
                            "fileextension": getdata.fileextension,
                            "selfdestruct": todo.self_destruct, // for Selfdestruct
                        }

                        console.log("mine :" + JSON.stringify(addnewdata))
                        //  if (value == "1") {
                        console.log("value :" + value)

                        console.log("(this.networkProvider.CurrentStatus :" + this.networkProvider.CurrentStatus)

                        if (this.networkProvider.CurrentStatus == false) {
                            console.log("insertRecords local 1");

                            // this.RecentDBProvider.createRecentDb().then(res => {
                            //     console.log("insertRecords local 2");

                            //     this.RecentDBProvider.insertRecords(addnewdata).then(res => {
                            //         console.log("insertRecords local 3");
                            //     }).catch(err => {
                            //         console.log("insertRecords local 4");

                            //     })
                            // }).catch(err => {
                            //     console.log("insertRecords local 5");

                            // })
                        }

                        console.log("before 1");
                        this.createRecentMessage(addnewdata).then(res => {
                            console.log("before 2 friend 11111:" + JSON.stringify(addnewdata1) + ":" + unreadmessagecount)
                            this.createRecentMessage(addnewdata1).then(res => {
                                resolve(true)
                            }).catch(res => {
                                resolve(true)
                            })
                        }).catch(err => {

                        })





                    }).catch(res => {
                        console.log("getunreadmessage errr:" + JSON.stringify(res))
                        if (res["count"] != null) {
                            unreadmessagecount = unreadmessagecount + parseInt(res["count"])
                        }

                        //push notification
                        if (todo.deviceid != null && todo.deviceid != "0" && todo.deviceid != 0) {
                            this.fcm.initPushNotification(todo.deviceid, this.ApiserviceService.decryptText(todo.message), localStorage.getItem("username"), todo.filetype, todo.sentby, unreadmessagecount, localStorage.getItem("photourl"), todo.sentto)
                        }
                        //Mine

                        if (getdata.buddyimage != null) {
                            getdata.buddyImage = getdata.buddyimage
                        }
                        else {
                            getdata.buddyImage = getdata.buddyImage

                        }
                        var addnewdata = {
                            "sender": getdata.sentby,
                            "uid": getdata.sentby,
                            "buddyid": getdata.sentto, // friend 
                            "sentby": getdata.sentby, // Me
                            "sentto": getdata.sentto, // Friend
                            "message_id": getdata.sentby + "_" + getdata.sentto,//me and friend
                            "buddyImage": getdata.buddyImage,
                            "username": getdata.username,
                            "Filedate": getdata.Date,
                            "messagecount": 0,
                            "fileType": getdata.filetype,
                            "filetype": getdata.filetype,
                            "groupKey": getdata.groupKey,
                            "groupName": getdata.groupName,
                            "groupimage": getdata.groupimage,
                            "message": getdata.message,
                            "openGroup": false,
                            "timestamp": getdata.timestamp,
                            "fileextension": getdata.fileextension,
                            "selfdestruct": todo.self_destruct // for Selfdestruct
                        }


                        //friend chat
                        var addnewdata1 = {
                            "sender": getdata.sentby,
                            "message_id": getdata.sentto + "_" + getdata.sentby,//friend and me
                            "buddyid": getdata.sentby, // Me 
                            "sentby": getdata.sentto, // Friend
                            "sentto": getdata.sentby, // Me 
                            "uid": getdata.sentto, //
                            "username": localStorage.getItem("username"),
                            "buddyImage": localStorage.getItem("photourl"),
                            "Filedate": getdata.Date,
                            "messagecount": unreadmessagecount,
                            "fileType": getdata.filetype,
                            "filetype": getdata.filetype,
                            "groupKey": getdata.groupKey,
                            "groupName": getdata.groupName,
                            "groupimage": getdata.groupimage,
                            "message": getdata.message,
                            "openGroup": false,
                            "timestamp": getdata.timestamp,
                            "fileextension": getdata.fileextension,
                            "selfdestruct": todo.self_destruct // for Selfdestruct
                        }

                        console.log("mine :" + JSON.stringify(addnewdata))
                        //  if (value == "1") {
                        console.log("value :" + value)

                        console.log("(this.networkProvider.CurrentStatus :" + this.networkProvider.CurrentStatus)

                        if (this.networkProvider.CurrentStatus == false) {
                            console.log("insertRecords local 1");

                            // this.RecentDBProvider.createRecentDb().then(res => {
                            //     console.log("insertRecords local 2");

                            //     this.RecentDBProvider.insertRecords(addnewdata).then(res => {
                            //         console.log("insertRecords local 3");
                            //     }).catch(err => {
                            //         console.log("insertRecords local 4");

                            //     })
                            // }).catch(err => {
                            //     console.log("insertRecords local 5");

                            // })
                        }

                        console.log("before 1");
                        this.createRecentMessage(addnewdata).then(res => {
                            console.log("before 2 friend 11111:" + JSON.stringify(addnewdata1) + ":" + unreadmessagecount)
                            this.createRecentMessage(addnewdata1).then(res => {
                                resolve(true)
                            }).catch(res => {
                                resolve(true)
                            })
                        }).catch(err => {

                        })

                    })


                }
            }).catch(err => {
                var obj = {
                    "message_id": todo.sentby + "_" + todo.sentto,
                    "status": "1"
                }
                console.log("todo.deviceid 1:" + todo.deviceid)
                var unreadmessagecount = 0;
                if (value != "2") {
                    this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/getunreadmessage", obj).then(res => {
                        console.log("getunreadmessage 1:" + JSON.stringify(res))
                        if (res["count"] != null) {
                            unreadmessagecount = res["count"]
                        }

                        //push notification
                        if (todo.deviceid != null && todo.deviceid != "0" && todo.deviceid != 0) {
                            this.fcm.initPushNotification(todo.deviceid, this.ApiserviceService.decryptText(todo.message), localStorage.getItem("username"), todo.filetype, todo.sentby, unreadmessagecount, localStorage.getItem("photourl"), todo.sentto)
                        }
                        //Mine

                        if (getdata.buddyimage != null) {
                            getdata.buddyImage = getdata.buddyimage
                        }
                        else {
                            getdata.buddyImage = getdata.buddyImage

                        }
                        var addnewdata = {
                            "sender": getdata.sentby,
                            "uid": getdata.sentby,
                            "buddyid": getdata.sentto, // friend 
                            "sentby": getdata.sentby, // Me
                            "sentto": getdata.sentto, // Friend
                            "message_id": getdata.sentby + "_" + getdata.sentto,//me and friend
                            "buddyImage": getdata.buddyImage,
                            "username": getdata.username,
                            "Filedate": getdata.Date,
                            "messagecount": 0,
                            "fileType": getdata.filetype,
                            "filetype": getdata.filetype,
                            "groupKey": getdata.groupKey,
                            "groupName": getdata.groupName,
                            "groupimage": getdata.groupimage,
                            "message": getdata.message,
                            "openGroup": false,
                            "timestamp": getdata.timestamp,
                            "fileextension": getdata.fileextension,
                            "selfdestruct": todo.self_destruct // for Selfdestruct
                        }


                        //friend chat
                        var addnewdata1 = {
                            "sender": getdata.sentby,
                            "message_id": getdata.sentto + "_" + getdata.sentby,//friend and me
                            "buddyid": getdata.sentby, // Me 
                            "sentby": getdata.sentto, // Friend
                            "sentto": getdata.sentby, // Me 
                            "uid": getdata.sentto, //
                            "username": localStorage.getItem("username"),
                            "buddyImage": localStorage.getItem("photourl"),
                            "Filedate": getdata.Date,
                            "messagecount": unreadmessagecount,
                            "fileType": getdata.filetype,
                            "filetype": getdata.filetype,
                            "groupKey": getdata.groupKey,
                            "groupName": getdata.groupName,
                            "groupimage": getdata.groupimage,
                            "message": getdata.message,
                            "openGroup": false,
                            "timestamp": getdata.timestamp,
                            "fileextension": getdata.fileextension,
                            "selfdestruct": todo.self_destruct // for Selfdestruct
                        }

                        console.log("mine :" + JSON.stringify(addnewdata))
                        //  if (value == "1") {
                        console.log("value :" + value)

                        console.log("(this.networkProvider.CurrentStatus :" + this.networkProvider.CurrentStatus)

                        if (this.networkProvider.CurrentStatus == false) {
                            console.log("insertRecords local 1");

                            // this.RecentDBProvider.createRecentDb().then(res => {
                            //     console.log("insertRecords local 2");

                            //     this.RecentDBProvider.insertRecords(addnewdata).then(res => {
                            //         console.log("insertRecords local 3");
                            //     }).catch(err => {
                            //         console.log("insertRecords local 4");

                            //     })
                            // }).catch(err => {
                            //     console.log("insertRecords local 5");

                            // })
                        }

                        console.log("before 1");
                        this.createRecentMessage(addnewdata).then(res => {
                            console.log("before 2 friend 11111:" + JSON.stringify(addnewdata1) + ":" + unreadmessagecount)
                            this.createRecentMessage(addnewdata1).then(res => {
                                resolve(true)
                            }).catch(res => {
                                resolve(true)
                            })
                        }).catch(err => {

                        })





                    }).catch(res => {
                        console.log("getunreadmessage errr:" + JSON.stringify(res))
                        if (res["count"] != null) {
                            unreadmessagecount = res["count"]
                        }

                        //push notification
                        if (todo.deviceid != null && todo.deviceid != "0" && todo.deviceid != 0) {
                            this.fcm.initPushNotification(todo.deviceid, this.ApiserviceService.decryptText(todo.message), localStorage.getItem("username"), todo.filetype, todo.sentby, unreadmessagecount, localStorage.getItem("photourl"), todo.sentto)
                        }
                        //Mine

                        if (getdata.buddyimage != null) {
                            getdata.buddyImage = getdata.buddyimage
                        }
                        else {
                            getdata.buddyImage = getdata.buddyImage

                        }
                        var addnewdata = {
                            "sender": getdata.sentby,
                            "uid": getdata.sentby,
                            "buddyid": getdata.sentto, // friend 
                            "sentby": getdata.sentby, // Me
                            "sentto": getdata.sentto, // Friend
                            "message_id": getdata.sentby + "_" + getdata.sentto,//me and friend
                            "buddyImage": getdata.buddyImage,
                            "username": getdata.username,
                            "Filedate": getdata.Date,
                            "messagecount": 0,
                            "fileType": getdata.filetype,
                            "filetype": getdata.filetype,
                            "groupKey": getdata.groupKey,
                            "groupName": getdata.groupName,
                            "groupimage": getdata.groupimage,
                            "message": getdata.message,
                            "openGroup": false,
                            "timestamp": getdata.timestamp,
                            "fileextension": getdata.fileextension,
                            "selfdestruct": todo.self_destruct // for Selfdestruct
                        }


                        //friend chat
                        var addnewdata1 = {
                            "sender": getdata.sentby,
                            "message_id": getdata.sentto + "_" + getdata.sentby,//friend and me
                            "buddyid": getdata.sentby, // Me 
                            "sentby": getdata.sentto, // Friend
                            "sentto": getdata.sentby, // Me 
                            "uid": getdata.sentto, //
                            "username": localStorage.getItem("username"),
                            "buddyImage": localStorage.getItem("photourl"),
                            "Filedate": getdata.Date,
                            "messagecount": unreadmessagecount,
                            "fileType": getdata.filetype,
                            "filetype": getdata.filetype,
                            "groupKey": getdata.groupKey,
                            "groupName": getdata.groupName,
                            "groupimage": getdata.groupimage,
                            "message": getdata.message,
                            "openGroup": false,
                            "timestamp": getdata.timestamp,
                            "fileextension": getdata.fileextension,
                            "selfdestruct": todo.self_destruct // for Selfdestruct
                        }

                        console.log("mine :" + JSON.stringify(addnewdata))
                        //  if (value == "1") {
                        console.log("value :" + value)

                        console.log("(this.networkProvider.CurrentStatus :" + this.networkProvider.CurrentStatus)

                        if (this.networkProvider.CurrentStatus == false) {
                            console.log("insertRecords local 1");

                            // this.RecentDBProvider.createRecentDb().then(res => {
                            //     console.log("insertRecords local 2");

                            //     this.RecentDBProvider.insertRecords(addnewdata).then(res => {
                            //         console.log("insertRecords local 3");
                            //     }).catch(err => {
                            //         console.log("insertRecords local 4");

                            //     })
                            // }).catch(err => {
                            //     console.log("insertRecords local 5");

                            // })
                        }

                        console.log("before 1");
                        this.createRecentMessage(addnewdata).then(res => {
                            console.log("before 2 friend 11111:" + JSON.stringify(addnewdata1) + ":" + unreadmessagecount)
                            this.createRecentMessage(addnewdata1).then(res => {
                                resolve(true)
                            }).catch(res => {
                                resolve(true)
                            })
                        }).catch(err => {

                        })

                    })


                }
            })

            if (todo.status != "2") {
                //  this.UserInfoProvider.insertRecords(todo);
            }



        });
    }


    createRecentMessage(todo) {

        return new Promise(resolve => {

            this.socket.emit('recentmessgae', todo);
            console.log("receiveRecentChat sent :" + JSON.stringify(todo) +":"+this.ApiserviceService.decryptText(todo.message))

            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/add_recentmsg", todo).then(res => {
                console.log("add_recentmsg inserted server")
                resolve(true)

            }).catch(err => {
                resolve(true)
            })
        })

    }

    createMyRecentMessage(todo) {

        return new Promise(resolve => {

            console.log("receiveRecentChat sent :" + JSON.stringify(todo))

            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/add_recentmsg", todo).then(res => {
                console.log("add_recentmsg inserted server")
                resolve(true)

            }).catch(err => {
                resolve(true)
            })
        })

    }


    createforwardMessage(todo) {
        this.db.post(todo);
        //  this.BuddyRecentDB.checkExitsList(todo, this.myInfo, this.unseenCount);
    }
    updateStatusMessage(todo) {
        // this.db.put(todo).catch((err) => {
        //     console.log(err);
        // });

        //    this.retryUntilWritten(todo);

    }
    updateMessage(todo) {

        this.retryUntilWritten(todo);
        // this.db.put(todo).catch((err) => {
        //     console.log(err);
        // });
    }

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

    deleteMessageItem(todo) {
        console.log("todo : " + JSON.stringify(todo));
        this.db.remove(todo).then(() => {
            console.log("deleted");

        }).catch((error) => {

            console.log(error);

        });
    }
    // deleteMessage(todo) {
    //     console.log("todo : " + JSON.stringify(todo));
    //     for (var i = 0; i < todo.length; i++) {
    //         this.db.remove(todo[i]).then(() => {

    //             alert("success");
    //         }).catch((error) => {

    //             console.log(error);

    //         });
    //     }
    // }
    deletePartcularMessage(todo) {

        console.log("deleteMessage : " + JSON.stringify(todo));
        return new Promise(resolve => {

            for (var i = 0; i < todo.length; i++) {
                this.db.remove(todo[i]).then(() => {
                    resolve(true)

                }).catch((error) => {

                    console.log(error);

                });
            }
        });

    }
    livechangesoff() {
        this.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
        })
    }
    handleChange(change, uid, buddyid) {
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
                if (change.doc.message_id == localStorage.getItem("FlintauserID") + "_" + buddyid || change.doc.message_id == buddyid + "_" + uid) {
                    this.data.push(change.doc);
                }
            }

        }

    }
    getallmessage(timestamp, you, friend) {

        return new Promise(resolve => {

            this.db.find({
                selector: {
                    "$or": [
                        {
                            "message_id": {
                                "$eq": you + "_" + friend
                            }
                        },

                    ]
                },
            }).then((result) => {
                console.log("getbuddychat 23:" + JSON.stringify(result["docs"]));

                result["docs"].forEach(element => {

                    if (element.timestamp == timestamp) {
                        //dele
                        this.db.remove(element).then((err) => {

                        });
                    }
                })

            }).catch((error) => {

                console.log(error);

            });

        });
    }
    destroyDb() {
        return new Promise(resolve => {
            this.db.destroy().then(() => {
                console.log("database removed");
                resolve(true)
            });
        })
    }



}
