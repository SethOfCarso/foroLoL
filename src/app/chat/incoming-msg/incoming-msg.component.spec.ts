import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingMsgComponent } from './incoming-msg.component';

describe('IncomingMsgComponent', () => {
  let component: IncomingMsgComponent;
  let fixture: ComponentFixture<IncomingMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
