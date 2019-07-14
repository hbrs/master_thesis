pragma solidity ^0.5.8;

contract Students {

    struct Student {
        string firstname;
        string lastname;
    }

    mapping (address => Student) private students;

    function enroll (string calldata _firstname, string calldata _lastname) external returns (bool) {

        if (bytes (students [msg.sender].firstname).length == 0 && bytes (students [msg.sender].lastname).length == 0) {
            students [msg.sender] = Student (_firstname, _lastname);

            return true;
        }

        return false;
    }

    function getStudent (address _student) view external returns (string memory, string memory) {
        return (
            students [_student].firstname,
            students [_student].lastname
        );
    }
}