import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController, NavParams, Platform } from '@ionic/angular';
// import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;
import { LocationsService } from "../locations.service";
import { Geolocation, Geoposition, GeolocationOptions } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-googlelocation',
  templateUrl: './googlelocation.page.html',
  styleUrls: ['./googlelocation.page.scss'],
})
export class GooglelocationPage implements OnInit {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  currlatLng: any;
  currlatLongng: any;
  screen: any;
  locationValue: any;
  //
  buddyid: any;
  buddyname: any;
  Ttitle: any;
  public watch: any;
  locations: any;
  myTimerInterval: any;
  myArray = [];
  constructor(private socket: Socket, private locationAccuracy: LocationAccuracy, private geolocation: Geolocation, private platform: Platform, private locationsService: LocationsService, private modalController: ModalController, private navParams: NavParams) {
    console.log("loadmap constructor" + this.navParams.get("buddyname") + ":" + this.navParams.get("buddy"))
    this.Receive();
    if (this.navParams.get("buddy") != null) {
      this.buddyid = this.navParams.get("buddy")
      this.buddyname = this.navParams.get("buddyname")
      console.log("loading:" + this.buddyid)

    }


  }
  Receive() {

    // Socket receiving method 
    this.socket.on('live_location', (msg) => {
      console.log("live_location:" + JSON.stringify(msg) + ":" + this.buddyid)
      if ( msg.sender == this.buddyid) { // Mine
        // this.loadMap(msg.lat + "," + msg.lng, this.navParams.get("buddyname") + " live location");

        this.myArray = [];

          var self = this;
          this.myTimerInterval = setInterval(function () {
            var options = {
              maximumAge: 3000,
              enableHighAccuracy: true
            };
    
            self.locationAccuracy.request(self.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
              () => {
                // When GPS Turned ON call method to get Accurate location coordinates
                self.geolocation.getCurrentPosition().then((pos) => {
    
                  var location = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                    text: "Your Location"
                  };
                  self.myArray.push(location)
                  console.log('live_location sharing..', location);
    
                  self.loadlivelocation(msg.lat, msg.lng, self.navParams.get("buddyname") + " live location")

    
                }, (err: PositionError) => {
                  console.log("getCurrentPosition error : " + err.message);
                });
    
              },
              error => console.log(" getCurrentPosition Error:" + error)
            );
    
          }, 20000); //300000
    

      }
      // else if (msg.type == "2" && msg.uid == this.buddyid) { //frined
      //   this.loadMap(msg.lat + "," + msg.lng, this.navParams.get("buddyname") + " live location");
      // }
    })
  }

  ngOnInit() {

  


  }
  loadlivelocation(buddy_lat, buddy_long, buddyname) {

    var wfhlat = buddy_lat
    var wfhlang = buddy_long

    var mainarray = [];

    var arrayTemp = [];
    arrayTemp.push(buddyname);
    arrayTemp.push(wfhlat);
    arrayTemp.push(wfhlang);

    mainarray.push(arrayTemp);

    var arrayTemp = [];
    console.log("this.myArray :"+JSON.stringify(this.myArray))
    arrayTemp.push(this.myArray[0].text);
    arrayTemp.push(this.myArray[0].lat);
    arrayTemp.push(this.myArray[0].lng);
  
    mainarray.push(arrayTemp);


    this.locations = mainarray;

    console.log("befreo 1:" + JSON.stringify(mainarray))
    // if you have your locations hard-coded, else just make sure it's accessible

    const myLatlng = new google.maps.LatLng(40.748817, -73.985428);
    const mapOptions = {
      zoom: 13,
      center: myLatlng,
      scrollwheel: false

    };
    var infowindow = new google.maps.InfoWindow();

    // this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: new google.maps.LatLng(13.030628, 80.2357803),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // loop through each object of your locations array

    for (var i = 0; i < this.locations.length; i++) {

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.locations[i][1], this.locations[i][2]),
        map: this.map
      });

      google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
          infowindow.setContent(mainarray[i][0]);
          infowindow.open(this.map, marker);
        }
      })(marker, i));
    }


  }
  ngAfterViewInit() {
    if (this.navParams.get("locationValue") != "undefined" && this.navParams.get("locationValue") != null && this.navParams.get("locationValue") != "") {
      this.locationValue = true;
      this.loadMap(0, this.buddyname + " live location");
      console.log("this.buddyname :" + this.buddyname)
      this.Ttitle = this.buddyname + " live location"
    }
    else {
      this.locationValue = false;
      this.Ttitle = "Your  location"

      this.loadMap(0, "Your location");
    }

    console.log("locationValue :" + this.locationValue)

  }

  loadMap(value, txt) {

    console.log("loadmap:" + value + ":" + txt)
    let latLng = null;

    if (value != "0") {

      latLng = new google.maps.LatLng(value);
    }
    else {
      latLng = new google.maps.LatLng("-34.9290, 138.6010");
    }
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      animation: google.maps.Animation.DROP,
      // position: map.getCenter()
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);




    this.locationsService.getUserPosition().then(res => {
      console.log("get value:" + JSON.stringify(res))

      let latLng = new google.maps.LatLng(res["lat"], res["lng"]);
      this.map.setCenter(latLng);
      this.map.setZoom(16);
      this.addMarker(this.map, txt);
      this.currlatLng = res["lat"];
      this.currlatLongng = res["lng"];



    }).catch((error) => {
      console.log('Error getting location', error);
    });


  }

  addMarker(map: any, txt) {

    let marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: map.getCenter()
    });

    let content = "<h4>" + txt + "!</h4>";

    this.addInfoWindow(marker, content);



  }
  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }


  sendLocation() {

    this.modalController.dismiss(
      {
        currlatLng: this.currlatLng,
        currlatLongng: this.currlatLongng,
        live: false
      });

  }
  sendLiveLocation() {

    this.modalController.dismiss(
      {
        currlatLng: this.currlatLng,
        currlatLongng: this.currlatLongng,
        live: true
      });


  }

  async closeModal() {
    await this.modalController.dismiss({ "flag": "0" });
  }
}
