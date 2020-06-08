import { TestBed } from '@angular/core/testing';
import { ComicStoriesService } from './comic-stories.service';
describe('ComicStoriesService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ComicStoriesService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=comic-stories.service.spec.js.map