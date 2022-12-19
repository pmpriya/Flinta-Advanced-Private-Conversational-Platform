import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FileFilterPage } from './file-filter.page';

describe('FileFilterPage', () => {
  let component: FileFilterPage;
  let fixture: ComponentFixture<FileFilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileFilterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FileFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
