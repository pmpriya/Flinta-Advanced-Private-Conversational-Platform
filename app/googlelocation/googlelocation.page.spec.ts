import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GooglelocationPage } from './googlelocation.page';

describe('GooglelocationPage', () => {
  let component: GooglelocationPage;
  let fixture: ComponentFixture<GooglelocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GooglelocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GooglelocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
