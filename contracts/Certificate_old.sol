pragma solidity ^0.5.8;

import "./Ownable.sol";

contract Certificate is Ownable {

    // event eWorkSubmitted    (bool status);
    // event eWorkApproved     (bool status);

    string private certificateName;

    struct Cert {
        string  submission;
        uint256 timestamp;
        uint256 grade;
        bool    passed;
    }

    mapping (address => Cert) private graduates;

    constructor (string memory _certificateName) public {
        certificateName = _certificateName;
    }

    function submitWork (string calldata _submission) external {
        graduates[msg.sender] = Cert(_submission, block.timestamp, 0, false);
    }

    function approveWork (address _graduate, uint256 _grade, bool _passed) external onlyOwner returns (bool result) {

        if (!graduates[_graduate].passed) {

            graduates[_graduate].grade  = _grade;
            graduates[_graduate].passed = _passed;

            return true;

        } else {
            return false;
        }
    }

    function getCertificateName() view external returns (string memory _certificateName) {
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