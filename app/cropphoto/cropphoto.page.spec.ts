import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CropphotoPage } from './cropphoto.page';

describe('CropphotoPage', () => {
  let component: CropphotoPage;
  let fixture: ComponentFixture<CropphotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropphotoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CropphotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
