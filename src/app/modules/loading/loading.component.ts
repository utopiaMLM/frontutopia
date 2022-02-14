import { Component, OnInit } from '@angular/core';
import { CommonsService} from 'src/app/services/commons/commons.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  providers: [CommonsService]
})
export class LoadingComponent implements OnInit {
  public loading: any;
  public constants: any;

  constructor(private readonly commonsService: CommonsService) { }

  ngOnInit(): void {
    this.constants = this.commonsService.getConstants();
    this.loading = this.constants.LABEL_LOADING_PROCESSING;
  }

}
