import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal';
import { vi } from 'vitest'; 

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit close event when closeModal is called', () => {
    
    const spy = vi.spyOn(component.close, 'emit');
    component.closeModal();
    expect(spy).toHaveBeenCalled();
  });

  it('should not show the modal if isOpen is false', () => {
    component.isOpen = false;
    fixture.detectChanges();
    const modalContainer = fixture.nativeElement.querySelector('.fixed');
    expect(modalContainer).toBeNull();
  });
});