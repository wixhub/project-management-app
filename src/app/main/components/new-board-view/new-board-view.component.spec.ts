import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBoardViewComponent } from './new-board-view.component';

describe('NewBoardViewComponent', () => {
  let component: NewBoardViewComponent;
  let fixture: ComponentFixture<NewBoardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBoardViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBoardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
