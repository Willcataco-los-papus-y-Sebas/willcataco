import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Streets } from './streets';

describe('Streets', () => {
  let component: Streets;
  let fixture: ComponentFixture<Streets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Streets],
    }).compileComponents();

    fixture = TestBed.createComponent(Streets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
