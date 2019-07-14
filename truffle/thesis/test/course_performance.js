const Course = artifacts.require ('Course');

/* The variable accounts is an array which contains ten blockchain accounts. Each account holds 100 Ether. */
contract ('Test course contract performance', async accounts => {

    const _default      = accounts [0];
    const university    = accounts [1];
    const student       = accounts [2];
    const validator     = accounts [3];

    /* Test data. */
    const test_data = {
        name: 'Course',
        submission: 'id',
        status: {
            REQUESTED: 0,
            ACCEPTED: 1
        }
    };

    /* Contract references. */
    let contract;

    let hrtime_start, hrtime_end;

    before (async () => {
        contract = await Course.new (
            test_data.name,
            { from: university }
        );

        await contract.certificateRequest (test_data.submission, { from: student });
        await contract.certificateApprove (student, { from: university });
    });

    afterEach (async () => {
        console.log ('\t->', `Seconds: ${hrtime_end [0]}s`);
        console.log ('\t->', `Milliseconds : ${hrtime_end [1] / 1000000}ms`);
        console.log ('\t=>', `Total: ${hrtime_end [0] + hrtime_end [1] / 1000000000}s`, '\n');
    });

    it ('should get course name correct', async () => {
        await contract.certificateRequest (test_data.submission, { from: student });

        const certificate = await contract.getCertificate.call (student);

        assert.equal (
            certificate [0],
            test_data.submission,
            `Submission should be state ${test_data.submission}.`
        );

        assert.equal (
            certificate [3],
            test_data.status.REQUESTED,
            `Status should be ${test_data.status.REQUESTED}.`
        );

        assert.equal (
            certificate [2],
            0,
            `Issued should be unset.`
        );
    });

    it ('should approve certificate correct', async () => {
        const approved = await contract.certificateApprove (student, { from: university });

        assert.ok (approved, 'Function should return true.');
    });

    it ('should validate certificate correct', async () => {
        const certificate = await contract.getCertificate.call (student, { from: validator });

        assert.equal (
            certificate [0],
            test_data.submission,
            `Submission should be state ${test_data.submission}.`
        );

        assert.equal (
            certificate [3],
            test_data.status.ACCEPTED,
            `Status should be ${test_data.status.ACCEPTED}.`
        );
    });
});