import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyJobsListComponent } from './my-jobs-list.component';

describe('MyJobsListComponent', () => {
  let component: MyJobsListComponent;
  let fixture: ComponentFixture<MyJobsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyJobsListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyJobsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
