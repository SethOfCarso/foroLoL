import { MatchSummary } from './historical/MatchSummary';

export class SummonerInfo {
    name: string;
    summonerLevel: number;
    accountId: string;
    profileIconId: number;
    summaryMatches: MatchSummary[];

    constructor() {
        this.name = '';
        this.summonerLevel = 0;
        this.accountId = '';
        this.profileIconId = 0;
        this.summaryMatches = [
            new MatchSummary(),
            new MatchSummary(),
            new MatchSummary(),
            new MatchSummary(),
            new MatchSummary()
        ];
    }
}
