import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from '../model/company.model';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { of } from 'rxjs';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  name$ = of();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  companyData!: Company[];
  finalData!: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'empCount',
    'revenue',
    'address',
    'isActive',
    'action',
  ];
  constructor(private dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCompanyData();
  }

  openPopup(id: any) {
    const popup = this.dialog.open(PopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: { id },
    });
    popup.afterClosed().subscribe(() => this.loadCompanyData());
  }
  loadCompanyData() {
    this.apiService.getAllCompanies().subscribe((data) => {
      this.companyData = data;
      this.finalData = new MatTableDataSource<Company>(this.companyData);
      this.finalData.paginator = this.paginator;
      this.finalData.sort = this.sort;
    });
  }
  editCompany(companyId: number) {
    this.openPopup(companyId);
  }
  removeCompany(companyId: number) {
    alertify.confirm(
      'Remove Company',
      'Are you sure you want to remove this company?',
      () => {
        this.apiService.removeCompanyById(companyId).subscribe({
          next: (v) => {
            console.log(v);
            alertify.success('Remove company successfully');
            this.loadCompanyData();
          },
          error: (e) => console.log(e),
        });
      },
      () => {}
    );
  }
}
