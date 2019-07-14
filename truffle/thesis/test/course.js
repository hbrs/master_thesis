const Course = artifacts.require ('Course');

/* The variable accounts is an array which contains ten blockchain accounts. Each account holds 100 Ether. */
contract ('Test course contract', async accounts => {

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

    let university_balance_before;
    let student_balance_before;
    let university_balance_before_each;
    let student_balance_before_each;

    before (async () => {
        university_balance_before  = web3.utils.fromWei (await web3.eth.getBalance (university), 'ether');
        student_balance_before     = web3.utils.fromWei (await web3.eth.getBalance (student), 'ether');

        console.log ('\n', ' Before balance:');
        console.log ('\t->', `Balance university: ${university_balance_before}`);
        console.log ('\t->', `Balance student: ${student_balance_before}`, '\n');
    });

    after (async () => {
        const university_balance_after  = web3.utils.fromWei (await web3.eth.getBalance (university), 'ether');
        const student_balance_after     = web3.utils.fromWei (await web3.eth.getBalance (student), 'ether');

        console.log (' After balance:');
        console.log ('\t->', `Balance university: ${university_balance_after} (${(university_balance_after - university_balance_before).toFixed(6)})`);
        console.log ('\t->', `Balance student: ${student_balance_after} (${(student_balance_after - student_balance_before).toFixed(6)})`);
    });

    beforeEach (async  () => {
        university_balance_before_each = web3.utils.fromWei (await web3.eth.getBalance (university), 'ether');
        student_balance_before_each = web3.utils.fromWei (await web3.eth.getBalance (student), 'ether');
    });

    afterEach (async () => {
        const university_balance_after_each = web3.utils.fromWei (await web3.eth.getBalance (university), 'ether');
        const student_balance_after_each    = web3.utils.fromWei (await web3.eth.getBalance (student), 'ether');

        console.log ('\t->', `Balance university: ${university_balance_after_each} (${(university_balance_after_each - university_balance_before_each).toFixed(6)})`);
        console.log ('\t->', `Balance student: ${student_balance_after_each} (${(student_balance_after_each - student_balance_before_each).toFixed(6)})`, '\n');
    });

    it ('should create course contract correct', async () => {
        contract = await Course.new (
            test_data.name,
            { from: university }
        );

        assert.ok (contract, 'Object should be set.');

        assert.equal (
            await contract.getName.call(),
            test_data.name,
            `Name should be ${test_data.name}.`
        );
    });

    it ('should request certificate correct', async () => {
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