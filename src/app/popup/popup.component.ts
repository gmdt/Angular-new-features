import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as alertify from 'alertifyjs';

import { Company } from '../model/company.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  editData!: Company;
  constructor(
    private builder: FormBuilder,
    private apiService: ApiService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {}
  companyForm = this.builder.group({
    id: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    empCount: this.builder.control('', Validators.required),
    revenue: this.builder.control(0, Validators.required),
    address: this.builder.control('', Validators.required),
    isActive: [{ value: true, disabled: true }, Validators.required],
  });
  ngOnInit(): void {
    if (this.dialogData.id) {
      this.apiService.getCompanyById(this.dialogData.id).subscribe((res) => {
        this.editData = res;
        this.companyForm.setValue({
          id: this.editData.id.toString(),
          name: this.editData.name,
          address: this.editData.address,
          isActive: this.editData.isActive,
          revenue: this.editData.revenue,
          empCount: this.editData.empCount.toString(),
        });
      });
    }
  }
  saveCompany() {
    if (this.companyForm.valid) {
      const editId = this.companyForm.getRawValue().id;
      if (!this.editData?.id) {
        this.apiService.createCompany(this.companyForm.value).subscribe({
          next: (v) => {
            console.log(v);
            alertify.success('Save company successfully');
            this.closePopup();
          },
          error: (e) => {
            console.error(e);
            alertify.error('Save company failed');
          },
        });
      } else {
        this.apiService
          .updateCompany(editId, this.companyForm.getRawValue())
          .subscribe({
            next: (v) => {
              console.log(v);
              alertify.success('Update company successfully');
              this.closePopup();
            },
            error: (e) => {
              console.error(e);
              alertify.error('Save company failed');
            },
          });
      }
    }
  }
  closePopup() {
    this.dialog.closeAll();
  }
}
