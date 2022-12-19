import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewphotoPage } from './viewphoto.page';

describe('ViewphotoPage', () => {
  let component: ViewphotoPage;
  let fixture: ComponentFixture<ViewphotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewphotoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewphotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
