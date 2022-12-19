import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlightPipe'
})
export class HighlightPipePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string, search): string {
    try {
        if (text && search && text!=undefined && search!=undefined) {
            text = text.toString(); 
            search = search.trim();
            if (search.length > 0) {
                let pattern = search.trim().replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                pattern = pattern.split(' ').filter((t) => {
                    return t.length > 0;
                }).join('|');
                let regex = new RegExp(pattern, 'gi');

                text = text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
            }
        }
    }
    catch (exception) {
        console.error('error in highlight:', exception);
    }
    return text;
}
  
  

  
  
  
  
  

  
  
  
  
  
  
  
  

  
  

  
  
  
  
  
  
  
  
  
  
  
  

  
  
  

  }
