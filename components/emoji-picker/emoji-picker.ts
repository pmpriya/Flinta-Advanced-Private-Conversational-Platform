import { Component, forwardRef,OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmojiProvider } from "../../providers/emoji/emoji";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
// import { Events } from 'ionic-angular';
import { EventsService } from "../../app/events.service";
import { ApiserviceService } from "../../app/apiservice.service";

export const EMOJI_PICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EmojiPickerComponent),
  multi: true
};

@Component({
  selector: 'emoji-picker',
  templateUrl: 'emoji-picker.html',


})
export class EmojiPickerComponent implements OnInit  {
  constructor() {}
  @Input() result = {};
  @Input() showEmojis: boolean = false;
  @Output() onEmojiSelect: EventEmitter<string> = new EventEmitter();

 emojiList = {
   smiles:[
   
    128512, 128513, 128514, 128515,128516,128517,128518,128519,128520,128521,
    128522,128523,128524,128525,128526,128527,128528,128529,128530,128531,128532,128533,
    128534,128535,128536,128537,128538,128539,128540,128541,128542,128543,128544,128545,
    128546,128547,128548,128549,128550,128551,128552,128553,128554,128555,128556,128557,
    128558,128559,128560,128561,128562,128563,128564, 128081,128082,
        128071,128072,128073,128074,128075,128076,128077,128078,128079,128080,128565,128566,128567,128568,128569,
       128570,128571,128572,128573,128574,128575,128576,128577,128578,128579,128580,128581,
       128582,128583,128584,128585,128083,128084,128085,128086,128087,128088,128089,128090,128091,128092,128093,128094,128095,
      128083,128084,128085,128086,128087,128088,128089,128090,128091,128092,128093,128094,128095,
      128102,128103	,128104	,128105	,128106,128107,128108,128109,128110,128111,128112,128113,128114,
      128115,128116,128117,128118,128119,128120,128121,128122,128123,128124,128125,128126,128127,
       128128,
      ],

      symbols:[
        128147,128148,128149,128150,128151,128152,128153,128154,128155,128156,128157,128158,128159,
           128160,128161,128162,
           128147,128148,128149,128150,128151,128152,128153,128154,128155,128156,128157,128158,128159,
       128160,128161,128162,
      ],

      objects:[
            
      128187,128188,128189,128190,128191,128192,128193,128194,128195,128196,128197,128198,128199,
       128217,128218,128219,128220,128221,128222,128223,128224,128225,128226,128227,128228,128229,
       128273,128274,128275,128276,127765,127766,127767,127768,127769,127770,127771,127772,127773,127774,127775,127776
      ],

      fruits:[
            
      127793,127794,127795,127796,127797,127799,
      127813,127814,127815,127816,127817,127818,127819,127820,127821,127822,127823,127824,
      127825,127826,127827,127828,127829,127830,127831,127832,127833,127834,127835,127836
  ]
   
  
  };
  codePoint(emojiCodePoint) {
    return String.fromCodePoint(emojiCodePoint);
  }

  onClick(reaction, index) {
    const emoji = this.emojiList[reaction][index];
    this.onEmojiSelect.emit(emoji);
  }

  ngOnInit() {}

}
