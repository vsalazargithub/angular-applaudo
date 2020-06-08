import { TestBed } from '@angular/core/testing';

import { CharacterComicsService } from './character-comics.service';

describe('CharacterComicsService', () => {
  let service: CharacterComicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterComicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
