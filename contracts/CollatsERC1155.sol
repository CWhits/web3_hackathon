// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract CollatsERC1155 is ERC1155, Ownable {
    string public name;
    string public symbol;

    // Mapping from token ID to uri
    mapping(uint256 => string) public tokenURI;

    constructor() ERC1155("") {
        name = "Collats Shareables";
        symbol = "CLLS";
    }

    function mint(
        address _to,
        uint256 _id,
        uint256 _amount
    ) external onlyOwner {
        _mint(_to, _id, _amount, "");
    }

    function mintBatch(
        address _to,
        uint256[] memory _ids,
        uint256[] memory _amounts
    ) external onlyOwner {
        _mintBatch(_to, _ids, _amounts, "");
    }

    function massMint(
        address[] memory _to,
        uint256[] memory _ids,
        uint256[] memory _amounts
    ) external onlyOwner {
        require(
            _to.length == _ids.length && _to.length == _amounts.length,
            "CollatsERC1155: length mismatch"
        );

        for (uint256 i = 0; i < _to.length; ++i) {
            _mint(_to[i], _ids[i], _amounts[i], "");
        }
    }

    function massMintSameId(address[] memory _to, uint256 _id)
        external
        onlyOwner
    {
        for (uint256 i = 0; i < _to.length; ++i) {
            address receiver = _to[i];
            console.log("mint _to[i] ", receiver);
            if (!isContract(receiver)) {
                _mint(receiver, _id, 1, "");
            }
        }
    }

    function burn(uint256 _id, uint256 _amount) external {
        _burn(msg.sender, _id, _amount);
    }

    function burnBatch(uint256[] memory _ids, uint256[] memory _amounts)
        external
    {
        _burnBatch(msg.sender, _ids, _amounts);
    }

    function setURI(uint256 _id, string memory _uri) external onlyOwner {
        tokenURI[_id] = _uri;
        emit URI(_uri, _id);
    }

    function uri(uint256 _id) public view override returns (string memory) {
        return tokenURI[_id];
    }

    function isContract(address _addr) private view returns (bool) {
        return _addr.code.length > 0;
    }
}
