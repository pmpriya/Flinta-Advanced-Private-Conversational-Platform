import { HighlightPipePipe } from './highlight-pipe.pipe';
import {PipeTransform, Pipe} from '@angular/core';


@Pipe({
  name: 'highlight'
})

export class HighlightSearch implements PipeTransform {

  transform(value: any, args: any): any {
      if (!args) {return value;}
      var re = new RegExp(args, 'gi'); //'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
      return value.replace(re, "<mark>$&</mark>");
  }
}