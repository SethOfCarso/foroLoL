import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../User';
import { ApiLolService } from 'src/app/api-lol.service';
import { UsersService } from '../../users.service';
import { MatchSummary } from '../MatchSummary';
import { SummonerInfo } from '../../SummonerInfo';

@Component({
  selector: 'app-user-matches',
  templateUrl: './user-matches.component.html',
  styleUrls: ['./user-matches.component.scss']
})
export class UserMatchesComponent implements OnInit {
  user: User;
  summonerInfo: SummonerInfo;

  constructor(private usersService: UsersService, private apiLolService: ApiLolService) {
    this.summonerInfo = new SummonerInfo();
    // Subscribe to user
    this.usersService.userSubject.subscribe((user) => {
      this.user = user;

      // Subscribe to Summoner Info
      this.apiLolService.getLolInfoByUsername(this.user.username).subscribe(
        (summonerInfo: any) => {
          this.summonerInfo = summonerInfo;
        },
        (responseError) => {
          // alert(responseError.error.msg);
        }
      );
    });
  }

  ngOnInit(): void {
  }

}
