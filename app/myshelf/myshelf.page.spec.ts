import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyshelfPage } from './myshelf.page';

describe('MyshelfPage', () => {
  let component: MyshelfPage;
  let fixture: ComponentFixture<MyshelfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyshelfPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyshelfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
