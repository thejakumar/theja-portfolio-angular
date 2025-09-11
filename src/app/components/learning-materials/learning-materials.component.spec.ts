import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningMaterialsComponent } from './learning-materials.component';

describe('LearningMaterialsComponent', () => {
  let component: LearningMaterialsComponent;
  let fixture: ComponentFixture<LearningMaterialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LearningMaterialsComponent]
    });
    fixture = TestBed.createComponent(LearningMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
