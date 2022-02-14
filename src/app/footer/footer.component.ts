import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PrivacypoliticsComponent} from '../modules/signup/privacypolitics/privacypolitics.component';
import {TermsandconditionsComponent} from '../modules/signup/termsandconditions/termsandconditions.component';
import {CommonsService} from 'src/app/services/commons/commons.service';
import { global } from 'src/app/constants/global';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  providers: [CommonsService]
})
export class FooterComponent implements OnInit {
  public constants: any;
  public global: any;
  public year:any;
  dialogRef: any;

  constructor(
    public dialog: MatDialog,
    private readonly commonsService: CommonsService) {
  }

  ngOnInit(): void {
    this.global = global;
    this.constants = this.commonsService.getConstants();
    this.year = new Date().getFullYear();

  }

  openTermsDialog(): void {
    const dialogRef = this.dialog.open(TermsandconditionsComponent, {
      panelClass: 'mat-modal-with-background'
    });
    dialogRef.afterClosed().subscribe();
  }

  openPoliticsDialog() {
    const dialogRef = this.dialog.open(PrivacypoliticsComponent, {
      panelClass: 'mat-modal-with-background'
    });
    dialogRef.afterClosed().subscribe();
  }


}
