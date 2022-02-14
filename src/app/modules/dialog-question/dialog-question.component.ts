import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommonsService} from 'src/app/services/commons/commons.service';
import { global } from 'src/app/constants/global';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-question',
  templateUrl: './dialog-question.component.html',
  styleUrls: ['./dialog-question.component.css'],
  providers: [CommonsService],
})
export class DialogQuestionComponent implements OnInit {
  constants: any;
  global: any;
  question: any;
  type: any;

  constructor(
    public dialogRef: MatDialogRef<DialogQuestionComponent>,
    private readonly commonsService: CommonsService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.getQuestion(data);
    }

    getQuestion(data) {
      this.question = data.question;
      this.type = data.type;
    }

    ngOnInit(): void {
      this.global = global;
      this.constants = this.commonsService.getConstants();
    }
    onNoClick(): void {
      this.dialogRef.close({event: 'close'});
    }
    doCreate() {
      this.dialogRef.close({event: 'accept'});
    }
    doAnul() {
      this.dialogRef.close({event: 'anul'});
    }

}
