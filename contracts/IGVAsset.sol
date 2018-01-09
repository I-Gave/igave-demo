pragma solidity 0.4.18;
import "./ERC721.sol";
import "./IGVBase.sol";
import "./SafeMath.sol";

contract IGVAsset is IGVAssetBase, ERC721 {

    /// @notice Name and symbol of the non fungible token, as defined in ERC721.
    string public name = "I Gave Asset";
    string public symbol = "I<3";

    function implementsERC721() public pure returns (bool)
    {
        return true;
    }

    function _owns(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return certificateIndexToOwner[_tokenId] == _claimant;
    }

    function _approvedFor(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return certificateIndexToApproved[_tokenId] == _claimant;
    }

    function _approve(uint256 _tokenId, address _approved) internal {
        certificateIndexToApproved[_tokenId] = _approved;
    }

    function balanceOf(address _owner) public view returns (uint256 count) {
        return ownershipTokenCount[_owner];
    }

    function transfer(
        address _to,
        uint256 _tokenId
    )
        public
    {
        // Safety check to prevent against an unexpected 0x0 default.
        require(_to != address(0));
        // You can only send your own cert.
        require(_owns(msg.sender, _tokenId));

        // Reassign ownership, clear pending approvals, emit Transfer event.
        _transfer(msg.sender, _to, _tokenId);
    }

    function approve(
        address _to,
        uint256 _tokenId
    )
        public
    {

        require(_owns(msg.sender, _tokenId));

        _approve(_tokenId, _to);

        Approval(msg.sender, _to, _tokenId);
    }
    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    )
        public
    {
        require(_approvedFor(msg.sender, _tokenId));
        require(_owns(_from, _tokenId));

        _transfer(_from, _to, _tokenId);
    }

    function totalSupply() public view returns (uint) {
        return certificates.length - 1;
    }

    function ownerOf(uint256 _tokenId)
        public
        view
        returns (address owner)
    {
        owner = certificateIndexToOwner[_tokenId];

        require(owner != address(0));
    }


    function tokensOfOwnerByIndex(address _owner, uint256 _index)
        external
        view
        returns (uint256 tokenId)
    {
        uint256 count = 0;
        for (uint256 i = 1; i <= totalSupply(); i++) {
            if (certificateIndexToOwner[i] == _owner) {
                if (count == _index) {
                    return i;
                } else {
                    count++;
                }
            }
        }
        revert();
    }
}
