import { Component, OnInit, Input } from '@angular/core';
import { ApiLolService } from 'src/app/api-lol.service';
import { MatchSummary } from '../../MatchSummary';
import { User } from 'src/app/users/User';

@Component({
  selector: 'app-user-match',
  templateUrl: './user-match.component.html',
  styleUrls: ['./user-match.component.scss']
})
export class UserMatchComponent implements OnInit {
  @Input() match: MatchSummary;
  victory: string;

  constructor() {
    this.match = new MatchSummary();
    this.victory = '';
    this.victory = this.match.victory ? 'Victoria' : 'Derrota';
  }

  ngOnInit(): void {
  }

}
