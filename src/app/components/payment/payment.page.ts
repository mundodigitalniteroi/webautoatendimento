import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss']
})
export class PaymentPage implements OnInit {
  line = false;
  checkCrlv = false;
  checkIpva = false;
  checkMulta = false;
  checkLicen = false;
  checkComp = false;
  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  takePhoto(){
    this.checkCrlv = true;
    this.checkIpva = true;
    this.checkMulta = true;
    this.checkLicen = true;
    this.checkComp = true;
  }
  goPaymentCard(){
    this.router.navigate(['/payment-card'])
  }
}
