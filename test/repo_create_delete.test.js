const expect = require('chai').expect;
const axios = require('axios');
axios.defaults.baseURL = "https://api.github.com";
usrAuth = { auth: { username: 'test007-github', password: 'Test007@github' } };

describe('create and delete a new repo', async () => {
    it('create a new repo named playground', async () => {
        let res = await axios.post('/user/repos',
            { name: 'playground' }, usrAuth);
        expect(res.status).to.be.equal(201);
    });

    it('The new repo is created', async () => {
        let res = await axios.get('/user/repos', usrAuth);
        res = res.data;
        let repos = [];
        for (let r of res) {
            repos.push(r.name);
        }
        expect(repos).to.include('playground')

    });

    it('delete the new repo', async () => {
        let res = await axios.delete('/repos/test007-github/playground', usrAuth)
        expect(res.status).to.be.equal(204);
    });

    it('The new repo is deleted', async () => {
        setTimeout(async () => {
            let res = await axios.get('/user/repos', usrAuth)
            res = res.data;
            let repos = [];
            for (let r of res) {
                repos.push(r.name);
            }
            expect(repos).not.to.include('playground')
        }, 1000);

    });

});