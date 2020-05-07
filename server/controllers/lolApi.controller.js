'use strict';
const fetch = require('node-fetch');
const lolToken = 'RGAPI-18b71773-57dd-44c5-8adb-396b9082800f'
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

            // ===========================================
            // Get basic info by basic summoner Name
            // ===========================================
            let res_fetch = await fetch(url,{
                headers: {
                    "X-Riot-Token": lolToken
                }
            })
            let json = await res_fetch.json();
            summoner_base.name = json.name;
            summoner_base.summonerLevel = json.summonerLevel;
            summoner_base.accountId = json.accountId
            summoner_base.profileIconId = json.profileIconId
            

            // ===========================================
            // Get matches by summoner id
            // ===========================================
            url = "https://la1.api.riotgames.com/lol/match/v4/matchlists/by-account/"
            url = url + summoner_base.accountId
            let res_fetch_matches = await fetch(url,{
                headers: {
                    "X-Riot-Token": lolToken
                }
            })
            json = json = await res_fetch_matches.json();
            summoner_base.matches = json;

            // ===========================================
            // Get match details
            // ===========================================

            

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