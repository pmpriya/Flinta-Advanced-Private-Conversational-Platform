import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WebchatPage } from './webchat.page';

describe('WebchatPage', () => {
  let component: WebchatPage;
  let fixture: ComponentFixture<WebchatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebchatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WebchatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
