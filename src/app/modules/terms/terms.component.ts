import { Component, OnInit } from '@angular/core';
import { CommonsService} from 'src/app/services/commons/commons.service';
import { TERMS } from 'src/app/constants/terms.lang';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css'],
  providers: [CommonsService]
})
export class TermsComponent implements OnInit {
  public constants: any;
  public text: any;
  constructor(private readonly commonsService: CommonsService) { }

  ngOnInit(): void {
    this.constants = this.commonsService.getConstants();
    const lang = this.commonsService.getLang();
    this.text = TERMS[lang];

  }

}
