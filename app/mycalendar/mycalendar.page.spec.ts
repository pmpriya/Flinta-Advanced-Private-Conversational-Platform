import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MycalendarPage } from './mycalendar.page';

describe('MycalendarPage', () => {
  let component: MycalendarPage;
  let fixture: ComponentFixture<MycalendarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycalendarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MycalendarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
