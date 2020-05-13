import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSearchedComponent } from './post-searched.component';

describe('PostSearchedComponent', () => {
  let component: PostSearchedComponent;
  let fixture: ComponentFixture<PostSearchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostSearchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSearchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
