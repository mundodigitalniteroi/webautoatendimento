import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-shipping',
  templateUrl: './schedule-shipping.page.html',
  styleUrls: ['./schedule-shipping.page.scss'],
})
export class ScheduleShippingPage implements OnInit {
  retirada = false;
  frete = true;
  day;
  hours = ['10:00','11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',]
  hourSelected;
  constructor() { }

  ngOnInit() {
  }


}
