import { Component, OnInit } from '@angular/core';
import {AuthLoginService} from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonsService} from 'src/app/services/commons/commons.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  providers: [AuthLoginService, CommonsService]
})
export class PaymentsComponent implements OnInit {

  constants: any;

  constructor(
    private readonly commonsService: CommonsService,
    private readonly authLoginService: AuthLoginService,
    public router: Router,
    private toastr: ToastrService) { }

    ngOnInit(): void {
      this.constants = this.commonsService.getConstants();
    }

}
