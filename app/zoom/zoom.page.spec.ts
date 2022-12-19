import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ZoomPage } from './zoom.page';

describe('ZoomPage', () => {
  let component: ZoomPage;
  let fixture: ComponentFixture<ZoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ZoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
