const expect = require('chai').expect;
const axios = require('axios');
axios.defaults.baseURL = "https://api.github.com";

describe('search specified repos', () => {
    it('search axios', async () => {
        let res = await axios.get('/search/repositories', {
            params: {
                q: 'axios'
            }
        });
        let items = res.data.items;
        let name = []
        for (let item of items){
            name.push(item.name);
        };
        expect(name).to.include('axios');
    });
});