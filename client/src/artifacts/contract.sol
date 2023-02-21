//SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract File_Change {
    string private time;
    string private longitude;
    string private latitude;
    
    function setInfo(string memory _time, string memory _latitude, string memory _longitude) public {
        time = _time;
        longitude = _longitude;
        latitude = _latitude;
    }

    function getInfo() public view returns (string memory, string memory, string memory) {
        return (time, longitude, latitude);
    }
}