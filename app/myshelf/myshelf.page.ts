import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ContactlistPage } from '../contactlist/contactlist.page';

@Component({
  selector: 'app-myshelf',
  templateUrl: './myshelf.page.html',
  styleUrls: ['./myshelf.page.scss'],
})
export class MyshelfPage implements OnInit {
  
  files:any;
  nofiles:boolean = false;
  my_no:any = localStorage.getItem('mobile');
  sent_files = [];
  received_files = [];
  constructor(private service:ApiserviceService,public actionSheetController: ActionSheetController,public modalController: ModalController) {

   }
    //priya
  searchuser(searchbar) {
    //this.filteredusers = ;
    var q = searchbar.target.value;
    if (q != undefined && q.trim() == '') {

      this.getmyfiles();
      return;
    }

    this.sent_files = this.sent_files.filter((v) => {
      if (v.fileextension.toLowerCase().indexOf(q.toLowerCase()) > -1 ) {
        return true;
      }
      else {
        return false;
      }
    })
    this.received_files = this.received_files.filter((v) => {
      if (v.fileextension.toLowerCase().indexOf(q.toLowerCase()) > -1 ) {
        return true;
      }
      else {
        return false;
      }
    })

  }
   onCancel(event) {
    console.log('CANCEL', event);
    this.getmyfiles();
  }
  ngOnInit() {
    this.getmyfiles();
  }

  getmyfiles(){
    this.sent_files=[];
      this.received_files=[];
    var new_sent = [];
    var new_received = [];
    var data = {
      mobile:localStorage.getItem('mobile')
    }
    this.service.PostRequest(this.service.mainAPI+'/get_myfiles', data).then(res=>{
      console.log(res);
      this.files = res;
      

      this.files.forEach(element => {
        if(element.sentby == this.my_no){
          this.sent_files.push(element);
        }
        if(element.sentto == this.my_no){
          this.received_files.push(element);
        }
        this.sent_files.sort(function (a, b) {
          var c = new Date(parseInt(a.timestamp));
          var d = new Date(parseInt(b.timestamp));
          return c < d ? 1 : -1;
        });
        this.received_files.sort(function (a, b) {
          var c = new Date(parseInt(a.timestamp));
          var d = new Date(parseInt(b.timestamp));
          return c < d ? 1 : -1;
        });
       
        console.log(this.sent_files,this.received_files);
      });
    },err=>{
      console.log(err);
      if(err.error.text == "no data found"){
        this.nofiles = true;
      }
    })
  }

  async opencontact(data){
    const modal = await this.modalController.create({
      component: ContactlistPage,
      componentProps: {
        filedata : data,
        share_event : "file"
      }
    });
    
    modal.onDidDismiss().then((dataReturned) => {
  
    });
  
    return await modal.present();
  }

  async openaction(data){

    alert('data.filetype'+data.filetype);
    if(data.filetype=='jpg'||data.filetype=='png'||data.filetype=='bmp' ||data.filetype=='image'){
     const actionSheet = await this.actionSheetController.create({
       cssClass: 'my-custom-class',
       buttons: [
         {
           
           text: 'Share',
           icon: 'share',
           handler: () => {
             this.opencontact(data);
   
           }
         },
         {
          
           text: 'View',
           icon: 'eye-outline',
   
           handler: () => {
             var obj = {
               photourl: data.message,
               noarrow: 1,
              
             }
             //this.photoViewer.show(file);
             window.open(data.message, '_blank');
           }
         },
         {
         
           text: 'Cancel',
           icon: 'close',
           role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
   
         },
        
       ]
     }).then(actionsheet => {
       actionsheet.present();
     });
       }
       else{
       
         const actionSheet = await this.actionSheetController.create({
           cssClass: 'my-custom-class',
           buttons: [
             {
               
               text: 'Share',
               icon: 'share',
               handler: () => {
                 this.opencontact(data);
   
               }
             },
             {
              
               text: 'View',
               icon: 'eye-outline',
   
               handler: () => {
               
                window.open(data.message, '_blank');
               }
             },
             {
             
               text: 'Cancel',
               icon: 'close',
               role: 'cancel',
             handler: () => {
               console.log('Cancel clicked');
             }
   
             },
            
           ]
         }).then(actionsheet => {
           actionsheet.present();
         });
       }
     }


}
