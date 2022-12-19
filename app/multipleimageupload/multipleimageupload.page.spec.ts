import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MultipleimageuploadPage } from './multipleimageupload.page';

describe('MultipleimageuploadPage', () => {
  let component: MultipleimageuploadPage;
  let fixture: ComponentFixture<MultipleimageuploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleimageuploadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MultipleimageuploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
