'use strict';

const fetch = require('node-fetch');
const config = require('../config/config');

let summoner_base = {
    name : "",
    summonerLevel: 1,
    accountId: "",
}

class LOLController{

    async getSummoner(req, res){
        if(req.params.Summoner !== undefined){
            let summoner = req.params.Summoner

            // ===========================================
            // Get basic info by basic summoner Name
            // ===========================================
            let url  =  config.api_lol_base_url + config.api_lol_endpoint_summoner + summoner;
            let res_fetch = await fetch(url, {
                headers: {
                    "X-Riot-Token": config.api_lol_token
                }
            });
            let json = await res_fetch.json();

            summoner_base.name = json.name;
            summoner_base.summonerLevel = json.summonerLevel;
            summoner_base.accountId = json.accountId
            summoner_base.profileIconId = json.profileIconId
            

            // ===========================================
            // Get matches by summoner id
            // ===========================================
            url = config.api_lol_base_url + config.api_lol_endpoint_matches + summoner_base.accountId;
            let res_fetch_matches = await fetch(url, {
                headers: {
                    "X-Riot-Token": config.api_lol_token
                }
            });
            json = await res_fetch_matches.json();
            summoner_base.matches = json.matches.slice(0, 5);

            // ===========================================
            // Get matches details
            // ===========================================
            let matchesDetails = [];

            // Server is restricted, requests should be one by one
            url = config.api_lol_base_url + config.api_lol_endpoint_match_detail + summoner_base.matches[0].gameId;
            let response = await fetch(url, {
                headers: {
                    "X-Riot-Token": config.api_lol_token
                }
            });
            json = await response.json();
            matchesDetails.push(json);

            url = config.api_lol_base_url + config.api_lol_endpoint_match_detail + summoner_base.matches[1].gameId;
            response = await fetch(url, {
                headers: {
                    "X-Riot-Token": config.api_lol_token
                }
            });
            json = await response.json();
            matchesDetails.push(json);

            url = config.api_lol_base_url + config.api_lol_endpoint_match_detail + summoner_base.matches[2].gameId;
            response = await fetch(url, {
                headers: {
                    "X-Riot-Token": config.api_lol_token
                }
            });
            json = await response.json();
            matchesDetails.push(json);

            url = config.api_lol_base_url + config.api_lol_endpoint_match_detail + summoner_base.matches[3].gameId;
            response = await fetch(url, {
                headers: {
                    "X-Riot-Token": config.api_lol_token
                }
            });
            json = await response.json();
            matchesDetails.push(json);

            url = config.api_lol_base_url + config.api_lol_endpoint_match_detail + summoner_base.matches[4].gameId;
            response = await fetch(url, {
                headers: {
                    "X-Riot-Token": config.api_lol_token
                }
            });
            json = await response.json();
            matchesDetails.push(json);

            // Once all matches details are obtained
            let summaryMatches = []

            matchesDetails.forEach((match) => {
                // Contains all the information of an individual match
                let summaryMatch = {};
                summaryMatch.victory = false;
                summaryMatch.kills = 0;
                summaryMatch.deaths = 0;
                summaryMatch.assists = 0;
                summaryMatch.kda = 0;
                summaryMatch.allyTeam = [];
                summaryMatch.enemyTeam = [];

                const mainPlayer = match.participantIdentities.find(p => p.player.summonerName == summoner_base.name);
                const allyTeamId = match.participants.find(p => p.participantId == mainPlayer.participantId).teamId;
                
                match.participants.forEach((participant) => {
                    let player = {};

                    // Get player information
                    player.id = participant.participantId;
                    player.team = participant.teamId;
                    player.win = participant.stats.win;
                    player.kills = participant.stats.kills;
                    player.deaths = participant.stats.deaths;
                    player.assists = participant.stats.assists;
                    player.kda = ((player.kills + player.assists) / player.deaths).toFixed(2);

                    const participantInfo = match.participantIdentities.find(p => p.participantId == player.id);
                    player.name = participantInfo.player.summonerName;

                    // Classify player
                    if (player.team == allyTeamId) {
                        summaryMatch.allyTeam.push(player);
                    } else {
                        summaryMatch.enemyTeam.push(player);
                    }

                    // Complete match summary
                    if (player.id == mainPlayer.participantId) {
                        summaryMatch.victory = player.win;
                        summaryMatch.kills = player.kills;
                        summaryMatch.deaths = player.deaths;
                        summaryMatch.assists = player.assists;
                        summaryMatch.kda = player.kda;
                    }
                });

                summaryMatches.push(summaryMatch);
            });

            summoner_base.summaryMatches = summaryMatches;
            
            if(summoner_base.accountId !== undefined){
                res.status(200).send(summoner_base)
            } else {
                res.status(404).send("Error couldn't get accountID")
            }
        } else {
            res.status(404).send("That summoner doesn't exist")
        }
    }
}

const lolController = new LOLController();
module.exports = lolController;