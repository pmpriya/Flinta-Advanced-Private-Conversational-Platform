import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-mytask',
  templateUrl: './mytask.page.html',
  styleUrls: ['./mytask.page.scss'],
})
export class MytaskPage implements OnInit {

  emp_description:any;
  
  mytask:any;
  mytask_res:any;
  taskmsg:any;
  assigned_by:any;
  assigned_to:any;
  status:any;
  assigned_on:any;
  due_at:any;
  notask:boolean = false;
  statusoption = [
    {name:"Assign",value:"1"},
    {name:"Reopen",value:"2"},
    {name:"Accepted",value:"3"},
    {name:"Resolved",value:"4"},
    {name:"Closed",value:"5"},
    ];
    statusoption1 = [
      {name:"Reopen",value:"2"},
      {name:"Closed",value:"5"},
      ];
    statusoption2 = [
      {name:"Accepted",value:"3"},
      {name:"Resolved",value:"4"},
    ]
  // clicked:boolean = false;
  clicked = [];
  my_no:any;
  clickedIndex:any;
  searchstring:any = '';
  // date:any = new Date(Date.now()).toLocaleDateString();
  date:any;
  day:number = Date.now();
  constructor(private service:ApiserviceService) {
    this.my_no = localStorage.getItem('mobile');
    this.date = new Date().toISOString().split('T')[0];

    this.getmytask();
   }

  ngOnInit() {
   
  }
  viewdate(){
    console.log(this.date)
  }
 async get_todaytask(){
    console.log(this.date);
    var month;
    var mydate = new Date().toLocaleDateString();
    console.log(mydate);
    
    var sdate = mydate.split('/');
    var assigndate = String(Number(sdate[1])) + '-' + String(Number(sdate[0])) + '-' + sdate[2];
    console.log(assigndate);
    var data={
      mobile:localStorage.getItem('mobile'),
      admin:localStorage.getItem('adminlogin'),
      assigned_at:assigndate
    }
    console.log(data);
    await this.service.PostRequest(this.service.mainAPI+'/get_mytask',data).then(res=>{
      console.log(res);
      this.mytask = res;
      this.mytask.forEach(element => {
          if(element.assigned_to_no == this.my_no){
            element.statusopt = this.statusoption2;
          }
          if(element.assigned_by_no == this.my_no){
            element.statusopt = this.statusoption1;
          }
      });
    },err=>{
      console.log(err);
      if(err.error.text=="no data found"){
        this.notask = true;
      }
    })
  }
  getmytask(){
    this.notask = false;
    console.log(this.date);
    var month;
    var mydate = new Date((this.date)).toLocaleDateString();
    this.day = this.date;
    console.log(mydate);
    
    var sdate = mydate.split('/');
    var assigndate = String(Number(sdate[1]))+'/'+String(Number(sdate[0]))+'/'+sdate[2];
    console.log(assigndate);
    var data={
      mobile:localStorage.getItem('mobile'),
      admin:localStorage.getItem('adminlogin'),
      assigned_at:assigndate
    }
    console.log(data);
    this.service.PostRequest(this.service.mainAPI+'/get_mytask',data).then(res=>{
      console.log(res);
      this.mytask = res;
      this.mytask.forEach(element => {
          if(element.assigned_to_no == this.my_no){
            element.statusopt = this.statusoption2;
          }
          if(element.assigned_by_no == this.my_no){
            element.statusopt = this.statusoption1;
          }
      });
    },err=>{
      console.log(err);
      if(err.error.text=="no data found"){
        this.notask = true;
      }
    })
  }
  edit(i){
    this.clicked[i] = true;
  }

  save(task,i,taskstatus){
    var date = new Date();
    var getDesc=" "
    if(taskstatus!="1")
    {
      getDesc =(<HTMLInputElement>document.getElementById('desk'+i)).value
    }
    console.log("getDesc :"+getDesc+":"+taskstatus)
    if(this.status == "4"){
      var data1 = {
        taskId : task.taskId,
        taskstatus : this.status,
        completed_at: String(Date.now()),
        emp_description:getDesc
      }
    }
    else if(this.status == "3"||this.status == "2"||this.status == "5"){
    var data1 = {
      taskId : task.taskId,
      taskstatus : this.status,
      completed_at: String(task.completed_at),
      emp_description:getDesc
    }
  }
    this.service.PostRequest(this.service.mainAPI+'/update_task',data1).then(res=>{
      console.log(res);
    },err=>{
      console.log(err);
      if(err.error.text=="update successfully"){
        this.service.presentToast("Task Updated Successfully!");
        this.clicked[i] = false;
        task.taskstatus=this.status;
      }
    })
  }
  cancel(task,i){
    this.clicked[i] = false;
  }

  searchuser(searchbar) {
    console.log(searchbar);
    //this.filteredusers = ;
    var q = searchbar.target.value;
    if (q != undefined && q.trim() == '') {
      // this.getmytask();
      return this.mytask;
    }

    this.mytask = this.mytask.filter((v) => {
      console.log(v);
      if (v.message.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }else if(v.assigned_by.toLowerCase().indexOf(q.toLowerCase()) > -1){
        return true;
      }
      else if(v.assigned_to.toLowerCase().indexOf(q.toLowerCase()) > -1){
        return true;
      }
      else if(v.assigned_by_no.toLowerCase().indexOf(q.toLowerCase()) > -1){
        return true;
      }
      else if(v.assigned_to_no.toLowerCase().indexOf(q.toLowerCase()) > -1){
        return true;
      }
      else {
        return false;
      }
    })
  }
}
