import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GooglemapopenPage } from './googlemapopen.page';

describe('GooglemapopenPage', () => {
  let component: GooglemapopenPage;
  let fixture: ComponentFixture<GooglemapopenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GooglemapopenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GooglemapopenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
