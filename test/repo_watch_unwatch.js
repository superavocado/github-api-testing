const expect = require('chai').expect;
const axios = require('axios');
axios.defaults.baseURL = "https://api.github.com";
usrAuth = { auth: { username: 'test007-github', password: 'Test007@github' } };

describe('watch and unwatch a repo', () => {
    it('watch a repo', async () => {
        let res = await axios.put('/repos/superavocado/seek-ui-testing/subscription',
            { subscribed: true, ignored: false }, usrAuth)
        expect(res.status).to.be.equal(200);
    })

    it('The repo is in the watch list', async () => {
        let res = await axios.get('/user/subscriptions', usrAuth)
        res = res.data;
        let watch_repo = [];
        for (let r of res) {
            watch_repo.push(r.name);
        }
        expect(watch_repo).to.be.include('seek-ui-testing');
    })

    it('unwatch a repo', async () => {
        let res = await axios.delete('/repos/superavocado/seek-ui-testing/subscription', usrAuth)
        expect(res.status).to.be.equal(204);
    })

    it('The repo is unwatched', async () => {
        try {
            let res = await axios.get('/repos/superavocado/seek-ui-testing/subscription', usrAuth)
        } catch (err) {

            expect(err.message).to.be.include('Request failed with status code 404');
        }

    })

})