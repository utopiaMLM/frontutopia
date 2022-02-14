import { Component, OnInit } from '@angular/core';
import { CommonsService} from 'src/app/services/commons/commons.service';

@Component({
  selector: 'app-recoverysuccess',
  templateUrl: './recoverysuccess.component.html',
  styleUrls: ['./recoverysuccess.component.css'],
  providers: [CommonsService]
})
export class RecoverysuccessComponent implements OnInit {
  public constants: any;
  constructor(private readonly commonsService: CommonsService) { }

  ngOnInit(): void {
    this.constants = this.commonsService.getConstants();
  }

}
