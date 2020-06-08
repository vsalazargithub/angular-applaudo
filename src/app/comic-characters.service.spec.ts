import { TestBed } from '@angular/core/testing';

import { ComicCharactersService } from './comic-characters.service';

describe('ComicCharactersService', () => {
  let service: ComicCharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComicCharactersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
