import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-liberation',
  templateUrl: './how-liberation.page.html',
  styleUrls: ['./how-liberation.page.scss']
})
export class HowLiberationPage implements OnInit {
  selection:boolean = false;
  optionSelected;
  constructor() { }

  ngOnInit(): void {
  }

  changeSelection(option){

    if(option == 'proprietario'){
      this.selection = true 
      this.optionSelected = 'proprietario'
      return
    }
    if(option == 'procurador'){
      this.selection = true 
      this.optionSelected = 'procurador'
    }
  }
}
