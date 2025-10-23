import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotnetAngularInterviewPrepComponent } from './dotnet-angular-interview-prep.component';

describe('DotnetAngularInterviewPrepComponent', () => {
  let component: DotnetAngularInterviewPrepComponent;
  let fixture: ComponentFixture<DotnetAngularInterviewPrepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DotnetAngularInterviewPrepComponent]
    });
    fixture = TestBed.createComponent(DotnetAngularInterviewPrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
