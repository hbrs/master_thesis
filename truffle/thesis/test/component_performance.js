const Component = artifacts.require ('Component');

contract ('Test component contract performance', async accounts => {

    const _default  = accounts [0];
    const initiator = accounts [1];
    const developer = accounts [2];
    const supporter = accounts [3];

    /* Test data. */
    const test_data = {
        name:           'Component',
        requirements:   '{}',
        description:    'Description',
        submission:     '1',
        status: {
            CREATED:    0,
            FUNDING:    1,
            DEVELOPING: 2,
            PENDING:    3,
            APPROVED:   4
        }
    };

    /* Contract references. */
    let contract;

    let hrtime_start, hrtime_end;

    before (async () => {
        console.log ('\n', ' Before...', '\n');

        contract = await Component.new (
            test_data.name,
            test_data.requirements,
            test_data.description,
            { from: initiator }
        );

        await contract.addFund ({
            from: supporter,
            value: web3.utils.toWei ('1', 'ether')
        });

        await contract.registerDeveloper ({
            from: developer,
            value: web3.utils.toWei ('1', 'ether')
        });

        await contract.submitComponent (test_data.submission, { from: developer });
    });

    afterEach (async () => {
        console.log ('\t->', `Seconds: ${hrtime_end [0]}s`);
        console.log ('\t->', `Milliseconds : ${hrtime_end [1] / 1000000}ms`);
        console.log ('\t=>', `Total: ${hrtime_end [0] + hrtime_end [1] / 1000000000}s`, '\n');
    });

    it ('should get component name correct', async () => {
        hrtime_start = process.hrtime();

        await contract.getName.call();

        hrtime_end = process.hrtime (hrtime_start);
    });

    it ('should get component requirements correct', async () => {

        hrtime_start = process.hrtime();

        await contract.getRequirements.call();

        hrtime_end = process.hrtime (hrtime_start);
    });

    it ('should get component description correct', async () => {
        hrtime_start = process.hrtime();

        await contract.getDescription.call();

        hrtime_end = process.hrtime (hrtime_start);
    });

    it ('should get component fund correct', async () => {
        hrtime_start = process.hrtime();

        await contract.getFund.call();

        hrtime_end = process.hrtime (hrtime_start);
    });

    it ('should get submission correct', async () => {
        hrtime_start = process.hrtime();

        await contract.getSubmission.call();

        hrtime_end = process.hrtime (hrtime_start);
    });

    it ('should get initiator correct', async () => {
        hrtime_start = process.hrtime();

        await contract.getInitiator.call();

        hrtime_end = process.hrtime (hrtime_start);
    });

    it ('should get developer correct', async () => {
        hrtime_start = process.hrtime();

        await contract.getDeveloper.call();

        hrtime_end = process.hrtime (hrtime_start);
    });

    it ('should get status correct', async () => {
        hrtime_start = process.hrtime();

        await contract.getStatus.call();

        hrtime_end = process.hrtime (hrtime_start);
    });
});