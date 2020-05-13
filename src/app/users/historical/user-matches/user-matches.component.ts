import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../User';
import { ApiLolService } from 'src/app/api-lol.service';

@Component({
  selector: 'app-user-matches',
  templateUrl: './user-matches.component.html',
  styleUrls: ['./user-matches.component.scss']
})
export class UserMatchesComponent implements OnInit {
  @Input() user: User;
  summonerInfo: any;

  constructor(private apiLolService: ApiLolService) {
    this.apiLolService.getLolInfoByUsername(this.user.username).subscribe(
      (summonerInfo: any) => {
        this.summonerInfo = summonerInfo;
      },
      (responseError) => {
        alert(responseError.error.msg);
      }
    );
   }

  ngOnInit(): void {
  }

}
