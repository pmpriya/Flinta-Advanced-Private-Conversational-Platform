import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProjectMilestonePage } from './project-milestone.page';

describe('ProjectMilestonePage', () => {
  let component: ProjectMilestonePage;
  let fixture: ComponentFixture<ProjectMilestonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectMilestonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectMilestonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
