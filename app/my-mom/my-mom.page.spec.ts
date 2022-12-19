import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyMomPage } from './my-mom.page';

describe('MyMomPage', () => {
  let component: MyMomPage;
  let fixture: ComponentFixture<MyMomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyMomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
