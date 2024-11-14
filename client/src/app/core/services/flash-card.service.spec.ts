import { TestBed } from '@angular/core/testing';

import { FlashCardService } from './flash-card.service';

describe('FlashCardService', () => {
  let service: FlashCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
