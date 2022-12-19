import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecentChatPage } from './recent-chat.page';

describe('RecentChatPage', () => {
  let component: RecentChatPage;
  let fixture: ComponentFixture<RecentChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecentChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
