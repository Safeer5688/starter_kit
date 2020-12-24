// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0;

import "./ERC721Full.sol";

// import "./stringUtils.sol";

contract Color is ERC721Full {
    string[] public colors;
    mapping(string => bool) _colorExists;

    constructor() public ERC721Full("Color", "COLOR") {}

    function mint(string memory _color) public {
        // Require unique color
        require(!_colorExists[_color]);
        uint256 _id = colors.push(_color);
        _mint(msg.sender, _id);
        _colorExists[_color] = true;

        // Color - add it

        // Call the mint function
        // Color - track it
    }

    /* @dev Returns an array of ids of horses owned by '_from' */
    function tokensOfOwner(address _from)
        public
        view
        returns (uint256[] memory)
    {
        return _tokensOfOwner(_from);
    }
    // function fmint(string memory _color) public returns (uint256 tokenId) {
    //     // Require unique color
    //     require(!_colorExists[_color]);
    //     uint256 _id = colors.push(_color);
    //     _mint(msg.sender, _id);
    //     _colorExists[_color] = true;
    //     return _id;
    //     // Color - add it
    //     // Call the mint function
    //     // Color - track it
    // }

    // function returnOwnerOf(string memory _color)
    //     public
    // view
    // returns (address owner)
    // {
    //     require(_colorExists[_color]);
    //     address ownerAddress = ownerOf(_id);
    //     return ownerAddress;
    // }
}
