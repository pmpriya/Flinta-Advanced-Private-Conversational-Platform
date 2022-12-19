import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssigntaskPage } from './assigntask.page';

describe('AssigntaskPage', () => {
  let component: AssigntaskPage;
  let fixture: ComponentFixture<AssigntaskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssigntaskPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssigntaskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
