import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-home-conductor',
  templateUrl: './home-conductor.page.html',
  styleUrls: ['./home-conductor.page.scss'],
})
export class HomeConductorPage implements OnInit {
  username = this.route.snapshot.paramMap.get('userName');


  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}


