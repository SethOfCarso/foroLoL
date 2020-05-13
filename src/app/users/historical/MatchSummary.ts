export class MatchSummary {
    victory: boolean;
    kills: number;
    deaths: number;
    assists: number;
    kda: number;
    allyTeam: Player[] = [];
    enemyTeam: Player[] = [];

    constructor() {
        this.victory = false;
        this.kills = 0;
        this.deaths = 0;
        this.assists = 0;
        this.kda = 0;
        this.allyTeam.push(
            new Player(),
            new Player(),
            new Player(),
            new Player(),
            new Player()
        );
        this.enemyTeam.push(
            new Player(),
            new Player(),
            new Player(),
            new Player(),
            new Player()
        );
    }
}

class Player {
    id: number;
    team: number;
    win: boolean;
    kills: number;
    deaths: number;
    assists: number;
    kda: number;
    name: string;

    constructor() {
        this.id = 0;
        this.team = 0;
        this.win = false;
        this.kills = 0;
        this.deaths = 0;
        this.assists = 0;
        this.kda = 0;
        this.name = '';
    }
}
