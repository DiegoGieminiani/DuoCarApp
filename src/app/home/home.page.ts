import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username = this.route.snapshot.paramMap.get('userName');


  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
