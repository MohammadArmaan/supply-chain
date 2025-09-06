// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "./Ownable.sol";
import "./Item.sol";

contract ItemManager is Ownable {

    enum SupplyChainState{
        Created, 
        Paid, 
        Delivered
        }

    struct S_Item {
        Item _item;
        string _identifier;
        uint _itemPrice;
        ItemManager.SupplyChainState _state;
    }

    mapping(uint => S_Item) public items;
    uint itemIndex;

    event SupplyChainStep(uint _itemIndex, uint step, address _itemAddress);

    function createItem(string memory _identifier, uint _itemPrice) public onlyOwner {
        Item item = new Item(this, _itemPrice, itemIndex);
        items[itemIndex]._item = item;
        items[itemIndex]._identifier = _identifier;
        items[itemIndex]._itemPrice = _itemPrice;
        items[itemIndex]._state = SupplyChainState.Created;

        emit SupplyChainStep(itemIndex, uint(items[itemIndex]._state), address(item));

        itemIndex++;
    }

    function triggerPayment(uint _itemIndex) payable  public {
        require(items[_itemIndex]._itemPrice <= msg.value, "Only full payments accepted");
        require(items[_itemIndex]._state == SupplyChainState.Created, "Item is further in the chain");

        items[_itemIndex]._state = SupplyChainState.Paid;

        emit SupplyChainStep(itemIndex, uint(items[itemIndex]._state), address(items[_itemIndex]._item));

    }

    function triggerDelivery(uint _itemIndex) public onlyOwner {
        require(items[_itemIndex]._state == SupplyChainState.Paid, "Item is further in the chain");
        items[_itemIndex]._state = SupplyChainState.Delivered;

        emit SupplyChainStep(itemIndex, uint(items[itemIndex]._state), address(items[_itemIndex]._item));
    }

    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        (bool success, ) = _owner.call{value: balance}("");
        require(success, "Withdrawal failed");
    }

}