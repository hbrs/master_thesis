pragma solidity >=0.4.22 <0.6.0;

contract Person {
    
    mapping(address => string) names;

    constructor() public {}
    
    function addPerson(string memory _name) public {
        names[msg.sender] = _name;
    }

    function getPerson() external view returns (string memory _name) {
        return names[msg.sender];
    }
}
