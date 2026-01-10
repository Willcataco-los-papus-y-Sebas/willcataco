import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStreet } from './card-street';

describe('CardStreet', () => {
  let component: CardStreet;
  let fixture: ComponentFixture<CardStreet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardStreet],
    }).compileComponents();

    fixture = TestBed.createComponent(CardStreet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
