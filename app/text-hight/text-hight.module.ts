import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightPipePipe } from '../TextHight/pipes/highlight-pipe.pipe';



@NgModule({
  declarations: [HighlightPipePipe],
  imports: [
    CommonModule
  ],
  exports: [HighlightPipePipe]

})
export class TextHightModule { }
