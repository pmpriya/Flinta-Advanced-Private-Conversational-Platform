import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddgroupmemberPage } from './addgroupmember.page';

describe('AddgroupmemberPage', () => {
  let component: AddgroupmemberPage;
  let fixture: ComponentFixture<AddgroupmemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddgroupmemberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddgroupmemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
