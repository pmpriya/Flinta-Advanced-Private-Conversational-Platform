import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import PouchDB from 'pouchdb';
// import * as PouchDB from 'pouchdb';
import { ApiserviceService } from "../../app/apiservice.service";

import { Socket } from 'ngx-socket-io';
// import { RecentDBProvider } from "../../providers/database/RecentDB";

import { Platform } from '@ionic/angular';
import { BuddyRecentDBProvider } from "./buddyRecentDB";
// import { DatabaseProvider } from "../database/database";
import { GruopProvider } from "../ServerDb/group";
import { LoginProvider } from "../ServerDb/loginprovider";
import { NetworkService } from "../../app/network.service";
import { FirebaseMessagingProvider } from "../firebase-messaging/firebase-messaging";

/*
  Generated class for the TodosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

//Poopandi (27/05/2019)
@Injectable()
export class GruopChatProvider {

    data: any;
    db: any;
    remote: any;
    buddy: any;

    myInfo: any;
    unseenCount: any;

    groupName: any;
    groupImage: any;
    openGroup: any;

    constructor(private fcm: FirebaseMessagingProvider, private paltform: Platform, private networkService: NetworkService, private socket: Socket, private ApiserviceService: ApiserviceService, private HttpClient: HttpClient, private LoginProvider: LoginProvider, private GruopProvider: GruopProvider, private BuddyRecentDB: BuddyRecentDBProvider) {
        console.log('Hello BuddyChatProvider ');


        this.socket.connect();

        // this.databaseservice.getLoggedUserInfo().then((val) => {
        //     this.myInfo = val;
        // })
    }

    cleargroupMessage(groupkey, sendby, cleartimestamp) {
        return new Promise(resolve => {

            // array.forEach(element => {
            // console.log("message_id :" + element.message_id)
            var obj = {
                "groupkey": groupkey,
                "cleartimestamp": cleartimestamp,
                "uid": sendby
            }
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/clearChatMessage", obj).then(res => {
                resolve(true)
            }).catch(err => {
                resolve(true)
            })
            // });
        })
    }
    deleteAllMessage(array) {
        return new Promise(resolve => {

            array.forEach(element => {
                console.log("message_id :" + element.message_id)
                var obj = {
                    "groupkey": element.groupkey,
                    "timestamp": element.timestamp,
                    "sentby": element.sentby
                }
                this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/deleteGroupChat", obj).then(res => {
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
                // var obj = {
                //     "groupkey": element.groupkey,
                //     "timestamp": element.timestamp,
                //     "sentby": element.sentby
                // }
                // this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/deleteGroupChat", obj).then(res => {
                //     resolve(true)
                // }).catch(err => {
                //     resolve(true)
                // })

                var obj = {
                    "groupkey": element.groupkey,
                    "timestamp": element.timestamp,
                    "deleteby": localStorage.getItem("FlintauserID"),
                    "deleteflag": "1"
                }
                this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/deleteGroupMessage", obj).then(res => {
                    resolve(true)
                }).catch(err => {
                    resolve(true)
                })

            });
        })
    }

    // get group message
    getGroupMessage(groupkey, groupName, scrollValue) {

        return new Promise(resolve => {


            var obj = {
                limit: scrollValue,
                groupkey: groupkey,
            }
            //getGroupChatinformation

            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/getGroupChatinformationnew", obj).then(res => {
                resolve(res);

            }).catch(err => {
                resolve(true)
            })

        });
    }
    livechangesoff() {
        this.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
            console.log("live changes off")
        })
    }
    initializebuddy(buddy) {
        this.buddy = buddy;

    }

    removemember(userinfo, newGroup, memberdata) {
        var array = {
            sendername: localStorage.getItem("username"),
            photourl: localStorage.getItem("photourl"),
            groupname: newGroup.groupname,
            groupkey: newGroup.groupkey,
            message: this.ApiserviceService.encryptText(" Removed " + memberdata.username),
            sentby: localStorage.getItem("FlintauserID").toString(),
            username: memberdata.username,
            timestamp: new Date().getTime(),
            replydisplayname: '',
            filetype: "title",
            status: 1,
            Filedate: new Date(),
        }

        this.createMessage(array, "", memberdata)
    }
    leftFromgroup(newGroup, username,memberdata) {
        console.log('memberdata'+JSON.stringify(memberdata));
        var array = {
            sendername: localStorage.getItem("username"),
            photourl: localStorage.getItem("photourl"),
            groupname: newGroup.groupname,
            groupkey: newGroup.groupkey,
            message: this.ApiserviceService.encryptText(username+" left "),
            sentby: localStorage.getItem("userID").toString(),
            username: username.username,
            timestamp: newGroup.timestamp,
            replydisplayname: '',
            filetype: "title",
            status: 1,
            Filedate: new Date(),
           "Taskfrom":memberdata.Taskfrom,
            "Taskto":memberdata.Taskto,
            "channel":memberdata.channel,
            "opengroup":memberdata.opengroup,
            "forwardmsg":memberdata.forwardmsg,
            "selectedColor":memberdata.selectedColor,
            "showMore":memberdata.showMore,
            "edited":memberdata.edited,
             groupimage:memberdata.groupimage,
              Date:memberdata.Date
        }
console.log("array :"+JSON.stringify(array));
        this.createMessage(array, "", memberdata)
    }
    addmember(userinfo, newGroup, memberslist, exitsgroup) {
        return new Promise(resolve => {
            memberslist.forEach(element => {

                console.log("exitsgroup :" + exitsgroup)
                if (exitsgroup == null) {
                    var todo123 = {
                        uid: element.mobile,
                        groupname: newGroup.groupName,
                        groupkey: newGroup.groupKey,
                        groupimage: newGroup.groupPic,
                        // owner: localStorage.getItem("userID").toString(),
                        opengroup: newGroup.openGroup,
                        timestamp: new Date().getTime(),
                        groupstatus: "Active",
                        status: 1,
                        groupcreated: userinfo[0].username + " " + "created group",
                    }
                    console.log("add group :" + JSON.stringify(todo123))

                    var array = {
                        sendername: localStorage.getItem("username"),
                        photourl: localStorage.getItem("photourl"),
                        groupname: newGroup.groupName,
                        groupkey: newGroup.groupKey,
                        message: this.ApiserviceService.encryptText(" Added " + element.username),
                        sentby: localStorage.getItem("userID").toString(),
                        username: element.username,
                        timestamp: new Date().getTime(),
                        replydisplayname: '',
                        filetype: "title",
                        status: 1,
                        Filedate: new Date(),
                        livelocation: false,
                        groupimage: newGroup.groupPic,
                    }



                    var todo1 = {
                        mobile: localStorage.getItem("userID").toString(),
                        username: localStorage.getItem("username")
                    }

                    memberslist.push(todo1)

                    this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/createGroup", todo123).then(res => {

                        this.createMessage(array, "", memberslist).then(res => {

                        }).catch(er => {

                        });
                        resolve(true)
                    }).catch(er => {
                        this.createMessage(array, "", memberslist).then(res => {

                        }).catch(er => {

                        });
                        resolve(true)
                    })
                }
                else {
                    var array = {
                        sendername: localStorage.getItem("username"),
                        photourl: localStorage.getItem("photourl"),
                        groupname: newGroup.groupName,
                        groupkey: newGroup.groupKey,
                        message: this.ApiserviceService.encryptText(" Added " + element.username),
                        sentby: localStorage.getItem("userID").toString(),
                        username: element.username,
                        timestamp: new Date().getTime(),
                        replydisplayname: '',
                        filetype: "title",
                        status: 1,
                        Filedate: new Date(),
                        livelocation: false,
                        groupimage: newGroup.groupPic,
                    }


                    var todo123 = {
                        uid: element.mobile,
                        groupname: newGroup.groupName,
                        groupkey: newGroup.groupKey,
                        groupimage: newGroup.groupPic,
                        // owner: localStorage.getItem("userID").toString(),
                        opengroup: newGroup.openGroup,
                        timestamp: new Date().getTime(),
                        groupstatus: "Active",
                        status: 1,
                        groupcreated: userinfo[0].username + " " + "created group",
                    }
                    console.log("add group :" + JSON.stringify(todo123))

                    var todo1 = {
                        mobile: localStorage.getItem("userID").toString(),
                        username: localStorage.getItem("username")
                    }

                    memberslist.push(todo1)

                    // this.createMessage(array, "", memberslist).then(res => {

                    // }).catch(er => {
                    // });

                    this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/createGroup", todo123).then(res => {

                        this.createMessage(array, "", memberslist).then(res => {

                        }).catch(er => {

                        });
                        resolve(true)
                    }).catch(er => {
                        this.createMessage(array, "", memberslist).then(res => {

                        }).catch(er => {

                        });
                        resolve(true)
                    })


                    
                    // resolve(true)
                }







            });
        })

    }

    deletedmember(groupName, groupKey, element) {
        console.log("deletedmember ")
        return new Promise(resolve => {


            var array = {
                sendername: localStorage.getItem("username"),
                photourl: localStorage.getItem("photourl"),
                groupname: groupName,
                groupkey: groupKey,
                message: this.ApiserviceService.encryptText(" Removed " + localStorage.getItem("username")),
                sentby: localStorage.getItem("FlintauserID").toString(),
                username: localStorage.getItem("username"),
                timestamp: new Date().getTime(),
                replydisplayname: '',
                filetype: "title",
                status: 1,
                Filedate: new Date(),
                livelocation: false
            }


            this.createMessage(array, "", element).then(res => {
                resolve(true)
            });



        })

    }

    updatechatmesage(groupkey, sentby) {
        return new Promise(resolve => {

            var obj = {
                "groupkey": groupkey,
                "sentby": sentby,
                "status": "2"
            }
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/updateGroupchatmesage", obj).then(res => {
                resolve(true)
            })
        })
    }
    updatechatlocationmesage(groupkey, timestamp, sentby) {
        return new Promise(resolve => {

            var obj = {
                "sentby": sentby,
                "groupkey": groupkey,
                "timestamp": timestamp,
                "livelocation": false
            }
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/updateGroupchatlocation", obj).then(res => {
                resolve(true)
            }).catch(err => {
                resolve(true)
            })
        })
    }
    createRecentMessage(todo) {

        return new Promise(resolve => {

            console.log("receiveRecentChat sent :" + JSON.stringify(todo))
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/add_recentgroupmsg", todo).then(res => {
                this.socket.emit('recentmessgae', todo);

                resolve(true)
            })
        })

    }

    createMyRecentMessage(todo) {

        return new Promise(resolve => {

            console.log("receiveRecentChat sent :" + JSON.stringify(todo))
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/add_recentgroupmsg", todo).then(res => {

                resolve(true)
            })
        })

    }
    createFirstMessage1(todo) {

        console.log("createFirstMessage1 " + JSON.stringify(todo))

        return new Promise(resolve => {

            var checkchat = 0;
            var unreadmessagecount = 0;

            unreadmessagecount = 0

            var experts = null;
            if (todo.experts == todo.uid) {
                experts = todo.experts;
            }
            this.pushNotification(this.ApiserviceService.decryptText(todo.message), todo.filetype, unreadmessagecount, todo.groupname, todo.groupimage, todo.uid)

            var addnewdata = {
                "sender": todo.sentby,
                "uid": todo.uid,
                "buddyid": todo.sentto, // friend 
                "sentby": todo.sentby, // Me
                "buddyImage": todo.groupimage,
                "username": todo.groupname,
                "Filedate": todo.timestamp,
                "messagecount": unreadmessagecount,
                "fileType": todo.filetype,
                "filetype": todo.filetype,
                "groupkey": todo.groupkey,
                "groupname": todo.groupname,
                "message": todo.message,
                "opengroup": todo.opengroup,
                "timestamp": todo.timestamp,
                "groupsendername": todo.sendername,
                "fileextension": todo.fileextension,
                "experts": experts
            }
            console.log("createMessage addnewdata " + JSON.stringify(addnewdata))

            this.createRecentMessage(addnewdata).then(res => {
                checkchat++;
                    resolve(true)
            })

        })
    }

    createFirstMessage(todo, groupcreated, members, value) {

        console.log("createMessage " + JSON.stringify(todo), members)

        return new Promise(resolve => {

            var checkchat = 0;
            var unreadmessagecount = 0;
            console.log("members : " + members.length)

            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/add_groupchat", todo).then(res => {
                console.log("add_groupchat")

            }).catch(err => {

            })

            var finalcount = members.length;



            console.log("createFirstMessage :" + value + ":" + members.length)
            if (value == members.length) {


                for (var i = 0; i < members.length; i++) {
                    const temp = members[i]


                    console.log("createMessage members :" + JSON.stringify(temp))


                    if (temp.uid == null) {
                        temp.uid = temp.mobile
                    }


                    var send = {
                        groupkey: todo.groupkey,
                        uid: temp.uid
                    }

                    this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/getunreadgroupmessage", send).then(res => {
                        console.log(" createMessage getunreadgroupmessage :" + JSON.stringify(res))
                        if (res[0]["messagecount"] != null) {
                            unreadmessagecount = unreadmessagecount + parseInt(res[0]["messagecount"])
                            console.log(" createMessage unreadmessagecount :" + unreadmessagecount + ":" + temp.uid)
                        }
                        unreadmessagecount++;
                        if (temp.uid == localStorage.getItem("FlintauserID")) {
                            unreadmessagecount = 0
                        }

                        var experts = null;
                        if (todo.experts == temp.uid) {
                            experts = todo.experts;
                        }
                        if (temp.uid != localStorage.getItem("FlintauserID")) {

                            this.pushNotification( this.ApiserviceService.decryptText(todo.message), todo.filetype, unreadmessagecount, todo.groupname, todo.groupimage, temp.uid)
                        }
                        var addnewdata = {
                            "sender": todo.sentby,
                            "uid": temp.uid,
                            "buddyid": todo.sentto, // friend 
                            "sentby": todo.sentby, // Me
                            "buddyImage": todo.groupimage,
                            "username": todo.sendername,
                            "Filedate": todo.timestamp,
                            "messagecount": unreadmessagecount,
                            "fileType": todo.filetype,
                            "filetype": todo.filetype,
                            "groupkey": todo.groupkey,
                            "groupname": todo.groupname,
                            "message": todo.message,
                            "opengroup": todo.opengroup,
                            "timestamp": todo.timestamp,
                            "groupsendername": todo.sendername,
                            "fileextension": todo.fileextension,
                            "experts": experts
                        }
                        console.log("createMessage addnewdata " + JSON.stringify(addnewdata))

                        this.createRecentMessage(addnewdata).then(res => {
                            checkchat++;

                            console.log("final " + checkchat + ":" + finalcount)

                            if (checkchat == finalcount) {
                                resolve(true)
                                // this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/add_groupchat", todo).then(res => {
                                //     console.log("add_groupchat")

                                //     // this.recentMsg(members, todo.message, todo.filetype, todo.groupname, todo.groupimage,unreadmessagecount)
                                //     resolve(true)
                                // }).catch(err => {
                                //     // this.recentMsg(members, todo.message, todo.filetype, todo.groupname, todo.groupimage,unreadmessagecount)
                                //     resolve(true)
                                // })
                            }
                        })



                    }).catch(res => {

                        if (temp.uid == localStorage.getItem("FlintauserID")) {
                            unreadmessagecount = 0
                        }
                        unreadmessagecount++;

                        var experts = null;
                        if (todo.experts == temp.uid) {
                            experts = todo.experts;
                        }
                        if (temp.uid != localStorage.getItem("FlintauserID")) {

                            this.pushNotification(this.ApiserviceService.decryptText(todo.message), todo.filetype, unreadmessagecount, todo.groupname, todo.groupimage, temp.uid)
                        }
                        var addnewdata = {
                            "sender": todo.sentby,
                            "uid": temp.uid,
                            "buddyid": todo.sentto, // friend 
                            "sentby": todo.sentby, // Me
                            "buddyImage": todo.groupimage,
                            "username": todo.sendername,
                            "Filedate": todo.timestamp,
                            "messagecount": unreadmessagecount,
                            "fileType": todo.filetype,
                            "filetype": todo.filetype,
                            "groupkey": todo.groupkey,
                            "groupname": todo.groupname,
                            "message": todo.message,
                            "opengroup": todo.opengroup,
                            "timestamp": todo.timestamp,
                            "groupsendername": todo.sendername,
                            "fileextension": todo.fileextension,
                            "experts": experts
                        }
                        console.log(" createMessage addnewdata " + addnewdata.uid)

                        this.createRecentMessage(addnewdata).then(res => {
                            checkchat++;

                            console.log("final " + checkchat + ":" + finalcount)

                            if (checkchat == finalcount) {
                                resolve(true)

                                // this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/add_groupchat", todo).then(res => {
                                //     console.log("add_groupchat")
                                //     // this.recentMsg(members, todo.message, todo.filetype, todo.groupname, todo.groupimage,unreadmessagecount)
                                //     resolve(true)
                                // }).catch(err => {
                                //     // this.recentMsg(members, todo.message, todo.filetype, todo.groupname, todo.groupimage,unreadmessagecount)
                                //     resolve(true)
                                // })
                            }
                        })


                    })


                }
            }
            else {
                this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/add_groupchat", todo).then(res => {
                    console.log("add_groupchat")
                    // this.recentMsg(members, todo.message, todo.filetype, todo.groupname, todo.groupimage,unreadmessagecount)
                    resolve(true)
                }).catch(err => {
                    // this.recentMsg(members, todo.message, todo.filetype, todo.groupname, todo.groupimage,unreadmessagecount)
                    resolve(true)
                })
            }
        })
    }
    async createMessage(todo, groupcreated, members) {

        console.log("group createMessage  1" + JSON.stringify(todo), members)

        return new Promise(resolve => {

            var checkchat = 0;
            console.log("group createMessage  2 : " + members.length)


            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/add_groupchat", todo).then(res => {
                console.log("add_groupchat")
                // resolve(true)
            }).catch(err => {
                // resolve(true)
            })

            var finalcount = members.length;

      
            var send1 = {
                groupkey: todo.groupkey
            }
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/getunreadgroupmessagenew", send1).then(res => {
                var getmemberchat: any;
                getmemberchat = res;
                for (var i = 0; i < members.length; i++) {
                    const temp = members[i]

                    var unreadmessagecount = 0;

                    console.log("group createMessage  3 :" + JSON.stringify(temp))


                    if (temp.uid == null) {
                        temp.uid = temp.mobile
                    }


                    var send = {
                        groupkey: todo.groupkey,
                        uid: temp.uid
                    }


                    if (temp.uid != localStorage.getItem("userID")) {

                        getmemberchat.forEach(element => {
                            if (element.uid == temp.uid) {
                                unreadmessagecount = 0;

                                if (element.messagecount != null) {
                                    unreadmessagecount = (unreadmessagecount + parseInt(element.messagecount))
                                    console.log(" createMessage unreadmessagecount :" + unreadmessagecount + ":" + temp.uid)
                                }

                                unreadmessagecount++;
                                if (temp.uid == localStorage.getItem("userID")) {
                                    unreadmessagecount = 0
                                }
                                console.log("send unreadmessagecount 1:" + unreadmessagecount + ":" + temp.uid)

                                var experts = null;
                                if (todo.experts == temp.uid) {
                                    experts = todo.experts;
                                }
                                if (temp.uid != localStorage.getItem("userID")) {
                                    this.pushNotification(this.ApiserviceService.decryptText(todo.message), todo.filetype, unreadmessagecount, todo.groupname, todo.groupimage, temp.uid)
                                }
                                var addnewdata = {
                                    "sender": todo.sentby,
                                    "uid": temp.uid,
                                    "buddyid": todo.sentto, // friend 
                                    "sentby": todo.sentby, // Me
                                    "buddyImage": todo.groupimage,
                                    "username": todo.sendername,
                                    "Filedate": todo.timestamp,
                                    "messagecount": unreadmessagecount,
                                    "fileType": todo.filetype,
                                    "filetype": todo.filetype,
                                    "groupkey": todo.groupkey,
                                    "groupname": todo.groupname,
                                    "message": todo.message,
                                    "opengroup": todo.opengroup,
                                    "timestamp": todo.timestamp,
                                    "groupsendername": todo.sendername,
                                    "fileextension": todo.fileextension,
                                    "experts": experts
                                }
                                console.log("createMessage addnewdata " + JSON.stringify(addnewdata))

                                this.createRecentMessage(addnewdata).then(res => {
                                    checkchat++;

                                    console.log("final " + checkchat + ":" + finalcount)

                                    if (checkchat == finalcount) {
                                        resolve(true)
                                        // this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/add_groupchat", todo).then(res => {
                                        //     console.log("add_groupchat")

                                        //     // this.recentMsg(members, todo.message, todo.filetype, todo.groupname, todo.groupimage,unreadmessagecount)
                                        //     resolve(true)
                                        // }).catch(err => {
                                        //     // this.recentMsg(members, todo.message, todo.filetype, todo.groupname, todo.groupimage,unreadmessagecount)
                                        //     resolve(true)
                                        // })
                                    }
                                })

                            }
                        });

                    }
                    else {

                        unreadmessagecount++;
                        if (temp.uid == localStorage.getItem("userID")) {
                            unreadmessagecount = 0
                        }
                        console.log("send unreadmessagecount 2:" + unreadmessagecount + ":" + temp.uid)
                        var experts = null;
                        if (todo.experts == temp.uid) {
                            experts = todo.experts;
                        }
                        if (todo.experts != temp.uid) {
                            this.pushNotification(this.ApiserviceService.decryptText(todo.message), todo.filetype, unreadmessagecount, todo.groupname, todo.groupimage, temp.uid)
                        }
                        var addnewdata = {
                            "sender": todo.sentby,
                            "uid": temp.uid,
                            "buddyid": todo.sentto, // friend 
                            "sentby": todo.sentby, // Me
                            "buddyImage": todo.groupimage,
                            "username": todo.sendername,
                            "Filedate": todo.timestamp,
                            "messagecount": unreadmessagecount,
                            "fileType": todo.filetype,
                            "filetype": todo.filetype,
                            "groupkey": todo.groupkey,
                            "groupname": todo.groupname,
                            "message": todo.message,
                            "opengroup": todo.opengroup,
                            "timestamp": todo.timestamp,
                            "groupsendername": todo.sendername,
                            "fileextension": todo.fileextension,
                            "experts": experts
                        }
                        console.log(" createMessage addnewdata " + addnewdata.uid)

                        this.createRecentMessage(addnewdata).then(res => {
                            checkchat++;

                            console.log("final " + checkchat + ":" + finalcount)

                            if (checkchat == finalcount) {
                                resolve(true)

                                // this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/add_groupchat", todo).then(res => {
                                //     console.log("add_groupchat")
                                //     // this.recentMsg(members, todo.message, todo.filetype, todo.groupname, todo.groupimage,unreadmessagecount)
                                //     resolve(true)
                                // }).catch(err => {
                                //     // this.recentMsg(members, todo.message, todo.filetype, todo.groupname, todo.groupimage,unreadmessagecount)
                                //     resolve(true)
                                // })
                            }
                        })
                    }


                }

            }).catch(res => {
                console.log("unreadcount flow")
                for (var i = 0; i < members.length; i++) {
                    const temp = members[i]

                    var unreadmessagecount = 0;

                    console.log("group createMessage  3 :" + JSON.stringify(temp))


                    if (temp.uid == null) {
                        temp.uid = temp.mobile
                    }


                    if (temp.uid == localStorage.getItem("userID")) {
                        unreadmessagecount = 0
                    }
                    unreadmessagecount++;

                    var experts = null;
                    if (todo.experts == temp.uid) {
                        experts = todo.experts;
                    }
                    if (temp.uid != localStorage.getItem("userID")) {

                        this.pushNotification(this.ApiserviceService.decryptText(todo.message), todo.filetype, unreadmessagecount, todo.groupname, todo.groupimage, temp.uid)
                    }
                    var addnewdata = {
                        "sender": todo.sentby,
                        "uid": temp.uid,
                        "buddyid": todo.sentto, // friend 
                        "sentby": todo.sentby, // Me
                        "buddyImage": todo.groupimage,
                        "username": todo.sendername,
                        "Filedate": todo.timestamp,
                        "messagecount": unreadmessagecount,
                        "fileType": todo.filetype,
                        "filetype": todo.filetype,
                        "groupkey": todo.groupkey,
                        "groupname": todo.groupname,
                        "message": todo.message,
                        "opengroup": todo.opengroup,
                        "timestamp": todo.timestamp,
                        "groupsendername": todo.sendername,
                        "fileextension": todo.fileextension,
                        "experts": experts
                    }
                    console.log(" createMessage addnewdata " + addnewdata.uid)

                    this.createRecentMessage(addnewdata).then(res => {
                        checkchat++;

                        console.log("final " + checkchat + ":" + finalcount)

                        if (checkchat == finalcount) {
                            resolve(true)

                            // this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/add_groupchat", todo).then(res => {
                            //     console.log("add_groupchat")
                            //     resolve(true)
                            // }).catch(err => {
                            //     resolve(true)
                            // })
                        }
                    })
                }

            })



        })
        // this.BuddyRecentDB.checkExitsGroupList(todo, this.myInfo, sentGroupInfo, this.GruopProvider.currentgroupMember, this.unseenCount,groupcreated);

        // this.GruopProvider.currentgroupMember.forEach(element => {
        //     this.LoginProvider.getProfileInfo(element.userID).then(res => {
        //         if (res[0].DeviceId != 0) {
        //             this.FirebaseMessagingProvider.initGroupPushNotification(res[0].DeviceId, todo.message, this.myInfo.displayName, todo.filetype, this.myInfo.mobilenumber, 1, this.groupName, this.groupImage, res[0], this.myInfo.WebLogin);
        //         }
        //     })
        // });


    }
    // async createMessage(todo, groupcreated, members) {

    //     console.log("createMessage " + JSON.stringify(todo), members)

    //     return new Promise(resolve => {

    //         var checkchat = 0;
    //         console.log("createGroupMessage : " + JSON.stringify(members))

    //         // var finalcount = members.length;
    //         var finalcount = 0;

    //         this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/add_groupchat", todo).then(res => {
    //             console.log("add_groupchat")

    //             // this.recentMsg(members, todo.message, todo.filetype, todo.groupname, todo.groupimage,unreadmessagecount)
    //             // resolve(true)
    //         }).catch(err => {
    //             // this.recentMsg(members, todo.message, todo.filetype, todo.groupname, todo.groupimage,unreadmessagecount)
    //             // resolve(true)
    //         })

    //         for (var i = 0; i < members.length; i++) {
    //             const temp = members[i]

    //             //if (temp.status == null || temp.status == "1") {
    //             finalcount++;

    //             var unreadmessagecount = 0;

    //             console.log("createMessage members :" + JSON.stringify(temp))


    //             if (temp.uid == null) {
    //                 temp.uid = temp.mobile
    //             }


    //             var send = {
    //                 groupkey: todo.groupkey,
    //                 uid: temp.uid
    //             }
    //             if (temp.uid != localStorage.getItem("FlintauserID")) {

    //                 this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/getunreadgroupmessagenew", send).then(res => {

    //                     var getmemberchat: any;
    //                     getmemberchat = res;
    //                     getmemberchat.forEach(element => {
    //                         if (element.uid == temp.uid) {
    //                             unreadmessagecount = 0;

    //                             if (element.messagecount != null) {
    //                                 unreadmessagecount = (unreadmessagecount + parseInt(element.messagecount))
    //                                 console.log(" createMessage unreadmessagecount :" + unreadmessagecount + ":" + temp.uid)
    //                             }

    //                             unreadmessagecount++;
    //                             if (temp.uid == localStorage.getItem("FlintauserID")) {
    //                                 unreadmessagecount = 0
    //                             }
    //                             console.log("send unreadmessagecount 1:" + unreadmessagecount + ":" + temp.uid)

    //                             var experts = null;
    //                             if (todo.experts == temp.uid) {
    //                                 experts = todo.experts;
    //                             }
    //                             if (temp.uid != localStorage.getItem("FlintauserID")) {
    //                                 this.pushNotification(todo.message, todo.filetype, unreadmessagecount, todo.groupname, todo.groupimage, temp.uid)
    //                             }
    //                             var addnewdata = {
    //                                 "sender": todo.sentby,
    //                                 "uid": temp.uid,
    //                                 "buddyid": todo.sentto, // friend 
    //                                 "sentby": todo.sentby, // Me
    //                                 "buddyImage": todo.groupimage,
    //                                 "username": todo.sendername,
    //                                 "Filedate": todo.timestamp,
    //                                 "messagecount": unreadmessagecount,
    //                                 "fileType": todo.filetype,
    //                                 "filetype": todo.filetype,
    //                                 "groupkey": todo.groupkey,
    //                                 "groupname": todo.groupname,
    //                                 "message": todo.message,
    //                                 "opengroup": todo.opengroup,
    //                                 "timestamp": todo.timestamp,
    //                                 "groupsendername": todo.sendername,
    //                                 "fileextension": todo.fileextension,
    //                                 "experts": experts
    //                             }
    //                             console.log("createMessage addnewdata " + JSON.stringify(addnewdata))

    //                             this.createRecentMessage(addnewdata).then(res => {
    //                                 checkchat++;

    //                                 console.log("final " + checkchat + ":" + finalcount)

    //                                 if (checkchat == finalcount) {
    //                                     resolve(true)
    //                                     // this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/add_groupchat", todo).then(res => {
    //                                     //     console.log("add_groupchat")

    //                                     //     // this.recentMsg(members, todo.message, todo.filetype, todo.groupname, todo.groupimage,unreadmessagecount)
    //                                     //     resolve(true)
    //                                     // }).catch(err => {
    //                                     //     // this.recentMsg(members, todo.message, todo.filetype, todo.groupname, todo.groupimage,unreadmessagecount)
    //                                     //     resolve(true)
    //                                     // })
    //                                 }
    //                             })

    //                         }
    //                     });
    //                 }).catch(res => {
    //                     if (temp.uid == localStorage.getItem("FlintauserID")) {
    //                         unreadmessagecount = 0
    //                     }
    //                     unreadmessagecount++;

    //                     var experts = null;
    //                     if (todo.experts == temp.uid) {
    //                         experts = todo.experts;
    //                     }
    //                     if (temp.uid != localStorage.getItem("FlintauserID")) {

    //                         this.pushNotification(todo.message, todo.filetype, unreadmessagecount, todo.groupname, todo.groupimage, temp.uid)
    //                     }
    //                     var addnewdata = {
    //                         "sender": todo.sentby,
    //                         "uid": temp.uid,
    //                         "buddyid": todo.sentto, // friend 
    //                         "sentby": todo.sentby, // Me
    //                         "buddyImage": todo.groupimage,
    //                         "username": todo.sendername,
    //                         "Filedate": todo.timestamp,
    //                         "messagecount": unreadmessagecount,
    //                         "fileType": todo.filetype,
    //                         "filetype": todo.filetype,
    //                         "groupkey": todo.groupkey,
    //                         "groupname": todo.groupname,
    //                         "message": todo.message,
    //                         "opengroup": todo.opengroup,
    //                         "timestamp": todo.timestamp,
    //                         "groupsendername": todo.sendername,
    //                         "fileextension": todo.fileextension,
    //                         "experts": experts
    //                     }
    //                     console.log(" createMessage addnewdata " + addnewdata.uid)

    //                     this.createRecentMessage(addnewdata).then(res => {
    //                         checkchat++;

    //                         console.log("final " + checkchat + ":" + finalcount)

    //                         if (checkchat == finalcount) {
    //                             resolve(true)

    //                             // this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/add_groupchat", todo).then(res => {
    //                             //     console.log("add_groupchat")
    //                             //     resolve(true)
    //                             // }).catch(err => {
    //                             //     resolve(true)
    //                             // })
    //                         }
    //                     })

    //                 })



    //                 // this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/getunreadgroupmessage", send).then(res => {
    //                 //     unreadmessagecount = 0;
    //                 //     console.log(" createMessage getunreadgroupmessage :" + JSON.stringify(res))
    //                 //     if (res[0]["messagecount"] != null) {
    //                 //         unreadmessagecount = (unreadmessagecount + parseInt(res[0]["messagecount"]))
    //                 //         console.log(" createMessage unreadmessagecount :" + unreadmessagecount + ":" + temp.uid)
    //                 //     }
    //                 //     unreadmessagecount++;
    //                 //     if (temp.uid == localStorage.getItem("FlintauserID")) {
    //                 //         unreadmessagecount = 0
    //                 //     }




    //                 // }).catch(res => {



    //                 // })

    //             }
    //             else {

    //                 unreadmessagecount++;
    //                 if (temp.uid == localStorage.getItem("FlintauserID")) {
    //                     unreadmessagecount = 0
    //                 }
    //                 console.log("send unreadmessagecount 2:" + unreadmessagecount + ":" + temp.uid)
    //                 var experts = null;
    //                 if (todo.experts == temp.uid) {
    //                     experts = todo.experts;
    //                 }
    //                 if (todo.experts != temp.uid) {
    //                     this.pushNotification(todo.message, todo.filetype, unreadmessagecount, todo.groupname, todo.groupimage, temp.uid)
    //                 }
    //                 var addnewdata = {
    //                     "sender": todo.sentby,
    //                     "uid": temp.uid,
    //                     "buddyid": todo.sentto, // friend 
    //                     "sentby": todo.sentby, // Me
    //                     "buddyImage": todo.groupimage,
    //                     "username": todo.sendername,
    //                     "Filedate": todo.timestamp,
    //                     "messagecount": unreadmessagecount,
    //                     "fileType": todo.filetype,
    //                     "filetype": todo.filetype,
    //                     "groupkey": todo.groupkey,
    //                     "groupname": todo.groupname,
    //                     "message": todo.message,
    //                     "opengroup": todo.opengroup,
    //                     "timestamp": todo.timestamp,
    //                     "groupsendername": todo.sendername,
    //                     "fileextension": todo.fileextension,
    //                     "experts": experts
    //                 }
    //                 console.log(" createMessage addnewdata " + addnewdata.uid)

    //                 this.createRecentMessage(addnewdata).then(res => {
    //                     checkchat++;

    //                     console.log("final " + checkchat + ":" + finalcount)

    //                     if (checkchat == finalcount) {
    //                         resolve(true)

    //                         // this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/add_groupchat", todo).then(res => {
    //                         //     console.log("add_groupchat")
    //                         //     // this.recentMsg(members, todo.message, todo.filetype, todo.groupname, todo.groupimage,unreadmessagecount)
    //                         //     resolve(true)
    //                         // }).catch(err => {
    //                         //     // this.recentMsg(members, todo.message, todo.filetype, todo.groupname, todo.groupimage,unreadmessagecount)
    //                         //     resolve(true)
    //                         // })
    //                     }
    //                 })
    //             }

    //             // this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/getunreadgroupmessage", send).then(res => {
    //             //     console.log(" createMessage getunreadgroupmessage :" + JSON.stringify(res))
    //             //     unreadmessagecount = 0;
    //             //     if (res[0]["messagecount"] != null) {
    //             //         unreadmessagecount = (unreadmessagecount + parseInt(res[0]["messagecount"]))
    //             //         console.log(" createMessage unreadmessagecount :" + unreadmessagecount + ":" + temp.uid)
    //             //     }
    //             //     unreadmessagecount++;
    //             //     if (temp.uid == localStorage.getItem("FlintauserID")) {
    //             //         unreadmessagecount = 0
    //             //     }

    //             //     var experts = null;
    //             //     if (todo.experts == temp.uid) {
    //             //         experts = todo.experts;
    //             //     }
    //             //     console.log("unreadmessagecount 1 :" + unreadmessagecount + ":" + temp.uid)
    //             //     if (temp.uid != localStorage.getItem("FlintauserID")) {
    //             //         this.pushNotification(todo.message, todo.filetype, unreadmessagecount, todo.groupname, todo.groupimage, temp.uid)
    //             //     }
    //             //     var addnewdata = {
    //             //         "sender": todo.sentby,
    //             //         "uid": temp.uid,
    //             //         "buddyid": todo.sentto, // friend 
    //             //         "sentby": todo.sentby, // Me
    //             //         "buddyImage": todo.groupimage,
    //             //         "username": todo.sendername,
    //             //         "Filedate": todo.timestamp,
    //             //         "messagecount": unreadmessagecount,
    //             //         "fileType": todo.filetype,
    //             //         "filetype": todo.filetype,
    //             //         "groupkey": todo.groupkey,
    //             //         "groupname": todo.groupname,
    //             //         "message": todo.message,
    //             //         "opengroup": todo.opengroup,
    //             //         "timestamp": todo.timestamp,
    //             //         "groupsendername": todo.sendername,
    //             //         "fileextension": todo.fileextension,
    //             //         "experts": experts
    //             //     }
    //             //     console.log("createMessage addnewdata " + JSON.stringify(addnewdata))

    //             //     this.createRecentMessage(addnewdata).then(res => {
    //             //         checkchat++;

    //             //         console.log("final " + checkchat + ":" + finalcount)

    //             //         if (checkchat == finalcount) {
    //             //             // this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/add_groupchat", todo).then(res => {
    //             //             //     console.log("add_groupchat")

    //             //             //     // this.recentMsg(members, todo.message, todo.filetype, todo.groupname, todo.groupimage,unreadmessagecount)
    //             //             //     resolve(true)
    //             //             // }).catch(err => {
    //             //             //     // this.recentMsg(members, todo.message, todo.filetype, todo.groupname, todo.groupimage,unreadmessagecount)
    //             //             //     resolve(true)
    //             //             // })
    //             //         }
    //             //     })



    //             // }).catch(res => {

    //             //     if (temp.uid == localStorage.getItem("FlintauserID")) {
    //             //         unreadmessagecount = 0
    //             //     }
    //             //     unreadmessagecount++;

    //             //     console.log("unreadmessagecount 2 :" + unreadmessagecount + ":" + temp.uid)
    //             //     var experts = null;
    //             //     if (todo.experts == temp.uid) {
    //             //         experts = todo.experts;
    //             //     }
    //             //     if (temp.uid != localStorage.getItem("FlintauserID")) {
    //             //         this.pushNotification(todo.message, todo.filetype, unreadmessagecount, todo.groupname, todo.groupimage, temp.uid)
    //             //     }
    //             //     var addnewdata = {
    //             //         "sender": todo.sentby,
    //             //         "uid": temp.uid,
    //             //         "buddyid": todo.sentto, // friend 
    //             //         "sentby": todo.sentby, // Me
    //             //         "buddyImage": todo.groupimage,
    //             //         "username": todo.sendername,
    //             //         "Filedate": todo.timestamp,
    //             //         "messagecount": unreadmessagecount,
    //             //         "fileType": todo.filetype,
    //             //         "filetype": todo.filetype,
    //             //         "groupkey": todo.groupkey,
    //             //         "groupname": todo.groupname,
    //             //         "message": todo.message,
    //             //         "opengroup": todo.opengroup,
    //             //         "timestamp": todo.timestamp,
    //             //         "groupsendername": todo.sendername,
    //             //         "fileextension": todo.fileextension,
    //             //         "experts": experts
    //             //     }
    //             //     console.log(" createMessage addnewdata " + addnewdata.uid)

    //             //     this.createRecentMessage(addnewdata).then(res => {
    //             //         checkchat++;

    //             //         console.log("final " + checkchat + ":" + finalcount)

    //             //         if (checkchat == finalcount) {
    //             //             resolve(true)
    //             //             // this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/add_groupchat", todo).then(res => {
    //             //             //     console.log("add_groupchat")
    //             //             //     resolve(true)
    //             //             // }).catch(err => {
    //             //             //     resolve(true)
    //             //             // })
    //             //         }
    //             //     })


    //             // })
    //             // }

    //         }

    //     })
    //     // this.BuddyRecentDB.checkExitsGroupList(todo, this.myInfo, sentGroupInfo, this.GruopProvider.currentgroupMember, this.unseenCount,groupcreated);

    //     // this.GruopProvider.currentgroupMember.forEach(element => {
    //     //     this.LoginProvider.getProfileInfo(element.FlintauserID).then(res => {
    //     //         if (res[0].DeviceId != 0) {
    //     //             this.FirebaseMessagingProvider.initGroupPushNotification(res[0].DeviceId, todo.message, this.myInfo.displayName, todo.filetype, this.myInfo.mobilenumber, 1, this.groupName, this.groupImage, res[0], this.myInfo.WebLogin);
    //     //         }
    //     //     })
    //     // });


    // }



    userINfo(mobile) {
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


    pushNotification(message, filetype, unreadmessagecount, groupname, groupImg, uid) {
        console.log("element.deviceid :" + uid)
        this.userINfo(uid).then(res => {
            console.log("pushNotification :" + JSON.stringify(res))
            var getdata: any;
            getdata = res;
            if (getdata[0].deviceid != null && getdata[0].deviceid != "null" && getdata[0].deviceid != 0) {
                this.fcm.initGroupPushNotification(getdata[0].deviceid, message, localStorage.getItem("username"), filetype, localStorage.getItem("FlintauserID"), unreadmessagecount, groupname, groupImg, uid)
            }
        })

    }
    recentMsg(member, message, filetype, groupname, groupImg, unreadmessagecount) {

        var checkchat = 0, totalemeber = member.length;
        return new Promise(resolve => {


            member.forEach(element => {
                var unreadmessagecount = 0;
                var obj = {
                    "uid": element.uid,
                    "groupkey": element.groupkey
                }
                this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/getunreadmessage", obj).then(res => {
                    console.log("getunreadmessage :" + JSON.stringify(res))
                    if (res["count"] != null) {
                        unreadmessagecount = unreadmessagecount + parseInt(res["count"])
                    }

                    element.unreadmessagecount = unreadmessagecount;

                    if (element.uid != localStorage.getItem("FlintauserID")) {
                        var obj = {
                            "uid": element.uid,
                            "groupkey": element.groupkey,
                            "messagecount": unreadmessagecount
                        }

                        this.pushNotification(this.ApiserviceService.decryptText(message) , filetype, unreadmessagecount, groupname, groupImg, element.uid)

                        // this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/updategroupunread", obj).then(res => {
                        // })
                    }


                }).catch(res => {
                    checkchat++;
                    console.log("checkchat 2:" + checkchat + ":" + totalemeber)
                    if (element.uid != localStorage.getItem("FlintauserID")) {
                        var obj = {
                            "uid": element.uid,
                            "groupkey": element.groupkey,
                            "messagecount": 1
                        }
                        this.pushNotification(this.ApiserviceService.decryptText(message), filetype, 1, groupname, groupImg, element.uid)
                        //   this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/updategroupunread", obj).then(res => {
                        //  })
                    }
                })
            });
        })


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
    updateStatusMessage(todo) {
        this.retryUntilWritten(todo);

        // this.db.put(todo).catch((err) => {
        //     console.log(err);
        // });
    }

    updateMessage(todo) {
        this.retryUntilWritten(todo);

    }

    // deleteMessage(todo) {
    //     this.db.remove(todo).catch((err) => {
    //         console.log(err);
    //     });
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


}
