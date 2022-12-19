import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from "@angular/common";

import { EmojiPickerComponent } from './emoji-picker/emoji-picker';

@NgModule({
	declarations: [EmojiPickerComponent],
	imports: [IonicModule,CommonModule],
	exports: [EmojiPickerComponent]
})
export class ComponentsModule {}
