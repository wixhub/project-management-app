import { TestBed } from '@angular/core/testing';

import { RegexValidationService } from './regex-validation.service';

describe('PasswordValidationService', () => {
  let service: RegexValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegexValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
