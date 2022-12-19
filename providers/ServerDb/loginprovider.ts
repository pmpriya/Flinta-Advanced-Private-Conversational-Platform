import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ApiserviceService } from "../../app/apiservice.service";
import { Injectable } from '@angular/core';
/*
  Generated class for the TodosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
import * as $ from 'jquery';

//Poopandi (20/05/2019)
@Injectable()
export class LoginProvider {

    data: any;
    profiledata: any;
    buddyinfo: any;
    db: any;
    remote: any;

    ProfileImgage: any;
    ProfileId: any;
    Profiledesignation: any;
    mobile:any;
    ProfileName: any;
    public userdata: any;

    ContactList = [];
    compid:any;

    constructor(private ApiserviceService:ApiserviceService, private http: HttpClient, ) {
        console.log('Hello LoginProvider Provider');
       
      
    }


    // retrieveUserInfo(id) {
    //     return new Promise(resolve => {
    //         this.db.get(id)
    //             .then((doc) => {
    //                 var item = [],
    //                     dataURIPrefix = 'data:image/jpeg;base64,',
    //                     attachment;

    //                 if (doc._attachments) {
    //                     attachment = doc._attachments["character.jpg"].data;
    //                 }

    //                 item.push(
    //                     {
    //                         id: id,
    //                         rev: doc._rev,
    //                         character: doc.character,
    //                         title: doc.title,
    //                         note: doc.note,
    //                         rating: doc.rating,
    //                         image: dataURIPrefix + attachment
    //                     });
    //                 resolve(item);
    //             })
    //     });
    // }


    getAllContactNumbers() {
        return new Promise(resolve => {

            this.db.allDocs({

                include_docs: true

            }).then((result) => {

                this.data = [];

                let docs = result.rows.map((row) => {
                    console.log("all docs:" + row.doc)

                    this.data.push(row.doc);


                });

                resolve(this.data);


            }).catch((error) => {

                console.log(error);

            });

        });
    }
    updateProfileDetails(profile,mobile){
      
        return new Promise(resolve => {

            var obj={
                Marital:profile.marital,
                email:profile.email,
                designation:profile.designation,
                department:profile.department,
                branchname:profile.branchname,
                mobile:profile.mobile
            }
            
            this.http.post(this.ApiserviceService.mainAPI+"/updateprofile",obj).subscribe(res => {
                resolve(res)
            })

           
        });
    }
    updateImage(imagepath,mobile) {
        // if (this.data) {
        //     return Promise.resolve(this.data);
        // }

        return new Promise(resolve => {

            var obj={
                photourl:imagepath,
                mobile:mobile
            }
            this.http.post(this.ApiserviceService.mainAPI+"/updateRecentChatProfileImage",obj).subscribe(res => {
                
            })
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI+"/updateUserImage",obj).then(res => {
                resolve(res)
            }).catch(err=>{
                resolve(true)
            })

           
        });
    }
    getUserInfo(compid) {
        // if (this.data) {
        //     return Promise.resolve(this.data);
        // }

        return new Promise(resolve => {

            var data={
                compid:compid
              }
                this.http.post(this.ApiserviceService.mainAPI + '/getUserMstComp',data).subscribe(res => {
       
                resolve(res)
            })


        });
    }

    getContactinfo() {
        this.ContactList = [];

        return new Promise(resolve => {

            this.db.allDocs({

                include_docs: true

            }).then((result) => {


                let docs = result.rows.map((row) => {
                    console.log("all docs:" + row.doc)

                    if (row.doc.mobilenumber != localStorage.getItem('FlintauserID')) {
                        this.ContactList.push(row.doc);
                    }

                });

                resolve(this.ContactList);


            }).catch((error) => {

                console.log(error);

            });

        });
    }

    //get current user profile information
    //paraaters:uid
    getProfileInfo(uid) {

        // if (this.profiledata) {
        //     return Promise.resolve(this.profiledata);
        // }

        return new Promise(resolve => {

            this.db.allDocs({

                include_docs: true

            }).then((result) => {

                this.profiledata = [];

                let docs = result.rows.map((row) => {


                    if (row.doc.mobilenumber == uid) {

                        this.profiledata.push(row.doc);
                        console.log("all docs:" + JSON.stringify(this.profiledata));
                    }


                });

                resolve(this.profiledata);

                // this.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
                //     console.log("live changes")
                //     this.handleChangeProfileinfo(change,uid);
                //     this.events.publish('livechanges');
                // });

            }).catch((error) => {

                console.log(error);

            });

        });
    }
    getProfileInfoviaemail(uid) {

        // if (this.profiledata) {
        //     return Promise.resolve(this.profiledata);
        // }

        return new Promise(resolve => {

            this.db.allDocs({

                include_docs: true

            }).then((result) => {

                this.profiledata = [];

                let docs = result.rows.map((row) => {


                    if (row.doc.email == uid) {

                        this.profiledata.push(row.doc);
                        console.log("all docs:" + JSON.stringify(this.profiledata));
                    }


                });

                resolve(this.profiledata);

                // this.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
                //     console.log("live changes")
                //     this.handleChangeProfileinfo(change,uid);
                //     this.events.publish('livechanges');
                // });

            }).catch((error) => {

                console.log(error);

            });

        });
    }

 


    getbuddyinfo(uid) {
        console.log("this.buddyinfo ===========>:" + JSON.stringify(this.buddyinfo))

        if (this.buddyinfo != undefined && this.buddyinfo.length != 0) {
            return Promise.resolve(this.buddyinfo);
        }

        return new Promise(resolve => {

            this.db.allDocs({

                include_docs: true

            }).then((result) => {

                this.buddyinfo = [];

                let docs = result.rows.map((row) => {

                    console.log("getbuddyinfo 1:" + JSON.stringify(row.doc))

                    if (row.doc.mobilenumber == uid) {

                        this.buddyinfo.push(row.doc);
                        console.log("all docs:" + JSON.stringify(this.buddyinfo));
                    }


                });

                resolve(this.buddyinfo);

              

            }).catch((error) => {

                console.log(error);

            });

        });
    }

    getGroupinfo(id) {
        console.log("getGroupMemberlist =>" + id)
        return new Promise(resolve => {
            this.db.get(id).then((result) => {
                console.log("result :" + JSON.stringify(result))
                // this.data = result;
                resolve(result);
            }).catch((error) => {
                console.log(error);
            });
        });
    }

    loginAuthenticate(phone, password) {


        return new Promise(resolve => {


            var obj = {
                "mobile": phone,
                "password": password
            }
            this.http.post(this.ApiserviceService.mainAPI+"/login_mobile", obj).subscribe(res => {
                resolve(res)
            })


        });
    }


    createTodo(todo) {
        this.db.post(todo);
    }

    //update language for current user
    //paramater:all details for update
    updateLanguage(details) {


        return new Promise(resolve => {
            this.retryUntilWritten(details);
            this.db.put(details).then((result) => {
                resolve(result);
            });

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
    //update password for current user
    //paramater:all details for update
    updatepassword(details) {


        return new Promise(resolve => {
            this.retryUntilWritten(details);

            this.db.put(details).then((result) => {
                resolve(result);
            });

        });
    }

    //update password for current user
    //paramater:all details for update
    updateimage(details) {


        return new Promise(resolve => {
            this.retryUntilWritten(details);

            this.db.put(details).then((result) => {
                resolve(result);
            });

        });
    }

    userUpdatestatus(data, status, deviceID) {
        return new Promise(async resolve => {

            var body = {
                _id: data._id,
                _rev: data._rev,

                status: status,
                employee: data.employee,
                displayName: data.displayName,
                email: data.email,
                extension: data.extension,
                mobilenumber: data.mobilenumber,
                password: data.password,
                contacttype: data.contacttype,
                branchname: data.branchname,
                department: data.department,
                designation: data.designation,
                DOB: data.DOB,
                DOJ: data.DOJ,
                gender: data.gender,
                landline: data.landline,
                language: data.language,
                mobilelogin: data.mobilelogin,
                weblogin: data.weblogin,
                deviceres: data.deviceres,
                adminlogin: data.adminlogin,
                location: data.location,
                userStatus: data.userStatus,
                photourl: data.photourl,
                created_at: data.created_at,
                last_changed: new Date().getTime()
            }
            console.log("before :" + JSON.stringify(body))
            console.log("Updatestatus body :" + JSON.stringify(body))
            // this.retryUntilWritten(body);


            resolve(true)

        });

    }
    async  Updatestatus(data, status, deviceID) {

        console.log("Updatestatus :" + JSON.stringify(data))
        return new Promise(async resolve => {


            var body = {
                "_id": data._id,
                "_rev": data._rev,
                "DeviceId": deviceID,
                "status": status,
                "employee": data.employee,
                "displayName": data.displayName,
                "email": data.email,
                "extension": data.extension,
                "mobilenumber": data.mobilenumber,
                "password": data.password,
                "contacttype": data.contacttype,
                "branchname": data.branchname,
                "department": data.department,
                "designation": data.designation,
                "DOB": data.DOB,
                "DOJ": data.DOJ,
                "gender": data.gender,
                "landline": data.landline,
                "language": data.language,
                "mobilelogin": data.mobilelogin,
                "weblogin": data.weblogin,
                "deviceres": data.deviceres,
                "adminlogin": data.adminlogin,
                "location": data.location,
                "userStatus": data.userStatus,
                "photourl": data.photourl,
                "created_at": data.created_at,
                "last_changed": ''

            }
            console.log("Updatestatus body :" + JSON.stringify(body))
            const respond = await this.db.put(body, { force: true }).catch((err) => {
                console.log(err);
            });


            // this.db.put(body,{conflicts: true}).catch((err) => {
            //     console.log(err);
            // });
            resolve(true)

        });
    }
    updateTodo(todo) {

        this.retryUntilWritten(todo);

     
    }

    deleteTodo(todo) {
        this.db.remove(todo).catch((err) => {
            console.log(err);
        });
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


    handleChangeProfileinfo(change, uid) {
        let changedDoc = null;
        let changedIndex = null;

        this.buddyinfo.forEach((doc, index) => {

            if (doc._id === change.id) {
                changedDoc = doc;
                changedIndex = index;
            }

        });

        //A document was deleted
        if (change.deleted) {
            this.buddyinfo.splice(changedIndex, 1);
        }
        else {

            //A document was updated
            if (changedDoc) {
                this.buddyinfo[changedIndex] = change.doc;
            }

            //A document was added
            else {
                if (change.doc.mobilenumber == uid) {
                    this.buddyinfo.push(change.doc);
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
