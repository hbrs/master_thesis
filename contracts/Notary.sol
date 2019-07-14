pragma solidity ^0.5.8;

contract Notary {

    event eDocumentAdded (bool isAdded, bytes32 document_hash, bytes32 prev_version, address owner, uint256 timestamp);

    struct Document {
        bytes32 prev_version;
        address owner;
        uint256 timestamp;
    }

    mapping (bytes32 => Document) private documents;

    constructor () public {}

    function addDocument (bytes32 _document_hash, bytes32 prev_version) public {

        bool isAdded = false;

        if (this.getDocumentOwner (_document_hash) == address(0)) {

            documents[_document_hash] = Document(prev_version, msg.sender, block.timestamp);
            isAdded = true;
        }

        emit eDocumentAdded (
            isAdded,
            _document_hash,
            documents[_document_hash].prev_version,
            documents[_document_hash].owner,
            documents[_document_hash].timestamp
        );
    }

    // will return address(0) [0x00000] if no document is found
    function getDocumentOwner (bytes32 _document_hash) view public returns (address) {
        return documents[_document_hash].owner;
    }
}