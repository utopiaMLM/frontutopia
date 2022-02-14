import { Component, OnInit } from '@angular/core';
import { CommonsService} from 'src/app/services/commons/commons.service';
import { PRIVACY } from 'src/app/constants/privacy.lang';

@Component({
  selector: 'app-privacypolitics',
  templateUrl: './privacypolitics.component.html',
  styleUrls: ['./privacypolitics.component.css'],
  providers: [CommonsService]
})
export class PrivacypoliticsComponent implements OnInit {

  public constants: any;
  public text: any;

  constructor(private readonly commonsService: CommonsService) { }

  ngOnInit(): void {
    this.constants = this.commonsService.getConstants();
    const lang = this.commonsService.getLang();
    this.text = PRIVACY[lang]+PRIVACY[lang+"_EU"];
  }

}
