import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    // since this is observable, clicking on user 1 or 2 will update this id bound in template.
    // We subscribe here to params observable which is stream of data we subscribe to listen to.
    // We then subscribe to it and provide a function or callback to execute our code to receive
    // the data change.
    // That is all fine but in order to better understand observables, let's build our own.
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }
}
