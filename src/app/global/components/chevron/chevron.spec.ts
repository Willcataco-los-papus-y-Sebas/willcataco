import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chevron } from './chevron';

describe('Chevron', () => {
  let component: Chevron;
  let fixture: ComponentFixture<Chevron>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Chevron]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Chevron);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
