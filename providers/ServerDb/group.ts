import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BuddyRecentDBProvider } from "./buddyRecentDB";
// import { DatabaseProvider } from "../database/database";
import { ApiserviceService } from "../../app/apiservice.service";
import { rejects } from 'assert';

//Poopandi (27/05/2019)
@Injectable()
export class GruopProvider {

    db: any;
    remote: any;
    buddy: any;
    group: any;

    unseenCount: any;
    myInfo: any;


    newUpdateImg: any;
    newUpdateImg1: any;

    Recentmessages = [];
    OpenRecentmessages = [];
    OpenAllRecentmessages = [];

    mygroups: Array<any> = [];
    currentgroup: Array<any> = [];
    currentgroupMember = [];
    currentgroupname;
    currentgroupKey;
    currentgroupowner;

    currentgroupInfo: any;


    currentgroupProfileImage;
    openGroup: boolean = false;
    grouppic;
    groupmsgs;
    memberadd = [];
    groupInfoArray = [];
    success: boolean;
    constructor(private ApiserviceService: ApiserviceService, private HttpClient: HttpClient, private BuddyRecentDB: BuddyRecentDBProvider) {
        console.log('Hello BuddyChatProvider ');


        // this.databaseservice.getLoggedUserInfo().then((val) => {
        //     this.myInfo = val;
        // })


    }
    initializegroup(buddy) {
        this.group = buddy;

    }
    getGroupinfo1(groupKey) {

        console.log("grop memeber  key =>" + groupKey)
        return new Promise(resolve => {

            var obj = {
                groupkey: groupKey,
            }
            this.HttpClient.post(this.ApiserviceService.mainAPI + "/getgroupMembers1", obj).subscribe(res => {

                console.log("getgroupMembers :" + JSON.stringify(res))

                resolve({ member: res });


            })


        });
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
    updategroupname(details) {

        console.log("" + JSON.stringify(details));
        return new Promise(resolve => {
            this.retryUntilWritten(details);
            this.db.put(details).then((result) => {
                resolve(result);
            });

        });
    }
    updategroupimage(details) {
        return new Promise(resolve => {
            this.retryUntilWritten(details);
            this.db.put(details).then((result) => {
                resolve(result);
            });

        });
    }
    getGrouplist(groupKey) {

        var myarry = [];

        return new Promise(resolve => {
            this.db.allDocs({

                include_docs: true

            }).then((result) => {
                console.log("getGrouplist 11==>" + JSON.stringify(result))

                let docs = result.rows.map((row) => {
                    console.log("getGrouplist==>" + row.doc.FlintauserID + ":" + localStorage.getItem('FlintauserID') + ":" + row.doc.groupKey + "::" + groupKey)
                    if (row.doc.FlintauserID == localStorage.getItem('FlintauserID') && row.doc.groupKey == groupKey) {
                        myarry.push(row.doc);
                    }
                });

                resolve(myarry);


            }).catch((error) => {
                console.log(error);
            });

        });
    }

    getMyGroupinformation(groupkey) {

        var todo1 = {
            uid: localStorage.getItem("FlintauserID").toString(),
            groupkey: groupkey
        }
        return new Promise(resolve => {
            this.HttpClient.post(this.ApiserviceService.mainAPI + "/getMyGroupInformation", todo1).subscribe(res => {
                console.log("getMyGroup")
                resolve(res)
            })

        });
    }
    getGroupContactlist() {

        var todo1 = {
            uid: localStorage.getItem("FlintauserID").toString()
        }
        return new Promise(resolve => {
            this.HttpClient.post(this.ApiserviceService.mainAPI + "/getMyGroup", todo1).subscribe(res => {
                console.log("getMyGroup")
                resolve(res)
            })

        });
    }

    updateGroupImage(photourl, groupkey) {

        var todo1 = {
            photourl: photourl,
            groupkey: groupkey
        }
        return new Promise(resolve => {
            this.HttpClient.post(this.ApiserviceService.mainAPI + "/updateGroupImage", todo1).subscribe(res => {
                console.log("getMyGroup")
                resolve(res)
            })

        });
    }

    updateRecentChatGroupImage(photourl, groupkey) {

        var todo1 = {
            photourl: photourl,
            groupkey: groupkey
        }
        return new Promise(resolve => {
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/updateRecentGroupProfileImage", todo1).then(res => {
                console.log("getMyGroup")
                resolve(res)
            }).catch(err => {
                resolve(false)
            })

        });
    }

    updateGroupName(groupname, groupkey) {




        var todo1 = {
            groupname: groupname,
            groupkey: groupkey
        }
        var promise = new Promise((resolve, reject) => {

            this.HttpClient.post(this.ApiserviceService.mainAPI + "/updateRecentGroupName", todo1).subscribe(res => {
                console.log("updateRecentGroupName")

            })

            this.HttpClient.post(this.ApiserviceService.mainAPI + "/updateGroupName", todo1).subscribe(res => {
                console.log("getMyGroup")

            })
            resolve(true)
        });
        return promise;
    }

    initializebuddy(buddy) {
        this.buddy = buddy;

    }

    addgroup(groupKey, newGroup, memberslist,creatiedTime) {

        var promise = new Promise((resolve, reject) => {



            //Added member grouplist
            memberslist.forEach(element => {
                var todo1 = {
                    uid: element.mobile,
                    groupname: newGroup.groupName,
                    groupkey: groupKey,
                    groupimage: 'default',
                    // owner: localStorage.getItem("userID").toString(),
                    opengroup: newGroup.openGroup,
                    timestamp: creatiedTime,
                    groupstatus: "A",
                    groupcreated: localStorage.getItem("username") + " " + "created group",
                    status:'1'

                }
                // this.db.post(todo1);
                console.log("createGroup 2:" + JSON.stringify(memberslist))

                this.HttpClient.post(this.ApiserviceService.mainAPI + "/createGroup", todo1).subscribe(res => {
                    // resolve(true)
                })

            });


            var todo1 = {
                uid: localStorage.getItem("userID").toString(),
                groupkey: groupKey,
                groupname: newGroup.groupName,
                groupimage: 'default',
                owner: localStorage.getItem("userID").toString(),
                opengroup: newGroup.openGroup,
                timestamp: creatiedTime,
                groupstatus: "A",
                groupcreated: localStorage.getItem("username") + " " + "created group",
                status:'1'
            }
            console.log("createGroup 4:" + JSON.stringify(todo1))

            this.HttpClient.post(this.ApiserviceService.mainAPI + "/createGroup", todo1).subscribe(res => {
                // resolve(true)
            })

            resolve({ groupKey: groupKey })
        })
        return promise;
    }


    getownership(_id) {
        return new Promise(resolve => {
            this.db.get(_id).then((result) => {
                console.log("result :" + JSON.stringify(result))
                // this.data = result;
                if (result.owner == this.myInfo.mobilenumber) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }).catch((error) => {
                console.log(error);
            });
        });

    }

    //priya
    deletemember(item) {
        console.log("deletemember =>" + JSON.stringify(item))
        return new Promise(resolve => {
            this.db.remove(item).then((err) => {
                console.log(err);
                resolve(true);
            });
        });
    }

    removeGroupRecentChat(uid, groupKey) {
        return new Promise(resolve => {

            var todo = {
                uid: uid,
                groupkey: groupKey
            }
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/deleteRecentGroupChat", todo).then(res => {
                resolve(true)
            }).catch(err => {
                resolve(true)
            })
        });
    }
    removeSingleRecentChat(uid, buddyid) {
        return new Promise(resolve => {


                var todo = {
                    uid: uid,
                    buddyid: buddyid
                }
                this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/deleteSingleRecentGroupChat", todo).then(res => {
                    resolve(true)
                }).catch(err => {
                    resolve(true)
                })
           
        });
    }
    deleteGroup(uid, groupKey) {
        return new Promise(resolve => {

            var todo = {
                uid: uid,
                groupkey: groupKey,
                status: "0",
                exittimestamp: new Date().getTime()
            }
               this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/deleteRecentGroupChat", todo).then(res => {
                    resolve(true)
                }).catch(err=>{
                    resolve(true)
                })
                this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/deletetotalGroup", todo).then(res => {
                    resolve(true)
                }).catch(err=>{
                    resolve(true)
                })

        });
    }

    Exitgroup(uid, groupKey,timestamp) {
        return new Promise(resolve => {

            var todo = {
                uid: uid,
                groupkey: groupKey,
                status: "0",
                exittimestamp: timestamp
            }
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/exitsGroupActive", todo).then(res => {
                var todo = {
                    uid: uid,
                    groupkey: groupKey
                }
                // this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/deleteRecentGroupChat", todo).then(res => {
                //     resolve(true)
                // }).catch(err=>{
                //     resolve(true)
                // })

                resolve(true)

            }).catch(err => {
                // var todo = {
                //     uid: uid,
                //     groupkey: groupKey
                // }
                // this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/deleteRecentGroupChat", todo).then(res => {
                //     resolve(true)
                // }).catch(err=>{
                //     resolve(true)
                // })
                resolve(true)
            })

        });
    }



    groupadminChanges(groupKey) {
        this.getGroupinfo(groupKey).then(res => {

            this.currentgroupMember.sort(function (a, b) {
                var c = new Date(a.timestamp);
                var d = new Date(b.timestamp);
                return c > d ? 1 : -1;
            });
            //   console.log("groupadminChanges element 1:"+JSON.stringify(this.currentgroupMember))
            console.log("groupadminChanges element :" + JSON.stringify(this.currentgroupMember[0]))

            var getArray = this.currentgroupMember[0];
            console.log("groupadminChanges getArray :" + JSON.stringify(getArray) + ":" + getArray.FlintauserID)


            var sendata = {
                "_id": getArray._id,
                "_rev": getArray._rev,
                "FlintauserID": getArray.FlintauserID,
                "displayName": getArray.displayName,
                "photourl": getArray.photourl,
                "designation": getArray.designation,
                "groupName": getArray.groupName,
                "groupKey": getArray.groupKey,
                "groupimage": getArray.groupimage,
                "owner": getArray.FlintauserID,
                "GroupAdmin": getArray.displayName,
                "openGroup": getArray.openGroup,
                "admin": true,
                "timestamp": getArray.timestamp,
                "groupStatus": getArray.groupStatus,
                groupcreated: getArray.displayName + " " + "created group" + " '" + getArray.groupName + "' "
            }
            console.log("groupadminChanges sendata :" + JSON.stringify(sendata))

            this.updateMessage(sendata);

        })

    }
    changegroupAdmin(groupKey,uid) {

        console.log("grop memeber  key =>" + groupKey)
        return new Promise(resolve => {

            var obj = {
                groupkey: groupKey,
                uid:uid
            }
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/changegroupAdmin", obj).then(res => {

                console.log("changegroupAdmin :" + JSON.stringify(res))

                resolve(true);


            }).catch(res=>{
                resolve(true)
            })


        });
    }
    RemovegroupAdmin(groupKey,uid) {

        console.log("grop memeber  key =>" + groupKey)
        return new Promise(resolve => {

            var obj1= {
                groupkey: groupKey,
                uid:uid,
                owner:"undefined"
            }
            console.log("RemovegroupAdmin :"+JSON.stringify(obj1))
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + "/RemovegroupAdmin", obj1).then(res => {

                console.log("getgroupMembers :" + JSON.stringify(res))

                resolve(true);


            }).catch(res=>{
                resolve(true)
            })


        });
    }
    getintogroup(groupKey, groupname, groupImage, openGroup) {
        return new Promise(resolve => {



            var obj = {
                groupkey: groupKey,
                groupname: groupname,
            }
            this.HttpClient.post(this.ApiserviceService.mainAPI + "/getGroupinformation", obj).subscribe(res => {

                console.log("getGroupinformation :" + JSON.stringify(res))
                this.currentgroup = [];
                // for (var key in temp) {
                //     console.log("this.currentgroup :" + JSON.stringify(temp[key]))
                //     this.currentgroup.push(temp[key]);
                // }
                this.currentgroupProfileImage = groupImage;
                this.openGroup = this.openGroup;
                this.currentgroupname = groupname;
                // this.currentgroupowner =
                this.currentgroupKey = groupKey;

                resolve(res)
            })


            // console.log("getintogroup 1:" + JSON.stringify(result));

            // var data = [];
            // let docs = result.rows.map((row) => {
            //     console.log("getintogroup 2:" + JSON.stringify(row));
            //     this.currentgroup = [];
            //     // for (var key in temp) {
            //     //     console.log("this.currentgroup :" + JSON.stringify(temp[key]))
            //     //     this.currentgroup.push(temp[key]);
            //     // }
            //     this.currentgroupProfileImage = groupImage;
            //     this.openGroup = this.openGroup;
            //     this.currentgroupname = groupname;
            //     // this.currentgroupowner =
            //     this.currentgroupKey = groupKey;
            // });




        });
    }
    createGroup(todo) {
        return new Promise(resolve => {
            this.db.put(todo).catch((err) => {
                console.log('error is: ' + err);
                this.success = false;

            });

            if (this.success) {
                this.handleSyncing();
                resolve(true);
            }
        });

    }

    getGroupinfo(groupKey) {

        console.log("grop memeber  key =>" + groupKey)
        return new Promise(resolve => {

            var obj = {
                groupkey: groupKey,
            }
            this.HttpClient.post(this.ApiserviceService.mainAPI + "/getgroupMembers", obj).subscribe(res => {

                console.log("getgroupMembers :" + JSON.stringify(res))

                resolve({ member: res });


            })


        });
    }



    updateStatusMessage(todo) {
        this.retryUntilWritten(todo);

    }
    updateMessage(todo) {

    }

    deleteMessage(todo) {
        this.db.remove(todo).catch((err) => {
            console.log(err);
        });
    }
    handleChange(change) {
        let changedDoc = null;
        let changedIndex = null;

        this.groupInfoArray.forEach((doc, index) => {

            if (doc._id === change.id) {
                changedDoc = doc;
                changedIndex = index;
            }

        });

        //A document was deleted
        if (change.deleted) {
            this.groupInfoArray.splice(changedIndex, 1);
        }
        else {

            //A document was updated
            if (changedDoc) {
                this.groupInfoArray[changedIndex] = change.doc;
            }

            //A document was added
            else {
                if (change.doc.FlintauserID == localStorage.getItem('FlintauserID')) {
                    this.groupInfoArray.push(change.doc);
                }
            }

        }

    }
    handleSyncing() {
        this.db.changes({
            since: 'now',
            live: true,
            include_docs: true,
            attachments: true
        })
            .on('change', (change) => {
                // handle change
                console.log('Handling change');
                console.dir(change);
            })
            .on('complete', (info) => {
                // changes() was canceled
                console.log('Changes complete');
                console.dir(info);
            })
            .on('error', (err) => {
                console.log('Changes error');
                console.log(err);
            });
    }
    handleChangesMember(change, groupKey) {
        let changedDoc = null;
        let changedIndex = null;

        this.currentgroupMember.forEach((doc, index) => {

            if (doc._id === change.id) {
                changedDoc = doc;
                changedIndex = index;
            }

        });

        //A document was deleted
        if (change.deleted) {
            this.currentgroupMember.splice(changedIndex, 1);
        }
        else {

            //A document was updated
            if (changedDoc) {
                this.currentgroupMember[changedIndex] = change.doc;
            }

            //A document was added
            else {
                if (change.doc.groupKey == groupKey) {
                    this.currentgroupMember.push(change.doc);
                }
            }

        }

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
