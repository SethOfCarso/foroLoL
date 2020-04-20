const express = require("express");
const router = express.Router();

router.route("/:SummonerName")
    .get(async (req, res) => {
        let summonerName = req.params;
        // console.log(summonerName.SummonerName);
        res.status(200).send("EL summoner name es: ", summonerName);
    })

router.route("/:SummonerName/matches")
    .get(async (req, res) => {
        let summonerName = req.params;
        // console.log(summonerName.SummonerName);
        res.status(200).send("EL summoner name es: ", summonerName);
    })

module.exports = router;


