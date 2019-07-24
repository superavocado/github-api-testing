const expect = require('chai').expect;
const axios = require('axios');
axios.defaults.baseURL = "https://api.github.com";

describe('user authentication', () =>{
    it('using user name and password', async () => {
        let res = await axios.get('/user/repos', {
            auth: {
                username: 'test007-github',
                password: 'XXX'
            }
        })
        expect(res.status).to.equal(200);
    })
})
