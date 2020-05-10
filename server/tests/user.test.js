const request = require("supertest");
const app = require("../server");

test("Get the users list", async (done) => {
    let resp = await request(app)
        .get("/api/users")
        .expect(200);

    // console.log(resp.body);
    expect(resp.body).toBeTruthy();
    expect(Array.isArray(resp.body)).toBe(true);
    done();
});

test("Insert new user", async () => {
    const info = {
        email: 'eGasparArellano@gmail.com',
        username: 'EliasGaspar',
        password: '123',
        lolAccount: 'Hillsong',
        urlImage: 'https://vignette.wikia.nocookie.net/leagueoflegendsoficial/images/e/e5/Teemo_8.jpg/revision/latest/top-crop/width/220/height/220?cb=20170326185212&path-prefix=es',
        level: 2,
        favorites: ['Post 1', 'Post 2'],
        posts: ['My post 1', 'My post 2', 'My post 3']
    };

    const resp = await request(app)
        .post("/api/users")
        .send(info)
        .expect(201);

    //console.log(resp.body);
    expect(resp.body).toBeTruthy();
    expect(resp.body.email).toBe("eGasparArellano@gmail.com");
});

