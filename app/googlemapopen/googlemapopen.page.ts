import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-googlemapopen',
  templateUrl: './googlemapopen.page.html',
  styleUrls: ['./googlemapopen.page.scss'],
})
export class GooglemapopenPage implements OnInit {
  queryParams:any;
  url:any;
  constructor(public sanitizer: DomSanitizer,private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
    
      this.queryParams = params["gteMapLatLong"];
      // var data=this.queryParams.split(",");
      // let dangerousVideoUrl = 'https://www.google.com/maps/embed/v1/place?q='+this.queryParams+'&amp;key=AIzaSyDGQhzcQYbQf9E7dzGUz-R7BVp2iFeNLfI';
      // this.url=this.sanitizer.bypassSecurityTrustResourceUrl(dangerousVideoUrl);
  });

  
   }

  ngOnInit() {
  }

}
