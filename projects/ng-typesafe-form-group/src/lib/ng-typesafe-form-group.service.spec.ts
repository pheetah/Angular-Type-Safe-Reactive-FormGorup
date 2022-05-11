import { TestBed } from '@angular/core/testing';

import { NgTypesafeFormGroupService } from './ng-typesafe-form-group.service';

describe('NgTypesafeFormGroupService', () => {
  let service: NgTypesafeFormGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgTypesafeFormGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
