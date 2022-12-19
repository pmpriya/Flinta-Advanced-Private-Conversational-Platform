import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MytaskPage } from './mytask.page';

describe('MytaskPage', () => {
  let component: MytaskPage;
  let fixture: ComponentFixture<MytaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MytaskPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MytaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
