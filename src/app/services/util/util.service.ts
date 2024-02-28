export class Util {
  static convertBase64ToFile(base64, type = 'image/jpeg') {
    const imageName = 'arquivo.jpg';
    const imageBlob = this.dataURItoBlob(base64, type);
    return new File([imageBlob], imageName, { type: type });
  }

  static dataURItoBlob(dataURI, type = 'image/jpeg') {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: type });
    return blob;
  }
}
