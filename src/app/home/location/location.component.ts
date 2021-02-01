import { Component } from '@angular/core';
import { registerElement } from '@nativescript/angular';

import * as geolocation from "nativescript-geolocation";
import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';

registerElement('MapView', () => MapView);

@Component({
  selector: 'ns-location',
  templateUrl: './location.component.html'
})
export class LocationComponent {
  // Las Vegas coorginates
  latitude = 36.164597;
  longitude = -115.188768;

  zoom = 12;
  padding = [40, 40, 40, 40];
  mapView: MapView;

  onMapReady = (event) => {
    this.mapView = event.object;
    var marker = new Marker();
    marker.position = Position.positionFromLatLng(this.latitude, this.longitude);
    this.mapView.addMarker(marker);
  };

  getLocationCurrent() {
    geolocation.enableLocationRequest()
      .then(() => {
        geolocation.isEnabled().then(isLocationEnabled => {
          if (!isLocationEnabled) {
            console.log('Location premissions NOT ENABLED')
          }

          geolocation.getCurrentLocation({})
            .then(res => {
              this.latitude = res.latitude;
              this.longitude = res.longitude;
              var marker = new Marker();
              marker.position = Position.positionFromLatLng(this.latitude, this.longitude);
              this.mapView.addMarker(marker);
            }, console.log)
        })
      });
  }
}
