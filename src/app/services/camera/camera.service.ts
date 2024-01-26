import { Injectable } from '@angular/core';
import { Camera, CameraDirection, CameraResultType, CameraSource, Photo } from '@capacitor/camera';


export interface Picture {
    imageBase64: string;
    type: string;
    size: number;
}

@Injectable({
    providedIn: 'root',
})
export class CameraService {
    public photos: Photo[] = [];

    constructor(
        // private camera: Camera,
        // private utilService: UtilService
    ) { }

    public requestPermission(){
     return Camera.requestPermissions()
    }
    public async getPhoto(headerLabel: string = '') {
      // Take a photo
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 80,
        direction: CameraDirection.Rear,
        presentationStyle: 'fullscreen',
        promptLabelHeader: headerLabel,
        correctOrientation: true
      });

      return capturedPhoto;
    }
}
