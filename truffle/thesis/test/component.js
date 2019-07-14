const Component = artifacts.require ('Component');

contract ('Test component contract', async accounts => {

    const _default  = accounts [0];
    const initiator = accounts [1];
    const developer = accounts [2];
    const supporter = accounts [3];

    /* Test data. */
    const test_data = {
        name:                   'Component',
        requirements:           '{}',
        description:            'Description',
        submission_rejected:    '1',
        submission_approved:    '2',
        status: {
            CREATED:            0,
            FUNDING:            1,
            DEVELOPING:         2,
            PENDING:            3,
            APPROVED:           4
        }
    };

    /* Contract references. */
    let contract;

    let initiator_balance_before;
    let developer_balance_before;
    let supporter_balance_before;
    let initiator_balance_before_each;
    let developer_balance_before_each;
    let supporter_balance_before_each;

    before (async () => {
        initiator_balance_before = web3.utils.fromWei (await web3.eth.getBalance (initiator), 'ether');
        developer_balance_before = web3.utils.fromWei (await web3.eth.getBalance (developer), 'ether');
        supporter_balance_before = web3.utils.fromWei (await web3.eth.getBalance (supporter), 'ether');

        console.log ('\n', ' Before balance:');
        console.log ('\t->', `Balance initiator: ${initiator_balance_before}`);
        console.log ('\t->', `Balance developer: ${developer_balance_before}`);
        console.log ('\t->', `Balance supporter: ${supporter_balance_before}`, '\n');
    });

    after (async () => {
        const initiator_balance_after = web3.utils.fromWei (await web3.eth.getBalance (initiator), 'ether');
        const developer_balance_after = web3.utils.fromWei (await web3.eth.getBalance (developer), 'ether');
        const supporter_balance_after = web3.utils.fromWei (await web3.eth.getBalance (supporter), 'ether');

        console.log (' After balance:');
        console.log ('\t->', `Balance initiator: ${initiator_balance_after} (${(initiator_balance_after - initiator_balance_before).toFixed(6)})`);
        console.log ('\t->', `Balance developer: ${developer_balance_after} (${(developer_balance_after - developer_balance_before).toFixed(6)})`);
        console.log ('\t->', `Balance supporter: ${supporter_balance_after} (${(supporter_balance_after - supporter_balance_before).toFixed(6)})`);
    });

    beforeEach (async  () => {
        initiator_balance_before_each = web3.utils.fromWei (await web3.eth.getBalance (initiator), 'ether');
        developer_balance_before_each = web3.utils.fromWei (await web3.eth.getBalance (developer), 'ether');
        supporter_balance_before_each = web3.utils.fromWei (await web3.eth.getBalance (supporter), 'ether');
    });

    afterEach (async () => {
        const initiator_balance_after_each = web3.utils.fromWei (await web3.eth.getBalance (initiator), 'ether');
        const developer_balance_after_each = web3.utils.fromWei (await web3.eth.getBalance (developer), 'ether');
        const supporter_balance_after_each = web3.utils.fromWei (await web3.eth.getBalance (supporter), 'ether');

        console.log ('\t->', `Balance initiator: ${initiator_balance_after_each} (${(initiator_balance_after_each - initiator_balance_before_each).toFixed(6)})`);
        console.log ('\t->', `Balance developer: ${developer_balance_after_each} (${(developer_balance_after_each - developer_balance_before_each).toFixed(6)})`);
        console.log ('\t->', `Balance supporter: ${supporter_balance_after_each} (${(supporter_balance_after_each - supporter_balance_before_each).toFixed(6)})`, '\n');
    });

    it ('should create component contract correct', async () => {
        contract = await Component.new (
            test_data.name,
            test_data.requirements,
            test_data.description,
            { from: initiator }
        );

        assert.ok (contract, 'Component should be set.');

        assert.equal (
            await contract.getStatus.call(),
            test_data.status.CREATED,
            `Status should be ${test_data.status.CREATED}.`
        );

        assert.equal (
            await contract.getName.call(),
            test_data.name,
            `Name should be ${test_data.name}`
        );

        assert.equal (
            await contract.getRequirements.call(),
            test_data.requirements,
            `Requirements should be ${test_data.requirements}`
        );

        assert.equal (
            await contract.getDescription.call(),
            test_data.description,
            `Description should be ${test_data.description}`
        );

        assert.equal (
            await contract.getInitiator.call(),
            initiator,
            `Initiator should be ${initiator}.`
        );

        assert.equal (
            await contract.getFund.call(),
            web3.utils.toWei ('0', 'ether'),
            'Fund should be 0 ETH.'
        );
    });

    it ('should add fund correct', async () => {
        await contract.addFund ({
            from: supporter,
            value: web3.utils.toWei ('1', 'ether')
        });

        assert.equal (
            await contract.getStatus.call(),
            test_data.status.FUNDING,
            `Status should be ${test_data.status.FUNDING}.`
        );

        assert.equal (
            await contract.getFund.call(),
            web3.utils.toWei ('1', 'ether'),
            'Fund should be 1 ETH.'
        );
    });

    it ('should register developer correct', async () => {
        await contract.registerDeveloper ({
            from: developer,
            value: web3.utils.toWei ('1', 'ether')
        });

        assert.equal (
            await contract.getStatus.call(),
            test_data.status.DEVELOPING,
            `Status should be ${test_data.status.DEVELOPING}.`
        );

        assert.equal (
            await contract.getDeveloper.call(),
            developer,
            `Developer should be ${developer}.`
        );

        assert.equal (
            await contract.getFund.call(),
            web3.utils.toWei ('2', 'ether'),
            'Fund should be 2 ETH.'
        );
    });

    it ('should submit component correct [reject]', async () => {
        await contract.submitComponent (test_data.submission_rejected, { from: developer });

        assert.equal (
            await contract.getStatus.call(),
            test_data.status.PENDING,
            `Status should be ${test_data.status.PENDING}.`
        );

        assert.equal (
            await contract.getSubmission.call(),
            test_data.submission_rejected,
            `Submission should be ${test_data.submission_rejected}.`
        );
    });

    it ('should reject component correct', async () => {
        await contract.approveComponent (false, { from: initiator });

        assert.equal (
            await contract.getStatus.call(),
            test_data.status.DEVELOPING,
            `Status should be ${test_data.status.DEVELOPING}.`
        );
    });

    it ('should submit component correct [approve]', async () => {
        await contract.submitComponent (test_data.submission_approved, { from: developer });

        assert.equal (
            await contract.getStatus.call(),
            test_data.status.PENDING,
            `Status should be ${test_data.status.PENDING}.`
        );

        assert.equal (
            await contract.getSubmission.call(),
            test_data.submission_approved,
            `Submission should be ${test_data.submission_approved}.`
        );
    });

    it ('should approve component correct', async () => {
        const developer_balance = await web3.eth.getBalance (developer);

        await contract.approveComponent (true, { from: initiator });

        assert.equal (
            await contract.getStatus.call(),
            test_data.status.APPROVED,
            `Status should be ${test_data.status.APPROVED}.`
        );

        assert.equal (
            await contract.getFund.call(),
            web3.utils.toWei ('0', 'ether'),
            'Fund should be 0 ETH.'
        );

        assert.equal (
            await web3.eth.getBalance (developer),
            parseInt (developer_balance) + parseInt (web3.utils.toWei ('2', 'ether')),
            'Balance should be +2 ETH.'
        );
    });
});