import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GrouplistPage } from './grouplist.page';

describe('GrouplistPage', () => {
  let component: GrouplistPage;
  let fixture: ComponentFixture<GrouplistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrouplistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GrouplistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
