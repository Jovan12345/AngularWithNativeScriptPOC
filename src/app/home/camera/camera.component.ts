import { Component } from '@angular/core';

import * as camera from "@nativescript/camera";
import { ImageSource, knownFolders, path } from '@nativescript/core';

@Component({
  selector: 'ns-camera',
  templateUrl: './camera.component.html'
})
export class CameraComponent {
  saveImage;

  takePhoto() {
    camera.requestPermissions().then(() => {
      var milliseconds = (new Date).getTime();
      camera.takePicture({ width: 400, height: 450, keepAspectRatio: true }).then(img => {
        ImageSource.fromAsset(img).then((source) => {
          let folder = knownFolders.documents();
          let fullPath = path.join(folder.path, "SaveImage" + milliseconds + ".png");
          source.saveToFile(fullPath,"png");
          this.saveImage = fullPath;
        })
      })

    })
  }

}
