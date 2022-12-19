import { Component, OnInit } from '@angular/core';
import { NavController, ToastController,NavParams,ModalController} from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { File } from '@ionic-native/file/ngx';
import { ActivatedRoute } from '@angular/router';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-file-filter',
  templateUrl: './file-filter.page.html',
  styleUrls: ['./file-filter.page.scss'],
})
export class FileFilterPage implements OnInit {
  items: any;
  searchTerm: string = '';
  allMsg: any;
  // FDate: any;
  // ToDate: any;
  allMessage: any;
  todayDate: any;
  groupmembers = [];
  groupkey: any;
  singlechat: boolean;
  temparray = [];
  username: any;
  FDate: any;
  ToDate: any;


  buddyInfo: any;
  constructor(public modalController:ModalController,public navParams:NavParams,private FileTransfer: FileTransfer, private androidPermissions: AndroidPermissions,private photoViewer: PhotoViewer,private activatedRoute: ActivatedRoute, public sanitizer: DomSanitizer, private fileOpener: FileOpener, private transfer: FileTransfer, private file: File, private toastr: ToastController, private datepicker: DatePicker, public navCtrl: NavController) {
    // message: this.allmessages,
    // buddyInfo: this.buddydetails
    
    
    
      this.username = 0;
      this.todayDate = new Date().toISOString().split('T')[0];
      // this.username="Select"
      var date = new Date().toISOString();
      var fromDate = new Date(date);
      this.FDate = this.todayDate;
      this.ToDate = this.todayDate;
  
      this.allMessage = this.navParams.get('message');
      this.allMsg = []
      console.log("msg.length :" + JSON.stringify(this.navParams.get('message')))
  
      for (var i = 0; i < this.allMessage.length; i++) {
        console.log("chk all :" + this.allMessage[i].Date)
  
        
  
        if ( this.allMessage[i].filetype !='video text' && this.allMessage[i].filetype !='video text' &&  this.allMessage[i].filetype !='call text' && this.allMessage[i].filetype != 'map live' && this.allMessage[i].filetype != 'event' &&  this.allMessage[i].filetype != 'title' && this.allMessage[i].filetype != 'text' && this.allMessage[i].filetype != 'map') {
  
          this.allMsg.push(
            {
              message: this.allMessage[i].message,
              timestamp: this.allMessage[i].timestamp,
              filetype: this.allMessage[i].filetype,
              Date: this.allMessage[i].Date,
              fileextension: this.allMessage[i].fileextension,
              name: this.allMessage[i].sendername
  
            }
          )
  
          this.temparray = this.allMsg;
        }
  
      }
      console.log("final :" + JSON.stringify(this.allMsg))
      
      if (this.navParams.get('groupkey')== undefined) {
  
        this.singlechat = true;
  
      }
      else {
        this.singlechat = false;
        this.groupmembers = [];
        
        this.groupmembers =this.navParams.get('groupmembers');
  
      }

   

  }
  BackButtonAction()
  {
    console.log("chk")
    
  }
  ngOnInit() {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FileFilterPage');
    //this.setFilteredItems();



  }


  // downloadFile(url, fileName, filetype) {
  //   let path = '';
  //   let dir_name = 'Download'; // directory to download - you can also create new directory
  //   // let file_name = 'file.txt'; //any file name you like

  //   var mimeType = null;
  //   if (filetype.toLowerCase() == "txt") {
  //     mimeType = 'text/plain';
  //   }
  //   else if (filetype.toLowerCase() == "pdf") {
  //     mimeType = 'application/pdf';
  //   }
  //   else if (filetype.toLowerCase() == "png") {
  //     mimeType = 'image/png';
  //   }
  //   else if (filetype.toLowerCase() == "ppt") {
  //     mimeType = 'application/vnd.ms-powerpoint';
  //   }
  //   else if (filetype.toLowerCase() == "mp4") {
  //     mimeType = 'video/mp4';
  //   }
  //   else if (filetype.toLowerCase() == "avi") {
  //     mimeType = 'video/avi';
  //   }
  //   else if (filetype.toLowerCase() == "xlsx") {
  //     mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
  //   }
  //   else if (filetype.toLowerCase() == "doc") {
  //     mimeType = 'application/msword';
  //   }
  //   else if (filetype.toLowerCase() == "mpeg") {
  //     mimeType = ' audio/mpeg';
  //   }


