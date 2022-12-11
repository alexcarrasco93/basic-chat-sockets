import { TestBed } from '@angular/core/testing';

import { GraphicDataService } from './graphic-data.service';

describe('GraphicDataService', () => {
  let service: GraphicDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphicDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
