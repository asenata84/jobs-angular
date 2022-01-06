import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesItemComponent } from './candidates-item.component';

describe('JobItemComponent', () => {
  let component: CandidatesItemComponent;
  let fixture: ComponentFixture<CandidatesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidatesItemComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
