import { Component, OnInit } from '@angular/core';
import { CommonsService} from 'src/app/services/commons/commons.service';
import { global } from 'src/app/constants/global';

@Component({
  selector: 'app-howitwork',
  templateUrl: './howitwork.component.html',
  styleUrls: ['./howitwork.component.css']
})
export class HowitworkComponent implements OnInit {
  public global: any;
  public constants: any;


  constructor(private readonly commonsService: CommonsService) {
  
  }

  ngOnInit(): void {
    this.global = global;
    this.constants = this.commonsService.getConstants();
  }

  

}
