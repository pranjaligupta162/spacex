import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCompComponent } from './filter-comp.component';

describe('FilterCompComponent', () => {
  let component: FilterCompComponent;
  let fixture: ComponentFixture<FilterCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
