const assert = require('assert');
const ccm = import('https://ccmjs.github.io/ccm/versions/ccm-18.6.8.min.js');

const config = {
    metamask: false,
    uri: 'https://vm-2d05.inf.h-brs.de/geth1',
    user: 'admin',
    password: '6c854D9a'
};

( async () => {

    const web3 = await ccm.start("../web3/ccm.web3.js", config);

    describe('ccm.web3.js', function() {
        describe('isConnected()', function() {
            it('should return true', function() {
                console.log(web3.isConnected());
                assert.equal(web3.isConnected(), true);
            });
        });
    });

})();