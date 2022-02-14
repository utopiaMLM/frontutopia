import { OnInit } from '@angular/core';
import {LoadingComponent} from 'src/app/modules/loading/loading.component';
import { MatDialog } from '@angular/material/dialog';

export class UtilsService implements OnInit {

  dialogRef: any;
  public email: string;

  public emailPattern: any =
  /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;

  public web = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  public facebookReg = '^(https?://)?((www.)?facebook.com)/.+$';
  public instagramReg = '^(https?://)?((www.)?instagram.com)/.+$';
  public twitterReg = '^(https?://)?((www.)?twitter.com)/.+$';
  public youtubeReg = '^(https?://)?((www.)?youtube.com|youtu.?be)/.+$';

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {

  }

  checkNumber(e: KeyboardEvent) {
    const keysPermited = [8, 9, 35, 36, 39, 46, 37, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
    if (!keysPermited.includes(e.keyCode)) {
      console.log("e.keyCode -> ",e.keyCode);
      event.preventDefault();
    }
  }

  checkNumberDecimal(e: KeyboardEvent) {
    const keysPermited = [8, 9, 35, 36, 39, 46, 37, 48, 49, 50, 51, 52, 53, 54, 55,
      56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
    if (!keysPermited.includes(e.keyCode)) {
      event.preventDefault();
    }
  }

  loading() {
    this.dialogRef = this.dialog.open(LoadingComponent, {
      disableClose: true,
      panelClass: 'mat-modal-without-background'
    });
    this.dialogRef.afterClosed().subscribe();
  }

  closeLoading() {
    this.dialogRef.close();
  }
}
