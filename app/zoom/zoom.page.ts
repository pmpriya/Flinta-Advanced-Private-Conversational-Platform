/**
 * This module is loaded when the images are zoomed and show the image slides
 */

import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { IonSlides, IonSlide, NavController, NavParams, Platform, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';


@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.page.html',
  styleUrls: ['./zoom.page.scss'],
})

  /**
   * Start of the module
   */

export class ZoomPage implements OnInit {
  SrcImg: any;
  filetype: boolean = true;
  images = [];
  images1 = [];
  public options: any;
  public options1: any;
  active;
  @ViewChild('slides') slides: IonSlides;
  @ViewChild(IonSlides) slides1: IonSlides;
  imageArray: any;
  @ViewChild('slideWithNav2', { static: false }) slideWithNav2: IonSlides;

  sliderOne: any;
  sliderTwo: any;
  sliderThree: any;
  sliderOpts1 = {
    zoom: true
  };


  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  slideOptsTwo = {

    slidesPerView: 2,

    centeredSlides: true,
    spaceBetween: 40
  };
  slideOptsThree = {
    initialSlide: 0,
    slidesPerView: 3
  };
  currentIndex: any;

  /**
   * end of global variables
   */


  /**
   * move to next slide
   */

  nextSlide() {
    this.slides.slideNext();
  }

  /**
   * move to previous slide
   */

  previousSlide() {
    this.slides.slidePrev();
  }

  /**
   * Event fired after selecting the slide
   */

  onSlideChanged() {
    this.currentIndex = this.slides.getActiveIndex();
    console.log('Slide changed! Current index is', this.currentIndex);
  }
  /**
   * load module
   */

  constructor(private modelctrl: ModalController, private navParams: NavParams, private photoViewer: PhotoViewer, public activatedRoute: ActivatedRoute, public sanitizer: DomSanitizer, private platform: Platform) {


    if (this.platform.is('android') || this.platform.is('ios')) {

      this.options = {
        slidesPerView: 4
      }
    }
    else {
      this.options = {
        slidesPerView: 8
      }
    }

    this.activatedRoute.queryParams.subscribe((res) => {
      console.log(res);
      this.options1 = {
        slidesPerView: 1
      }

      if (this.navParams.get('Filesrc') != null) {
        this.SrcImg = this.navParams.get('Filesrc');

        this.filetype = false;
      }
      else {
        this.filetype = true;

        this.images1 = [];

        this.SrcImg = this.navParams.get('src');

        this.imageArray = this.navParams.get('images');
        for (var i = 0; i < this.imageArray.length; i++) {
          if (this.imageArray[i].filetype == 'image' || this.imageArray[i].filetype == 'JPG' || this.imageArray[i].filetype == 'jpg' || this.imageArray[i].filetype == 'png' || this.imageArray[i].filetype == 'PNG' || this.imageArray[i].filetype == 'JPEG' || this.imageArray[i].filetype == 'jpeg') {
            this.images1.push({
              imageurl: this.imageArray[i].message
            })
          }
        }

        console.log("this.images1 :" + JSON.stringify(this.images1))

        this.sliderTwo =
        {
          isBeginningSlide: true,
          isEndSlide: false,
          slidesItems: this.images1
        };
        console.log("imageArray : " + this.imageArray.length, this.SrcImg);


      }
    })

  }

  ionViewDidEnter() {
    this.slides1.update();
  }

  /**
   * param - zoom - in/out
   */


  async zoom(zoomIn: boolean) {
    const slider = await this.slides.getSwiper();
    const zoom = slider.zoom;
    zoomIn ? zoom.in() : zoom.out();
  }
  /**
   * showing the image - param - file
   */

  viewZoomImage(file) {
    this.photoViewer.show(file);
  }

  /**
 * Show image param - url
 */

  viewImage(url) {
    console.log("viewimahge:" + url)
    this.SrcImg = url;

  }
  /**
   * When to move to next slide
   */

  slideNext(object, slideView) {
    slideView.slideNext(500).then(() => {

      this.checkIfNavDisabled(object, slideView);
    });
    slideView.getActiveIndex().then((index: number) => {
      this.SrcImg = this.images1[index].imageurl;
    });
  }
  /**
   * When to move to previous slide
   */


  slidePrev(object, slideView) {
    slideView.slidePrev(500).then(() => {

      this.checkIfNavDisabled(object, slideView);
    });;
    slideView.getActiveIndex().then((index: number) => {
      this.SrcImg = this.images1[index].imageurl;
    });
  }


  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  /**
   * Checking if navigation is disabled
   */

  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  /**
 * Checking whether it is begining of the slide
 */

  checkisBeginning(object, slideView) {

    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  /**
 * Checking whether it is end of the file
 */

  checkisEnd(object, slideView) {

    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

  /**
 * Returning trusted url
 */


  photourl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.SrcImg);
  }

  /**
 * Close dialog
 */


  closeModal() {
    this.modelctrl.dismiss();
  }























  photourl1() {

  }

  ngOnInit() {
  }

}
