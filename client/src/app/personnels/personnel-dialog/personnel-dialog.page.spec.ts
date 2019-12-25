import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelDialogPage } from './personnel-dialog.page';

describe('PersonnelDialogPage', () => {
  let component: PersonnelDialogPage;
  let fixture: ComponentFixture<PersonnelDialogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelDialogPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelDialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
