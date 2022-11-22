import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { CompanyComponent } from './company.component';
const title = 'List of company';

describe('CompanyComponent', () => {
  let component: CompanyComponent;
  let fixture: ComponentFixture<CompanyComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientModule],
      declarations: [CompanyComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have an H2 tag of ' + title, () => {
    expect(
      fixture.debugElement.query(By.css('h2')).nativeElement.innerHTML
    ).toContain(title);
  });
});
