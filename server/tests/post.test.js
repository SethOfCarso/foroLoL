const request = require("supertest");
const app = require("../server");

test("Get the post list", async (done) => {
    let resp = await request(app)
        .get("/api/post")
        .expect(200);

    // console.log(resp.body);
    expect(resp.body).toBeTruthy();
    expect(Array.isArray(resp.body)).toBe(true);
    done();
});

test("Insert new post", async () => {
    const info = {
        "id": 87,
        "idPost": 3676,
        "userId": 43845,
        "url" : "www.google.com",
        "title" : "el horno prueba",
        "content" : "Yo soy el aventurero",
        "postDate" : "2020-04-24T05:16:36.551+00:00",
        "tags" : ["653","6533"],
        "objPost" : [{
            "id": 3,
            "idPost": 3,
            "userId": 3,
            "url" : "www.google.com",
            "title" : "el mundo se acaba",
            "content" : "Yo soy el aventurero",
            "postDate" : "2020-04-24T05:16:36.551+00:00",
            "tags" : ["33","33"],
            "objPost" : ["32","33"]
            }
            ]
        };        

    const resp = await request(app)
        .post("/api/post")
        .send(info)
        .expect(201);

    //console.log(resp.body);
    expect(resp.body).toBeTruthy();
    expect(resp.body.content).toBe("Yo soy el aventurero");
});
