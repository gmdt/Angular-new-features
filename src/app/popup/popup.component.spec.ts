import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { PopupComponent } from './popup.component';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;
  const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['closeAll']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, MatDialogModule],
      declarations: [PopupComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should open dialog', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    console.log(component);
    expect(component.closePopup()).toHaveBeenCalled();
  }));
});
