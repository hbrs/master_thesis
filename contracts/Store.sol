pragma solidity >=0.4.22 <0.6.0;

contract Store {

    event eStored(string store);

    string private store;

    function setStore (string memory _store) public {
        store = _store;

        emit eStored (store);
    }

    function getStore () view external returns (string memory) {
        return store;
    }
}