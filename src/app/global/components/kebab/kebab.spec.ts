import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KebabComponent } from './kebab';

describe('KebabComponent', () => {
    let component: KebabComponent;
    let fixture: ComponentFixture<KebabComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [KebabComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(KebabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle menu', () => {
        component.toggleMenu(new Event('click'));
        expect(component.isOpen).toBeTrue();
        component.toggleMenu(new Event('click'));
        expect(component.isOpen).toBeFalse();
    });
});
