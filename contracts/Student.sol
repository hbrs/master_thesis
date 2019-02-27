pragma solidity ^0.5.4;

contract Students {

    event eEnrolled (bool status);

    struct Student {
        string firstname;
        string lastname;
    }

    mapping (address => Student) private students;

    function enroll (string memory _firstname, string memory _lastname) public {

        if (bytes(students[msg.sender].firstname).length == 0 && bytes(students[msg.sender].lastname).length == 0) {
            students[msg.sender] =
            Student(_firstname, _lastname);

            emit eEnrolled (true);
        }
    }

    function getStudent () view external returns (string memory firstname, string memory lastname) {
        return (
        students[msg.sender].firstname,
        students[msg.sender].lastname
        );
    }
}