  //   // const fileTransfer: FileTransferObject = this.transfer.create();
  //   // let result = this.file.createDir(this.file.externalRootDirectory, dir_name, true);
  //   // result.then((resp) => {
  //   //   path = resp.toURL();
  //   //   console.log(path);
  //   //   fileTransfer.download(url, path + fileName).then((entry) => {
  //   //     console.log('download complete: ' + entry.toURL());

  //   this.fileOpener.open(url, mimeType)
  //     .then(() => console.log('File is opened'))
  //     .catch(e => {
  //       console.log('Error opening file', e)
  //       this.presentToast('Your file opener not installed')
  //     });

  //   //   }, (error) => {
  //   //     console.log(error)
  //   //   });
  //   // }, (err) => {
  //   //   console.log('error on creating path : ' + err);
  //   // });
  // }
  // // convertDate format
  // convertDate(date) {
  //   var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'agu', 'sep', 'oct', 'nov', 'dec'];
  //   var day = date.getDate();
  //   var year = date.getFullYear();
  //   var month = months[date.getMonth()];
  //   return day + "-" + month + "-" + year;
  // }

  dateCheck(from,to,check) {

    var fDate,lDate,cDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);
    cDate = Date.parse(check);

    if((cDate <= lDate && cDate >= fDate)) {
        return true;
    }
    return false;
}
convertDateFormat(date) {
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();

  return (yyyy + "-" + mm + "-" + dd);
}

  // Filter file based on date
  filterDate() {
    
    if (this.navParams.get('groupkey') == undefined) {
      var fromDate = new Date(this.FDate);

      var date1 = new Date().toISOString();
      var fromDate1 = new Date(date1);
      fromDate.setHours(0);
      fromDate.setMinutes(0)
      fromDate.setSeconds(0);

      var toDate = new Date(this.ToDate);
      toDate.setHours(0);
      toDate.setMinutes(0)
      toDate.setSeconds(0);
      //alert("temparray :");
      // if (toDate < fromDate) {
      if (fromDate > toDate) {
        this.presentToast('Enter valid date');

      }
      else if (toDate > fromDate1) {
        this.presentToast('Enter valid date');
        this.allMsg = [];
      }
      else {

        this.allMsg = [];
        this.allMessage.forEach(element => {

          var getdata = new Date(parseInt(element.timestamp))
          // getdata.setHours(0);
          // getdata.setMinutes(0)
          // getdata.setSeconds(0);

          if (element.filetype !='video text' && element.filetype !='call text' && element.filetype != 'map live' && element.filetype != 'event' &&  element.filetype != 'title' && element.filetype != 'text' && element.filetype != 'map') {

            console.log("call 1:" + this.convertDateFormat(fromDate) + " : " + this.convertDateFormat(toDate) + " :: " + this.convertDateFormat(getdata))
            if (this.dateCheck(this.convertDateFormat(fromDate), this.convertDateFormat(toDate), this.convertDateFormat(getdata))==true) {
              console.log("call 2:" + getdata)

              this.allMsg.push(
                {
                  message: element.message,
                  timestamp: element.timestamp,
                  filetype: element.filetype,
                  Date: element.Date,

                  fileextension: element.fileextension,
                  name: element.username
                }
              )
            }
          }
        });

      }
      // }

      // else {
      //   alert("select valid date's")
      // }
    }
    else {

      console.log("check :" + this.FDate + ":" + this.ToDate)
      var fromDate = new Date(this.FDate);

      var date1 = new Date().toISOString();
      var fromDate1 = new Date(date1);
      fromDate.setHours(0);
      fromDate.setMinutes(0)
      fromDate.setSeconds(0);

      var toDate = new Date(this.ToDate);
      toDate.setHours(0);
      toDate.setMinutes(0)
      toDate.setSeconds(0);

      // if (toDate < fromDate) {
      if (fromDate > toDate) {
        this.presentToast('Enter valid date');
      }
      else if (toDate > fromDate1) {
        this.presentToast('Enter valid date');
      }
      else {
        var mainarray = [];


        this.allMsg = [];
        this.temparray.forEach(element => {

          var getdata = new Date(parseInt(element.timestamp))

          if (element.filetype !='video text' && element.filetype !='call text' && element.filetype != 'map live' && element.filetype != 'event' &&  element.filetype != 'title' && element.filetype != 'text' && element.filetype != 'map') {
            
            if (this.dateCheck(this.convertDateFormat(fromDate), this.convertDateFormat(toDate), this.convertDateFormat(getdata))==true) {
              // this.allgroupmsgs=element;
              mainarray.push(element);

              if (this.username != 0) {
                if (element.name.toString().trim() == this.username.toString().trim()) {

                  this.allMsg.push(
                    {
                      message: element.message,
                      timestamp: element.timestamp,
                      filetype: element.filetype,
                      Date: element.Date,

                      fileextension: element.fileextension,
                      name: element.name
                    }
                  )
                }
              }
              else {
                this.allMsg = mainarray;
              }
            }
            // else {

            //   if (this.username != 0) {
            //     console.log("temparray : "+JSON.stringify(this.temparray))
            //     this.allMsg = this.temparray.filter((v) => {
            //       if (v.name.indexOf(this.username) > -1) {
            //         return true;
            //         }


            //       });

            //   }
            //   else {
            //     this.allMsg = [];
            //   }

            // }

          }
        });

      }
    }
  }

  getPermission(url, fileName, filetype) {

    this.androidPermissions.hasPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      .then(status => {
        if (status.hasPermission) {
          this.downloadFile(url, fileName, filetype);
        }
        else {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
            .then(status => {
              if (status.hasPermission) {
                this.downloadFile(url, fileName, filetype);
              }
            });
        }
      });
  }
  downloadFile(url, fileName, filetype) {

    const fileTransfer: FileTransferObject = this.FileTransfer.create();

    fileTransfer.download(url, this.file.externalRootDirectory +
      '/Download/' + fileName).then()
    let fileExtn = fileName.split('.').reverse()[0];
    let fileMIMEType = this.getMIMEtype(fileExtn);
    this.fileOpener.open("file:///storage/emulated/0/download/" + fileName + "", fileMIMEType)
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error openening file', e));


  }
  getMIMEtype(extn) {
    let ext = extn.toLowerCase();
    let MIMETypes = {
      'txt': 'text/plain',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'doc': 'application/msword',
      'pdf': 'application/pdf',
      'jpg': 'image/jpeg',
      'bmp': 'image/bmp',
      'png': 'image/png',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'rtf': 'application/rtf',
      'ppt': 'application/vnd.ms-powerpoint',
      'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    }
    return MIMETypes[ext];
  }
  private async presentToast(message) {
    const toast = await this.toastr.create({
      message,
      position: "middle",
      duration: 3000
    });
    toast.present();
  }
 
  // Zoom file //priya
  
  ZoomFile(file) {
    this.photoViewer.show(file);
  }
  FileopenBrowser(FileURl, filname) {
    console.log("filname :" + FileURl + " : " + filname)

    // this.navCtrl.push('ZoompagePage', {
    //   Filesrc: FileURl
    // })

  }

  closemodal(){
    this.modalController.dismiss(); 
  }
  searchFile(searchbar){
    var q = searchbar.target.value;
   
    this.allMsg = this.allMsg.filter((v) => {
      if (v.fileextension.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      else {

        return false;

      }
  })
  if (q.length == 0) {
    this.filterDate();
  }
  }
}


