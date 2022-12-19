import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuddychatRoomPage } from './buddychat-room.page';

describe('BuddychatRoomPage', () => {
  let component: BuddychatRoomPage;
  let fixture: ComponentFixture<BuddychatRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuddychatRoomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuddychatRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
