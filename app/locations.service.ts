import { Injectable } from '@angular/core';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  options: GeolocationOptions;
  currentPos: Geoposition;
  constructor(
    private geolocation: Geolocation,
  ) { }
  getUserPosition() {
    return new Promise((resolve, reject) => {
      this.options = {
        maximumAge: 3000,
        enableHighAccuracy: true
      };

      this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {
        this.currentPos = pos;
        const location = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          time: new Date(),
        };
        console.log('loc', location);
        resolve(location);
      }, (err: PositionError) => {
        console.log("error : " + err.message);
        reject(err.message);
      });
    });
  }
}