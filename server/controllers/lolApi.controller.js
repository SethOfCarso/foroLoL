'use strict';
const fetch = require('node-fetch');
const lolToken = 'headers: {"X-Riot-Token": "RGAPI-78bfbf70-f3a8-4e20-9b22-f000a0c95d03"}'
const baseUrl = "https://la1.api.riotgames.com/lol/"; 
let summoner_base = {
    name : "",
    summonerLevel: 1,
    accountId: "",
}

class LOLController{

    async getSummoner(req, res){
        let endpoint = "summoner/v4/summoners/by-name/";

        if(req.params.Summoner !== undefined){
            let summoner = req.params.Summoner
            let url  =  baseUrl + endpoint+summoner;
            let json2send= {};
            let res_fetch = await fetch(url,{
                headers: {
                    "X-Riot-Token": "RGAPI-78bfbf70-f3a8-4e20-9b22-f000a0c95d03"
                }
            })
            let json = await res_fetch.json();
            summoner_base.name = json.name;
            summoner_base.summonerLevel = json.summonerLevel;
            summoner_base.accountId = json.accountId
            summoner_base.profileIconId = json.profileIconId
            // ==============================================
            // TODO complete lolapi
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