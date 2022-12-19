import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomController } from '@ionic/angular';

interface Theme {
  name: string;
  styles: ThemeStyle[];
}

interface ThemeStyle {
  themeVariable: string;
  value: string;
}

interface fonts {
  name: string;
  styles: FontStyle[];
}

interface FontStyle {
  fontVariable: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitcherService {

  public DayColorCode="#7A62FE";
  private themes: Theme[] = [];
  private fonts: fonts[] = [];
  private currentTheme: number = 0;

  constructor(private domCtrl: DomController, @Inject(DOCUMENT) private document) { 
    this.fonts = [
      {
        name:'inherit',
        styles:[
          {fontVariable:'--ion-font-family',value:'inherit'}
        ]
      },
      {
      name:'CaviarDreams',
      styles:[
        {fontVariable:'--ion-font-family',value:'CaviarDreams'}
      ]
    },{
      name:'Ostrich',
      styles:[
        {fontVariable:'--ion-font-family',value:'Ostrich'}
      ]
    },{
      name:'Josefinsans',
      styles:[
        {fontVariable:'--ion-font-family',value:'Josefinsans'}
      ]
    },{
      name:'Pacifico',
      styles:[
        {fontVariable:'--ion-font-family',value:'Pacifico'}
      ]
    }
  ]
    if(localStorage.getItem("DayColorCode")!=null){
      this.DayColorCode= localStorage.getItem("DayColorCode")
      this.themes = [
        {
          name: 'day',
          styles: [
            { themeVariable: '--ion-color-base', value: this.DayColorCode},
            { themeVariable: '--ion-background-color', value: '#fff'},
            { themeVariable: '--ion-toolbar-background', value: this.DayColorCode},
            { themeVariable: '--ion-toolbar-color', value: '#fff'},
            { themeVariable: '--ion-tab-bar-background', value: this.DayColorCode},
            { themeVariable: '--ion-tab-bar-color', value: '#fff'},
            { themeVariable: '--ion-tab-bar-color-selected', value: '#62f9f2'},   
            { themeVariable: '--ion-item-color', value: '#000'},   
            { themeVariable: '--ion-text-color', value: '#000'}, 
            { themeVariable: '--ion-color-step-850', value: '#000'}, 
            { themeVariable: '--ion-mlstn-titrow-bg', value: 'lightgrey'}, 
            { themeVariable: '--ion-mlstn-body-bg', value: '#f1f1f1'},
            { themeVariable: '--ion-col-text', value: '#000'},
            { themeVariable: '--ion-card-bgcolor', value: '#85dcff'},
            { themeVariable: '--ion-card-text-color', value: '#000'},
            { themeVariable: '--ion-card-title-color', value: '#000'},
            { themeVariable: '--ion-card-input', value: 'darkblue'},
            { themeVariable: '--ion-color-secondary', value: '#3dc2ff'},
            { themeVariable: '--ion-color-secondary-contrast', value: '#fff'},
            { themeVariable: '--ion-chatbbl-right-bgcolor', value: '#fffedb'},
            { themeVariable: '--ion-chatbbl-left-bgcolor', value: 'white'},
            { themeVariable: '--ion-chat-bg', value: '../../assets/imgs/chatBackground.png'},
            { themeVariable: '--ion-border-color', value: 'gray'},
  
  
          ]
        },
        {
          name: 'night',
          styles: [
            { themeVariable: '--ion-color-base', value: '#333333 !important'},
            { themeVariable: '--ion-background-color', value: '#333333'},
            { themeVariable: '--ion-toolbar-background', value: '#000000'},
            { themeVariable: '--ion-toolbar-color', value: '#fff'},
            { themeVariable: '--ion-tab-bar-background', value: '#000000'},
            { themeVariable: '--ion-tab-bar-color', value: '#fff'},
            { themeVariable: '--ion-tab-bar-color-selected', value: '#55ff81'},    
            { themeVariable: '--ion-item-color', value: '#fff'},
            { themeVariable: '--ion-text-color', value: '#fff'}, 
            { themeVariable: '--ion-color-step-850', value: '#fff'}, 
            { themeVariable: '--ion-mlstn-titrow-bg', value: '#101010'}, 
            { themeVariable: '--ion-mlstn-body-bg', value: '#666666'},
            { themeVariable: '--ion-col-text', value: '#fff'},
            { themeVariable: '--ion-card-bgcolor', value: '#b9b9b9'},
            { themeVariable: '--ion-card-text-color', value: '#000'},
            { themeVariable: '--ion-card-title-color', value: '#000'},
            { themeVariable: '--ion-card-input', value: '#000'},
            { themeVariable: '--ion-color-secondary', value: '#b9b9b9'},
            { themeVariable: '--ion-color-secondary-contrast', value: '#000'},
            { themeVariable: '--ion-chatbbl-right-bgcolor', value: '#85dcff'},
            { themeVariable: '--ion-chatbbl-left-bgcolor', value: '#b9b9b9'},
            { themeVariable: '--ion-chat-bg', value: '../../assets/imgs/chatbg1.jpg'},
            { themeVariable: '--ion-border-color', value: 'white'},
          ]
        }
      ]
    }
    else{
      this.themes = [
        {
          name: 'day',
          styles: [
            { themeVariable: '--ion-color-base', value: this.DayColorCode},
            { themeVariable: '--ion-background-color', value: '#fff'},
            { themeVariable: '--ion-toolbar-background', value: this.DayColorCode},
            { themeVariable: '--ion-toolbar-color', value: '#fff'},
            { themeVariable: '--ion-tab-bar-background', value: this.DayColorCode},
            { themeVariable: '--ion-tab-bar-color', value: '#fff'},
            { themeVariable: '--ion-tab-bar-color-selected', value: '#62f9f2'},   
            { themeVariable: '--ion-item-color', value: '#000'},   
            { themeVariable: '--ion-text-color', value: '#000'}, 
            { themeVariable: '--ion-color-step-850', value: '#000'}, 
            { themeVariable: '--ion-mlstn-titrow-bg', value: 'lightgrey'}, 
            { themeVariable: '--ion-mlstn-body-bg', value: '#f1f1f1'},
            { themeVariable: '--ion-col-text', value: '#000'},
            { themeVariable: '--ion-card-bgcolor', value: '#85dcff'},
            { themeVariable: '--ion-card-text-color', value: '#000'},
            { themeVariable: '--ion-card-title-color', value: '#000'},
            { themeVariable: '--ion-card-input', value: 'darkblue'},
            { themeVariable: '--ion-color-secondary', value: '#3dc2ff'},
            { themeVariable: '--ion-color-secondary-contrast', value: '#fff'},
            { themeVariable: '--ion-chatbbl-right-bgcolor', value: '#fffedb'},
            { themeVariable: '--ion-chatbbl-left-bgcolor', value: 'white'},
            { themeVariable: '--ion-chat-bg', value: '../../assets/imgs/chatBackground.png'},
            { themeVariable: '--ion-border-color', value: 'gray'},
  
  
          ]
        },
        {
          name: 'night',
          styles: [
            { themeVariable: '--ion-color-base', value: '#333333 !important'},
            { themeVariable: '--ion-background-color', value: '#333333'},
            { themeVariable: '--ion-toolbar-background', value: '#000000'},
            { themeVariable: '--ion-toolbar-color', value: '#fff'},
            { themeVariable: '--ion-tab-bar-background', value: '#000000'},
            { themeVariable: '--ion-tab-bar-color', value: '#fff'},
            { themeVariable: '--ion-tab-bar-color-selected', value: '#55ff81'},    
            { themeVariable: '--ion-item-color', value: '#fff'},
            { themeVariable: '--ion-text-color', value: '#fff'}, 
            { themeVariable: '--ion-color-step-850', value: '#fff'}, 
            { themeVariable: '--ion-mlstn-titrow-bg', value: '#101010'}, 
            { themeVariable: '--ion-mlstn-body-bg', value: '#666666'},
            { themeVariable: '--ion-col-text', value: '#fff'},
            { themeVariable: '--ion-card-bgcolor', value: '#b9b9b9'},
            { themeVariable: '--ion-card-text-color', value: '#000'},
            { themeVariable: '--ion-card-title-color', value: '#000'},
            { themeVariable: '--ion-card-input', value: '#000'},
            { themeVariable: '--ion-color-secondary', value: '#b9b9b9'},
            { themeVariable: '--ion-color-secondary-contrast', value: '#000'},
            { themeVariable: '--ion-chatbbl-right-bgcolor', value: '#85dcff'},
            { themeVariable: '--ion-chatbbl-left-bgcolor', value: '#b9b9b9'},
            { themeVariable: '--ion-chat-bg', value: '../../assets/imgs/chatbg1.jpg'},
            { themeVariable: '--ion-border-color', value: 'white'},
          ]
        }
      ]
    }

   

  }

  cycleTheme(): void {

    if(this.themes.length > this.currentTheme + 1){
      this.currentTheme++;
    } else {
      this.currentTheme = 0;
    }

    this.setTheme(this.themes[this.currentTheme].name);

  }

  setTheme(name): void {

    let theme = this.themes.find(theme => theme.name === name);
    this.domCtrl.write(() => {

      theme.styles.forEach(style => {
        document.documentElement.style.setProperty(style.themeVariable, style.value);
      });

    });

  }

  setfont(name):void{
    let font = this.fonts.find(font => font.name === name);
    this.domCtrl.write(() => {

      font.styles.forEach(style => {
        document.documentElement.style.setProperty(style.fontVariable, style.value);
      });

    });
  }


}