import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-search',
  templateUrl: './public-search.page.html',
  styleUrls: ['./public-search.page.scss']
})
export class PublicSearchPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goProcessInformation(){
    this.router.navigate(['/process-informations'])
  }
}
