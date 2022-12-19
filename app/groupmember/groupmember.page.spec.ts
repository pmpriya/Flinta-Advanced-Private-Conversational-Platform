import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GroupmemberPage } from './groupmember.page';

describe('GroupmemberPage', () => {
  let component: GroupmemberPage;
  let fixture: ComponentFixture<GroupmemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupmemberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GroupmemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
