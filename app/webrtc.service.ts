/**
 * WebRTC service for Audio and video
 */

import { Injectable } from '@angular/core';
// import Peer from 'peerjs';
import * as Peer from 'peerjs';

const constraints: MediaStreamConstraints = { video: true, audio: false };

@Injectable({
  providedIn: 'root'
})
export class WebrtcService {
  peer: Peer;
  myStream: MediaStream;
  myEl: HTMLMediaElement;
  partnerEl: HTMLMediaElement;
  public videoValue1: boolean = false;
  stun = 'stun.l.google.com:19302';
  mediaConnection: Peer.MediaConnection;
  options: Peer.PeerJSOption;
  stunServer: RTCIceServer = {
    urls: 'stun:' + this.stun,
  };

  constructor() {

    this.options = {  // not used, by default it'll use peerjs server
      key: 'cd1ft79ro8g833di',
      debug: 3
    };
  }

  getMedia(videoCall) {
    navigator.getUserMedia({ audio: true, video: videoCall }, (stream) => {
      this.handleSuccess(stream);
    }, (error) => {
      this.handleError(error);
    });
  }

  async init(userId: string, myEl: HTMLMediaElement, partnerEl: HTMLMediaElement,videoCall) {
    this.myEl = myEl;
    this.partnerEl = partnerEl;
    try {
      this.getMedia(videoCall);
    } catch (e) {
      this.handleError(e);
    }
    await this.createPeer(userId);
  }

  async createPeer(userId: string) {
    this.peer = new Peer(userId);
    this.peer.on('open', () => {
      this.wait();
    });
  }

  call(partnerId: string) {
    console.log("partnerId "+partnerId)
    const call = this.peer.call(partnerId, this.myStream);
    call.on('stream', (stream) => {
      this.partnerEl.srcObject = stream;
    });
  }

  wait() {
    this.peer.on('call', (call) => {
      call.answer(this.myStream);
      call.on('stream', (stream) => {
        this.partnerEl.srcObject = stream;
      });
    });
  }

  handleSuccess(stream: MediaStream) {
    this.myStream = stream;
    this.myEl.srcObject = stream;
  }

  handleError(error: any) {
    if (error.name === 'ConstraintNotSatisfiedError') {
      const v = constraints.video;
      // this.errorMsg(`The resolution ${v.width.exact}x${v.height.exact} px is not supported by your device.`);
      this.errorMsg(`The resolution px is not supported by your device.`);
    } else if (error.name === 'PermissionDeniedError') {
      this.errorMsg('Permissions have not been granted to use your camera and ' +
        'microphone, you need to allow the page access to your devices in ' +
        'order for the demo to work.');
    }
    this.errorMsg(`getUserMedia error: ${error.name}`, error);
  }

  errorMsg(msg: string, error?: any) {
    console.log("errorMsg :"+msg)
    // const errorElement = document.querySelector('#errorMsg');
    // errorElement.innerHTML += `<p>${msg}</p>`;
    if (typeof error !== 'undefined') {
      console.error(error);
    }
  }

  muteVideo(videoValue1) {
    console.log("muteVideo" + videoValue1)

    if (videoValue1 == false) {
      this.myStream.getVideoTracks()[0].enabled = false;
    }
    else if (videoValue1 == true) {
      this.myStream.getVideoTracks()[0].enabled = true;
    }
  }

  hangUp() {
    this.myStream.getVideoTracks()[0].enabled = false;
    this.myStream.getAudioTracks()[0].enabled = false;


    this.myStream.getVideoTracks()[0].stop();
    this.myStream.getAudioTracks()[0].stop();
    this.peer.on('close', function () {

    })

    this.peer.disconnect();
    this.peer.destroy();

    this.peer.destroy();
    console.log("hangUp")
    // this.mediaConnection.close();
    this.peer.on('disconnect', function () {
      console.log('on close')
    })
    this.handlePeerDisconnect();
  }
  handlePeerDisconnect() {
    // manually close the peer connections
    for (let conns in this.peer.connections) {
      this.peer.connections[conns].forEach((conn, index, array) => {
        console.log(`closing ${conn.connectionId} peerConnection (${index + 1}/${array.length})`, conn.peerConnection);
        conn.peerConnection.close();

        // close it using peerjs methods
        if (conn.close)
          conn.close();
      });
    }
  }


  muteAduio(videoValue1) {

    console.log("muteAduio" + videoValue1)
    if (videoValue1 == false) {

      this.myStream.getAudioTracks()[0].enabled = false;

    }
    else if (videoValue1 == true) {

      this.myStream.getAudioTracks()[0].enabled = true;

    }
  }
}
