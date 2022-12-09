import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-voucher',
  templateUrl: './import-voucher.page.html',
  styleUrls: ['./import-voucher.page.scss']
})
export class ImportVoucherPage implements OnInit {
  check =false;
  line = false;
  constructor() { }

  ngOnInit(): void {
  }

}
