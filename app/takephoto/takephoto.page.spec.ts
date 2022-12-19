import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TakephotoPage } from './takephoto.page';

describe('TakephotoPage', () => {
  let component: TakephotoPage;
  let fixture: ComponentFixture<TakephotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakephotoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TakephotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
