import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController,ModalController,NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { MenuController, IonSlides, NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.page.html',
  styleUrls: ['./changepwd.page.scss'],
})
export class ChangepwdPage implements OnInit {
  newPass: any
  confrimPwd: any;
  oldnPass: any;
  getmyinfo:any;
  loginflow:boolean=false;
  passwordmust:any;
  oldpass:any;
  username:any;
  mobile:any;
  password:any;
  email:any;
  constructor(public navParams:NavParams,private modelctrl:ModalController,private ApiserviceService:ApiserviceService,private alertController:AlertController,private navCtrl:NavController,
    public activatedRoute: ActivatedRoute,private loadingController:LoadingController,private router:Router) { 
    
      console.log(''+JSON.stringify(this.navParams.get('queryParams')));
      if(this.navParams.get('queryParams')!=null){
        this.getmyinfo = this.navParams.get('queryParams').logininfo;
        this.loginflow=true;
        this.username=this.getmyinfo[0].username;
        this.mobile=this.getmyinfo[0].mobile;
     
        this.email=this.getmyinfo[0].email;
        console.log('this.email'+this.email);
      }
      else{
        this.username=localStorage.getItem('name');
        this.mobile=localStorage.getItem('mobile');
        this.password=localStorage.getItem('password');
        this.email=localStorage.getItem('email');
      }
 
    

    }

  ngOnInit() {
  }
  changeclosemodal(){

  }
  CheckPassword(inputtxt) 
  { 
 
    var passw=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/;
  
  if(inputtxt.match(passw)) 
  { 
  this.passwordmust=false;
  
  }
  else
  { 
    this.passwordmust=true;
  
  
  }
  
  }
  Loginevent() {

   
    
    if (this.newPass != undefined && this.newPass.length != 0 && this.confrimPwd != undefined && this.confrimPwd.length != 0&& this.oldpass != undefined && this.oldpass.length != 0) {
      if(this.oldpass == localStorage.getItem("password")){
      if (this.newPass == this.confrimPwd) {
        this.presentLoadingWithOptions();

        if(this.loginflow==true)
        {
          var obj = {
            password: this.confrimPwd,
            mobile: this.mobile
          
          }
      
          var self=this;
          this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + '/newPassword', obj).then(resp => {
            this.loadingdismiss();
  
            this.presentAlert('', 'Password Changed Successfully');
            var sendmail={
            
              Mobile:this.mobile,
              Password:this.confrimPwd,
              username:this.username,
        
              email:this.email
            }
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + '/sendreg_mail', sendmail).then(res => {
      
            }, error => {
             
            });
            this.ApiserviceService.GetRequest("http://apps.vibgyortel.in/apps/sendsms.jsp?user=sunsmt&password=Otpsun@2020&&mobiles=" + this.mobile + "&sms=Welcome to flinta. Your Credentials of flinta is UserName : "+ this.mobile+" "+ "Password : " + this.confrimPwd+" "+"Have a Nice Day!"+ "&senderid=SUNSMT").then(res => {
            
            }, error => {
             
            });
            this.modelctrl.dismiss();

            
          }, error => {
            this.loadingdismiss();
            this.presentAlert('', 'Password Changed Successfully');
            var sendmail={
            
              Mobile:this.mobile,
              Password:this.confrimPwd,
              username:this.username,
        
              email:this.email
            }
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + '/sendreg_mail', sendmail).then(res => {
      
            }, error => {
             
            });
            this.ApiserviceService.GetRequest("http://apps.vibgyortel.in/apps/sendsms.jsp?user=sunsmt&password=Otpsun@2020&&mobiles=" + this.mobile + "&sms=Welcome to flinta. Your Credentials of flinta is UserName : "+ this.mobile+" "+ "Password : " + this.confrimPwd+" "+"Have a Nice Day!"+ "&senderid=SUNSMT").then(res => {
            
            }, error => {
             
            });
            // this.router.navigate(['/login']);
            this.modelctrl.dismiss();
          });
        }
        else{
          var obj1 = {
            password: this.confrimPwd,
            mobile: this.mobile
            
          }
      
          this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + '/newPassword', obj1).then(resp => {
            this.loadingdismiss();

            this.presentAlert('', 'Password Changed Successfully');
            var sendmail={
            
              Mobile:this.mobile,
              Password:this.confrimPwd,
              username:this.username,
        
              email:this.email
            }
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + '/sendreg_mail', sendmail).then(res => {
      
            }, error => {
             
            });
            this.ApiserviceService.GetRequest("http://apps.vibgyortel.in/apps/sendsms.jsp?user=sunsmt&password=Otpsun@2020&&mobiles=" + this.mobile + "&sms=Welcome to flinta. Your Credentials of flinta is UserName : "+ this.mobile+" "+ "Password : " + this.confrimPwd+" "+"Have a Nice Day!"+ "&senderid=SUNSMT").then(res => {
            
            }, error => {
             
            });
            this.modelctrl.dismiss();
          }, error => {
           
            this.loadingdismiss();
            this.presentAlert('', 'Password Changed Successfully');
            localStorage.setItem('password',this.confrimPwd);
            var sendmail={
            
              Mobile:this.mobile,
              Password:this.confrimPwd,
              username:this.username,
        
              email:this.email
            }
            this.ApiserviceService.PostRequest(this.ApiserviceService.mainAPI + '/sendreg_mail', sendmail).then(res => {
      
            }, error => {
             
            });
            this.ApiserviceService.GetRequest("http://apps.vibgyortel.in/apps/sendsms.jsp?user=sunsmt&password=Otpsun@2020&&mobiles=" + this.mobile + "&sms=Welcome to flinta. Your Credentials of flinta is UserName : "+ this.mobile+" "+ "Password : " + this.confrimPwd+" "+"Have a Nice Day!"+ "&senderid=SUNSMT").then(res => {
            
            }, error => {
             
            });
            this.modelctrl.dismiss();
          });
        }
     

      }
      else {
        this.presentAlert('', 'New Password and Conform Password not matched');

      }
    }else{
      this.presentAlert('', 'Old Password mismatch!');
    }
    }
    else {
      if (this.newPass == undefined || this.newPass == '' || this.newPass.length == 0) {
        this.presentAlert('', 'Please Enter New Password');
      }
      else if (this.confrimPwd == undefined || this.confrimPwd == '' || this.confrimPwd.length == 0) {
        this.presentAlert('', 'Please Enter New Confirm Password');
      }else if(this.oldpass == undefined || this.oldpass == '' || this.oldpass.length == 0)
      this.presentAlert('', 'Please Enter Old Password');
    }


  }
  async   loadingdismiss() {

    return await this.loadingController.dismiss();
  }
  async presentAlert(heading, tittle) {
    var alert = await this.alertController.create({
      header: heading,

      message: tittle,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',

      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading',


    });
    return await loading.present();
  }
  changeClosemodal(){
this.modelctrl.dismiss();
  }
  
}
