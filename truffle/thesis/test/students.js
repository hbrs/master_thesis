const Students = artifacts.require ('Students');

/* The variable accounts is an array which contains ten blockchain accounts. Each account holds 100 Ether. */
contract ('Test student contract', async accounts => {

    const _default  = accounts [0];
    const student   = accounts [1];

    /* Test data. */
    const test_data = {
        first_name:  'Jone',
        last_name:   'Doe'
    };

    /* Contract references. */
    let students;

    it ('should create student contract correct', async () => {
        students = await Students.new ( { from: _default } );

        assert.ok (students);
    });

    it ('should enroll student correct', async () => {
        await students.enroll (test_data.first_name, test_data.last_name, { from: student });

        const result = await students.getStudent.call(student);

        assert.equal (
            result [0],
            test_data.first_name,
            `First name should be ${test_data.first_name}.`
        );

        assert.equal (
            result [1],
            test_data.last_name,
            `Last name should be ${test_data.last_name}.`
        );
    });
});