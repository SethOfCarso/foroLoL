"use strict";

const lolToken = [{"key":"X-Riot-Token","value":"RGAPI-61575e84-bab5-4efe-8b91-2c017a32782c","type":"text"}];

class LOLController{

    async getSummoner(req, res) {
        let querySummoner = {}          // Search by name or uid
        let options = {}        // Page or limit
        let projection = "";    // Which fields are wanted
        let searchedPost = {};
    
        
        if(req.params.Summoner !== undefined){
            querySummoner = String(req.params.Summoner);
            // const docs = await Post.getPostbyidPost(querySummoner, projection, options);
            // searchedPost = JSON.parse(JSON.stringify(docs));
            const docs = {}
            res.status(200);
        }
        else{
            res.status(404);
        }
    
        res.json(searchedPost);
    }

}


const lolController = new LOLController();
module.exports = lolController;