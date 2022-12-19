import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupcreationPage } from './groupcreation.page';

describe('GroupcreationPage', () => {
  let component: GroupcreationPage;
  let fixture: ComponentFixture<GroupcreationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupcreationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupcreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
