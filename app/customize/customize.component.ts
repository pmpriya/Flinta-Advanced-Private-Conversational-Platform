import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ThemeSwitcherService } from '../theme-switcher.service';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.scss'],
})
export class CustomizeComponent implements OnInit {
  fonts = [];
  font:any;
  constructor(private service:ThemeSwitcherService,private modelctrl:ModalController) {

   }

  ngOnInit() { 
   }

  setfont(val){
    console.log(this.font,val);
    this.service.setfont(val);
  }
  changeClosemodal(){
    this.modelctrl.dismiss();
  }

}
