import { TestBed } from '@angular/core/testing';
import { CharacterService } from './character.service';
describe('CharacterService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CharacterService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=character.service.spec.js.map