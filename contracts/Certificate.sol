pragma solidity ^0.5.2;

import "./Ownable.sol";

contract Certificate is Ownable {

    event eWorkSubmitted    (bool status);
    event eWorkApproved     (bool status);

    string private certificateName;

    struct Cert {
        string submission;
        uint256 timestamp;
        uint256 grade;
        bool passed;
    }

    mapping (address => Cert) private graduates;

    constructor (string memory _certificateName) public {
        certificateName = _certificateName;
    }

    function submitWork (string memory _submission) public {
        graduates[msg.sender] =
        Cert(_submission, block.timestamp, 0, false);

        emit eWorkSubmitted(true);
    }

    function approveWork (address _graduate, uint256 _grade, bool _passed) public onlyOwner {

        if (!graduates[_graduate].passed) {

            graduates[_graduate].grade  = _grade;
            graduates[_graduate].passed = _passed;

            emit eWorkApproved(true);

        } else {
            emit eWorkApproved(false);
        }
    }

    function getCertificateName() view public returns (string memory _certificateName) {
        return certificateName;
    }

    function getCertificate() view external returns (string memory submission, uint256 timestamp, uint256 grade, bool passed) {
        return (
        graduates[msg.sender].submission,
        graduates[msg.sender].timestamp,
        graduates[msg.sender].grade,
        graduates[msg.sender].passed
        );
    }
}