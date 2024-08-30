// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleDAO {
    struct Proposal {
        string description;
        uint256 voteCount;
        address proposer;
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(address => uint256) public tokenBalances;
    mapping(address => bool) public hasVoted;
    uint256 public proposalCount;
    uint256 public totalTokens;

    event ProposalCreated(uint256 proposalId, string description);
    event Voted(uint256 proposalId, address voter);

    constructor(uint256 initialSupply) {
        tokenBalances[msg.sender] = initialSupply;
        totalTokens = initialSupply;
    }

    function createProposal(string memory description) public {
        require(tokenBalances[msg.sender] > 0, "Only token holders can create proposals");
        proposalCount++;
        proposals[proposalCount] = Proposal(description, 0, msg.sender);
        emit ProposalCreated(proposalCount, description);
    }

    function vote(uint256 proposalId) public {
        require(tokenBalances[msg.sender] > 0, "Only token holders can vote");
        require(!hasVoted[msg.sender], "You have already voted");
        proposals[proposalId].voteCount += tokenBalances[msg.sender];
        hasVoted[msg.sender] = true;
        emit Voted(proposalId, msg.sender);
    }

    function getProposal(uint256 proposalId) public view returns (string memory description, uint256 voteCount, address proposer) {
        Proposal memory proposal = proposals[proposalId];
        return (proposal.description, proposal.voteCount, proposal.proposer);
    }
}
