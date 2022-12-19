import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-project-milestone',
  templateUrl: './project-milestone.page.html',
  styleUrls: ['./project-milestone.page.scss'],
})
export class ProjectMilestonePage implements OnInit {

  milestones:any = [{
    'text':'',
    'startdate':'',
    'deadline':''
   }];
   tcreate:boolean;
   tview:boolean = false;
   projectname:any;
   request:any = 0;
   projectid:any;
   allprojects:any;
   project:any;
   projectstat:any;
   statusview=[];
   progress:any;
   status:any;
   admin:any;
  constructor(private service:ApiserviceService) {
    this.admin = localStorage.getItem('adminlogin');
   }

  ngOnInit() {
    this.getprojects();
  }
  remove_milestone(i){
    this.milestones.splice(i,1);
    console.log(this.milestones);
  }
  add_milestone(){
    this.milestones.push({
      'text':'',
      'startdate':'',
      'deadline':'',
      'description':''
     });
  }

  submit(){
    console.log(this.milestones);
      console.log(this.projectname,this.projectid,this.milestones);
      if(this.projectname==undefined||this.projectid==undefined){
        this.service.presentToast("Project Name or Project ID cannot be Empty!")
      }else if(this.milestones.length>0) {
        var count = 0;
        for(let i = 0;i<this.milestones.length;i++){
          
          if(this.milestones[i].text==""||this.milestones[i].deadline=="" || this.milestones[i].startdate==""){
            count++;
            console.log(count);
          }
          console.log(count);
          if(count>0){
            this.service.presentToast("Please fill all Milestone details!")
          }
        }
        console.log(count);
        if(count==0){
              for(let i = 0;i<this.milestones.length;i++){
          var data = {
            projectname:this.projectname,
            milestone:this.milestones[i].text,
            startdate:this.milestones[i].startdate,
            duedate:this.milestones[i].deadline,
            description:this.milestones[i].description,
            projectid:this.projectid,
            status:"1"
          }
          this.service.PostRequest(this.service.mainAPI+'/add_milestone',data).then(res=>{
            console.log(res);
            
          },err=>{
            console.log(err);
            if(err.error.text=="insert successfully"){
              this.request++;
              console.log(this.request);
              if(this.milestones.length==this.request){
                this.service.presentToast("New Milestones are added for the Project : "+this.projectname);
                this.milestones = [{
                  'text':'',
                  'startdate':'',
                  'deadline':''
                }];
                this.projectname = '';
                this.projectid = '';
                this.getprojects();
                this.getprojectstat();
              }
            }
          })
          console.log(this.request);
        }
        }
      }
   
    this.request = 0;
  }

  getprojects(){
    this.service.GetRequest(this.service.mainAPI+'/get_allproject').then(res=>{
      console.log(res);
      this.allprojects = res;
    },err=>{
      console.log(err);
    })
  }
  getprojectstat(){
    var count = 0;
    console.log( "this.project :"+this.project)
    var data = {
      projectid : this.project
    }
    this.service.PostRequest(this.service.mainAPI+'/get_projectstatus',data).then(res=>{
      console.log(res);
      this.projectstat = res;
      this.projectstat.forEach(element => {
       
        var date1, date2;
        date1 = new Date(element.startdate);
        date2 = new Date(element.duedate);
        // get total seconds between two dates
        var res = Math.abs(date1 - date2) / 1000;
        var days = Math.floor(res / 86400);
        element.Difference_In_Days=days
        element.startdate1=this.convert(new Date(element.startdate))
        element.duedate1=this.convert(new Date(element.duedate))
        if(element.status == "2"){
          count++
        }
      });
      this.progress = Number((count/this.projectstat.length).toFixed(2));
       console.log(this.progress);
    },err=>{
      console.log(err);
    })
  }
  convertDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-")+" "+this.tConv24(date.getHours()+":"+date.getMinutes());
  }
  tConv24(time24) {
    var ts = time24;
    var H = +ts.substr(0, 2);
    var h = (H % 12) || 12;
    var hour = (h < 10) ? ("0" + h) : h;  // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = hour +":"+ ts.substr(2, 3) + ampm;
    return ts;
  }
  changestat(project,val,value){
    if(val=="1" || val=="0"){
      var data = {
        completedate: '',
        projectid:project.projectid,
        duedate:project.duedate,
        status:val
      }
     this.service.PostRequest(this.service.mainAPI+'/upd_projectstatus',data).then(res=>{
       console.log(res);
     },err=>{
       console.log(err);
       if(err.error.text=="update successfully"){
        this.service.presentToast("Status Updated Successfully!");
        this.getprojects();
        this.getprojectstat();
        
      }
     })
    }
    if(val=="2"){
      var data1 = {
        completedate: new Date().getTime(),
        projectid:project.projectid,
        duedate:project.duedate,
        status:val
      }
     this.service.PostRequest(this.service.mainAPI+'/upd_projectstatus',data1).then(res=>{
       console.log(res);
     },err=>{
       console.log(err);
       if(err.error.text=="update successfully"){
         this.service.presentToast("Status Updated Successfully!");
         this.getprojects();
        this.getprojectstat();
       }
     })
    }
   

  }
  showstatus(i){
    if(this.statusview[i] == false){
      this.statusview[i] = true;
    }else{
      this.statusview[i] = false;
    }
    
  }
  closestat(i){
    console.log(i);
    this.statusview[i] = false;
  }

  toggle_create(){
    this.tcreate =true;
    
  }

  toggle_view(){
    this.tcreate = false;
    this.project=''
    this.projectstat=[]
    this.allprojects=[];
    this.getprojects();
    this.getprojectstat();

  }

}
