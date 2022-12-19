import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
// import { Base64 } from '@ionic-native/base64';

// import { stringify } from '@angular/compiler/src/util';
/*
  Generated class for the ImghandlerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ImghandlerProvider {
  nativepath: any;
  constructor(public filechooser: FileChooser, private filepath: FilePath, private file: File) {
  }


  /*
  
  For uploading an image to firebase storage.
 
  Called from - profilepic.ts
  Inputs - None.
  Outputs - The image url of the stored image. 
   
   */
   //priya
   fileChooserMulti(uri) {
    var promise = new Promise((resolve, reject) => {

      let self = this;

      let correctPath = uri.substr(0, uri.lastIndexOf('/') + 1);
      let currentName = uri.substring(uri.lastIndexOf('/') + 1);

      var fileName = uri.substr(uri.lastIndexOf("/") + 1);
      var fileExte = this.getFileExtension(uri);


      console.log("fileExte :" + fileExte);
      console.log("fileName :" +fileName);
      console.log("fileExte :" +fileExte);
      console.log("uri :" +uri);



      self.file.readAsDataURL(correctPath, currentName).then(result => {
        resolve({ 
          Base64: result, Type: fileExte, fileExtention: fileName, mime: fileExte, localURL: uri 
        });


      }).catch((err) => {
        reject(err);
      })

    })
    return promise;
  }
 

 

  // UploadAudioFilePath(blob) {
  //   var promise = new Promise((resolve, reject) => {
  //     var uuid = this.guid();
  //     var imageStore = this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg' + uuid);
  //     imageStore.put(blob).then((res) => {
  //       console.log("call 2 :" + res)

  //       this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg' + uuid).getDownloadURL().then(function (url) {
  //         console.log("audio file [path]: " + url);
  //         resolve(url);
  //       });

  //     }).catch((err) => {
  //       reject(err);
  //     })
  //   })
  //   return promise;

  // }
  // // Upload audio file
  // UploadAudioFile(blob) {

  //   var promise = new Promise((resolve, reject) => {
  //     var uuid = this.guid();
  //     var imageStore = this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg' + uuid);
  //     imageStore.put(blob).then((res) => {
  //       console.log("call 2 :" + res)

  //       this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg' + uuid).getDownloadURL().then(function (url) {
  //         console.log("audio file [path]: " + url);
  //         resolve(url);
  //       });

  //     }).catch((err) => {
  //       reject(err);
  //     })
  //   })

  //   return promise;

  // }



  // ImagePickerStore(blob) {
  //   var promise = new Promise((resolve, reject) => {
  //     var uuid = this.guid();
  //     var imageStore = this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg' + uuid);
  //     imageStore.put(blob).then((res) => {
  //       console.log("call 2 :" + res)

  //       this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg' + uuid).getDownloadURL().then(function (url) {
  //         console.log("log1: " + url);
  //         resolve(url);
  //       });

  //     }).catch((err) => {
  //       reject(err);
  //     })
  //   })

  //   return promise;

  // }

  // fileChoose() {

  //   var promise = new Promise((resolve, reject) => {

  //     // choose your file from the device
  //     this.filechooser.open().then(uri => {
  //       alert('uri' + JSON.stringify(uri));
  //       // get file path
  //       this.filepath.resolveNativePath(uri).then(result => {
  //         this.nativepath = result;
  //         console.log('fileChoose' + JSON.stringify(uri));

  //         console.log("File url :" + uri + " : " + result);
  //         // var fileExtension = url.substr(url.lastIndexOf('/') + 1);
  //         // var fileName = url.substr(url.lastIndexOf("/") + 1);
  //         var fileExte = this.getFileExtension(result);
  //         let filePath: string = uri;
  //         if (filePath) {
  //           console.log('fileChoose2' + JSON.stringify(uri) + " : " + JSON.stringify(filePath));

  //           this.base64.encodeFile(filePath)
  //             .then((base64File: string) => {
  //               console.log('base64File' + JSON.stringify(base64File));
  //               var imgBlob = new Blob([base64File], { type: "image/jpeg" });
  //               var uuid = this.guid();

  //               var imageStore = this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg' + uuid);
  //               imageStore.put(imgBlob).then((res) => {
  //                 console.log("call 23:" + res.downloadURL)

  //                 this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg' + uuid).getDownloadURL().then(function (url) {
  //                   console.log("log1: " + url);
  //                   resolve({ FileURL: url, Type: "image/jpeg", fileExtention: uuid + '.' + fileExte });
  //                 });

  //               }).catch((err) => {
  //                 reject(err);
  //               })
  //                 .catch((err) => {
  //                   reject(err);
  //                 })

  //             }, (err) => {
  //               alert('err' + JSON.stringify(err));
  //             });

  //           // var reader = new FileReader();
  //           // reader.readAsArrayBuffer(filePath);
  //           // reader.onloadend = (evt: any) => {
  //           //   var imgBlob = new Blob([evt.target.result], { type: resFile.type });
  //           //   var uuid = this.guid();

  //           //   var imageStore = this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg' + uuid);
  //           //   imageStore.put(imgBlob).then((res) => {
  //           //     console.log("call 23:" + res.downloadURL)

  //           //     this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg' + uuid).getDownloadURL().then(function (url) {
  //           //       console.log("log1: " + url);
  //           //       resolve({ FileURL: url, Type: resFile.type, fileExtention: uuid + '.' + fileExte });
  //           //     });

  //           //   }).catch((err) => {
  //           //     reject(err);
  //           //   })
  //           //     .catch((err) => {
  //           //       reject(err);
  //           //     })
  //           // }


  //         }
  //       })
  //         .catch(err => console.log(err));
  //     })
  //       .catch(e => alert('uri' + JSON.stringify(e)));

  //   })
  //   return promise;

  // }


  // picmsgstore() {
  //   var promise = new Promise((resolve, reject) => {

  //     this.filechooser.open().then((url) => {
  //       console.log("File url :" + url);

  //       // console.log("")
  //       (<any>window).FilePath.resolveNativePath(url, (result) => {
  //         this.nativepath = result;
  //         console.log("File url :" + url + " : " + result);
  //         // var fileExtension = url.substr(url.lastIndexOf('/') + 1);
  //         // var fileName = url.substr(url.lastIndexOf("/") + 1);
  //         var fileExte = this.getFileExtension(result);

  //         // console.log("fileName :"+fileName);
  //         (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
  //           res.file((resFile) => {
  //             console.log("-=========== :", resFile.type)

  //             var reader = new FileReader();
  //             reader.readAsArrayBuffer(resFile);
  //             reader.onloadend = (evt: any) => {
  //               var imgBlob = new Blob([evt.target.result], { type: resFile.type });
  //               var uuid = this.guid();

  //               var imageStore = this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg' + uuid);
  //               imageStore.put(imgBlob).then((res) => {
  //                 console.log("call 23:" + res.downloadURL)

  //                 this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child('picmsg' + uuid).getDownloadURL().then(function (url) {
  //                   console.log("log1: " + url);
  //                   resolve({ FileURL: url, Type: resFile.type, fileExtention: uuid + '.' + fileExte });
  //                 });

  //               }).catch((err) => {
  //                 reject(err);
  //               })
  //                 .catch((err) => {
  //                   reject(err);
  //                 })
  //             }
  //           })
  //         })
  //       })
  //     })
  //   })
  //   return promise;
  // }

  //priya
  fileChooser() {
    var promise = new Promise((resolve, reject) => {
      this.filechooser.open().then((url) => {
        console.log("File url :" + url);

        // console.log("")
        this.filepath.resolveNativePath(url)
        .then(result => {
        // (<any>window).FilePath.resolveNativePath(url, (result) => {
          this.nativepath = result;
          console.log("File url :" + url + " : " + result);
          var fileName = result.substr(result.lastIndexOf("/") + 1);
          var fileExte = this.getFileExtension(result);
          var filepath=result.substr(0, result.lastIndexOf('/') + 1);
          console.log("fileName :" + fileExte + " : " + fileName);
          console.log("fileName :" +  result,  fileExte,  fileName,  fileExte,  url );

          resolve({ FileURL: result, Type: fileExte, fileExtention: fileName, mime: fileExte, localURL: url,filepath:filepath });

        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }


  // //priya
  // filePathTobase64(filePath) {

  //   var promise = new Promise((resolve, reject) => {

  //     try {
  //       (<any>window).FilePath.resolveNativePath(filePath, (result) => {
  //         this.nativepath = result;
  //         console.log("File url :" + filePath + " : " + result);
  //         // var fileExtension = url.substr(url.lastIndexOf('/') + 1);
  //         var fileName = filePath.substr(filePath.lastIndexOf("/") + 1);
  //         var fileExte = this.getFileExtension(result);

  //         console.log("filePathTobase64 fileName :" + fileExte + " : " + fileName);
  //         (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
  //           res.file((resFile) => {
  //             console.log("filePathTobase64 -=========== 1")

  //             var reader = new FileReader();
  //             reader.readAsArrayBuffer(resFile);
  //             reader.onloadend = (evt: any) => {
  //               console.log("filePathTobase64 base64 2")

  //               var imgBlob = new Blob([evt.target.result], { type: resFile.type });
  //               var uuid = this.guid();

  //               var imageStore = this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child(fileName);
  //               imageStore.put(imgBlob).then((res) => {
  //                 console.log("filePathTobase64 call 23:" + res.downloadURL)

  //                 this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child(fileName).getDownloadURL().then(function (url) {
  //                   console.log("filePathTobase64 log1: " + url);
  //                   resolve({ FileURL: url, Type: fileExte, fileExtention: fileName, mime: resFile.type });
  //                 });

  //               }).catch((err) => {
  //                 reject(err);
  //               })
  //                 .catch((err) => {
  //                   reject(err);
  //                 })
  //             }
  //           })
  //         })
  //       })
  //     }
  //     catch (err) {
  //       console.log("upload error :" + err)
  //     }

  //   })
  //   return promise;
  // }


  // (priya)
  // picmsgstore() {
  //   var promise = new Promise((resolve, reject) => {
  //     this.filechooser.open().then((url) => {
  //       console.log("File url :" + url);

  //       // console.log("")
  //       (<any>window).FilePath.resolveNativePath(url, (result) => {
  //         this.nativepath = result;
  //         console.log("File url :" + url + " : " + result);
  //         // var fileExtension = url.substr(url.lastIndexOf('/') + 1);
  //         var fileName = url.substr(url.lastIndexOf("/") + 1);
  //         var fileExte = this.getFileExtension(result);

  //         console.log("fileName :" + fileExte + " : " + fileName);
  //         (<any>window).resolveLocalFileSystemURL(this.nativepath, (res) => {
  //           res.file((resFile) => {
  //             console.log("-=========== :", resFile.type)

  //             var reader = new FileReader();
  //             reader.readAsArrayBuffer(resFile);
  //             reader.onloadend = (evt: any) => {
  //               console.log("base64-=========== :", evt.target.result + "  :" + this.arrayBufferToBase64(evt.target.result))

  //               var imgBlob = new Blob([evt.target.result], { type: resFile.type });
  //               var uuid = this.guid();

  //               var imageStore = this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child(fileName);
  //               imageStore.put(imgBlob).then((res) => {
  //                 console.log("call 23:" + res.downloadURL)

  //                 this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child(fileName).getDownloadURL().then(function (url) {
  //                   console.log("log1: " + url);
  //                   resolve({ FileURL: url, Type: fileExte, fileExtention: fileName, mime: resFile.type });
  //                 });

  //               }).catch((err) => {
  //                 reject(err);
  //               })
  //                 .catch((err) => {
  //                   reject(err);
  //                 })
  //             }
  //           })
  //         })
  //       })
  //     })
  //   })
  //   return promise;
  // }
  arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  //priya
  getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }

  //priya
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  //25/3/
  // webFileUpload(blob,fileName,filemime,filetype) {

  //   var promise = new Promise((resolve, reject) => {
  //     // var imgBlob = new Blob([evt.target.result], { type: resFile.type });
  //     var uuid = this.guid();

  //     var imageStore = this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child(fileName);
  //     imageStore.put(blob).then((res) => {
  //       console.log("filePathTobase64 call 23:" + res.downloadURL)

  //       this.firestore.ref('/picmsgs').child(firebase.auth().currentUser.uid).child(fileName).getDownloadURL().then(function (url) {
  //         console.log("filePathTobase64 log1: " + url);
  //         resolve({ FileURL: url, Type: filetype, fileExtention: fileName, mime: filemime });
  //       });

  //     }).catch((err) => {
  //       reject(err);
  //     })
  //       .catch((err) => {
  //         reject(err);
  //       })
  //   })
  //   return promise;
  // }
}
