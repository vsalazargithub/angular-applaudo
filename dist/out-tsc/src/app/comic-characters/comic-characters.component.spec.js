import { async, TestBed } from '@angular/core/testing';
import { ComicCharactersComponent } from './comic-characters.component';
describe('ComicCharactersComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ComicCharactersComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ComicCharactersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=comic-characters.component.spec.js.map