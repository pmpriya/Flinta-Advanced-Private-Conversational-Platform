import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  public subject = new Subject<any>();

  sendMessage(text){
    console.log("sendMessage :"+text)
  this.subject.next(text);
  }

  getMessage():Observable<any>{
  return this.subject.asObservable();
  }

}
