import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GallerylistComponent } from './gallerylist.component';

describe('GallerylistComponent', () => {
  let component: GallerylistComponent;
  let fixture: ComponentFixture<GallerylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GallerylistComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GallerylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
