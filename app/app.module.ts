import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Network } from '@ionic-native/network/ngx';
import { AutosizeModule } from 'ngx-autosize';
// import { IonicGestureConfig } from '../utils/IonicGestureConfig';
import { NgCalendarModule } from 'ionic2-calendar';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
// import { NetworkService } from '../providers/network/NetworkService';
import { NetworkService } from "../app/network.service";
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

import { GruopChatProvider } from "../providers/ServerDb/groupChat";
import { GruopProvider } from "../providers/ServerDb/group";
import { EmojiProvider } from '../providers/emoji/emoji';
import { LoginProvider } from "../providers/ServerDb/loginprovider";
import { BuddyChatProvider } from "../providers/ServerDb/buddyChat";
import { BuddyChatBlockProvider } from "../providers/ServerDb/buddyChatBlock"
import { BuddyRecentDBProvider } from "../providers/ServerDb/buddyRecentDB"
import { ImghandlerProvider } from "../providers/imghandler/imghandler";
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { LocationsService } from "./locations.service";
// import { ComponentsModule } from "../components/components.module";
import { GooglelocationPage } from "../app/googlelocation/googlelocation.page";
import { EventsService } from "./events.service";
import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticationService } from './services/Authentication.service';
import { IonicStorageModule } from '@ionic/storage';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
// import { AngularFireModule } from 'angularfire2';

// const config: SocketIoConfig = { url: 'http://192.168.43.73:8152', options: {} };
const socketconfig: SocketIoConfig = { url: 'http://192.168.0.127:8152', options: {} };

// const socketconfig: SocketIoConfig = { url: 'http://192.168.0.127:8152', options: {} }

import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { DoubleTapDirective } from './directives/double-tap.directive';
// import { FCM } from '@ionic-native/fcm/ngx';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { FirebaseMessagingProvider } from "../providers/firebase-messaging/firebase-messaging";
// import {config} from '../app/app.firebaseconfig';
import { Ng2SearchPipeModule } from "ng2-search-filter";
// import { HighlightPipePipe } from './TextHight/pipes/highlight-pipe.pipe';
// import { IonicSelectableModule } from 'ionic-selectable';
import { TextHightModule } from "./text-hight/text-hight.module";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { CropphotoPage } from '../app//cropphoto/cropphoto.page';
// import {ImageCropperComponent} from 'ng2-img-cropper';
// import { NotificationsService } from "./notifications.service";
import { CopyTextComponent } from "./copy-text/copy-text.component";
import { DeleterecentComponent } from "./deleterecent/deleterecent.component";
import { GallerylistComponent } from "./gallerylist/gallerylist.component";
import { GroupgallerylistComponent } from "./groupgallerylist/groupgallerylist.component";
import { GroupmenuComponent } from "./groupmenu/groupmenu.component";

@NgModule({
  declarations: [AppComponent, GooglelocationPage, DoubleTapDirective,
    CopyTextComponent,
    DeleterecentComponent,
    GallerylistComponent,
    GroupgallerylistComponent,
    GroupmenuComponent],
  entryComponents: [GooglelocationPage],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    AutosizeModule,
    TextHightModule,
    Ng2SearchPipeModule,
    NgCalendarModule,
    // IonicSelectableModule,
    HammerModule,
    // ComponentsModule,
    SocketIoModule.forRoot(socketconfig),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireMessagingModule,
    ServiceWorkerModule.register('combined-sw.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    Camera,
    DatePicker,
    Crop,
    Media,
    Base64,
    WebView,
    AndroidPermissions,
    FCM,
    FileChooser,
    NativeAudio,
    FilePath,
    Diagnostic,
    SpeechRecognition,
    LocationAccuracy,
    ImagePicker,
    InAppBrowser,
    File,
    FileOpener,
    AuthGuardService,
    AuthenticationService,
    FileTransfer,
    Geolocation,
    SQLite,
    NetworkService,
    PhotoViewer,
    NativeStorage,
    LoginProvider,
    LocationsService,
    // NotificationsService,
    EventsService,
    GruopChatProvider,
    GruopProvider,
    EmojiProvider,
    BuddyChatProvider,
    BuddyChatBlockProvider,
    BuddyRecentDBProvider,
    FirebaseMessagingProvider,
    ImghandlerProvider,
    LocalNotifications,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
