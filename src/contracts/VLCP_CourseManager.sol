// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract VLCP_CourseManager {
    IERC20 public eduToken;
    uint256 public courseIdCounter;

    struct Course {
        uint256 id;
        address instructor;
        string title;
        string ipfsHash;
        uint256 price;
        bool isActive;
    }

    mapping(uint256 => Course) public courses;
    mapping(address => uint256[]) public enrolledCourses;

    event CourseCreated(uint256 id, address indexed instructor);
    event Enrolled(address indexed student, uint256 indexed courseId);

    constructor(address _eduToken) {
        eduToken = IERC20(_eduToken);
    }

    function createCourse(string memory title, string memory ipfsHash, uint256 price) external {
        courseIdCounter++;
        courses[courseIdCounter] = Course(courseIdCounter, msg.sender, title, ipfsHash, price, true);
        emit CourseCreated(courseIdCounter, msg.sender);
    }

    function enroll(uint256 courseId) external {
        Course storage course = courses[courseId];
        require(course.isActive, "Course inactive");

        eduToken.transferFrom(msg.sender, course.instructor, course.price);
        enrolledCourses[msg.sender].push(courseId);
        emit Enrolled(msg.sender, courseId);
    }
}
