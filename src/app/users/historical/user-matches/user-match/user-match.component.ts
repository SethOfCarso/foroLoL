import { Component, OnInit, Input } from '@angular/core';
import { MatchSummary } from '../../MatchSummary';

@Component({
  selector: 'app-user-match',
  templateUrl: './user-match.component.html',
  styleUrls: ['./user-match.component.scss']
})
export class UserMatchComponent implements OnInit {
  @Input() match: MatchSummary;
  victory: string;
  victoryClass: string;

  constructor() {
    this.match = new MatchSummary();
    this.victory = '';
  }

  ngOnInit(): void {
    this.victory = this.match.victory ? 'Victoria' : 'Derrota';
    this.victoryClass = this.match.victory ? 'match-victory' : 'match-loss';
  }

}
