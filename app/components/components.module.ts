import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyComponentComponent} from '../components/my-component/my-component.component'
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [MyComponentComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  

  exports: [MyComponentComponent]
})
export class ComponentsModule { }
