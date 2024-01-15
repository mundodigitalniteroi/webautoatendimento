import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }
  goPublicSearch(){
    this.router.navigate(['/term-acception'])
  }
  goQuery(){
    this.router.navigate(['/query'])
  }
}
