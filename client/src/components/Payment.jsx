import { useState } from "react";
import { useEth } from "../contexts/EthContext";

export default function Payment({
    itemName,
    cost,
    itemIndex,
    isPaymentDone,
    setIsPaymentDone,
}) {
    const { state } = useEth();
    const [isPaymentLoading, setIsPaymentLoading] = useState(false);

    const { accounts, contract, web3 } = state;

    async function handlePayment() {
        if (itemIndex === undefined || itemIndex === null) {
            console.error("No item index provided!");
            return;
        }

        try {
            setIsPaymentLoading(true);

            // Convert ETH -> Wei
            const valueInWei = web3.utils.toWei(cost.toString(), "ether");

            const paymentTx = await contract.methods
                .triggerPayment(itemIndex)
                .send({
                    from: accounts[0],
                    value: valueInWei,
                });

            console.log("Payment tx:", paymentTx);

            // Event listener
            contract.events.SupplyChainStep().on("data", async function (e) {
                console.log("Event:", e);
                const itemObj = await contract.methods
                    .items(e.returnValues._itemIndex)
                    .call();
                console.log("Item paid!", itemObj._identifier);
            });
            setIsPaymentDone(true);
        } catch (error) {
            console.error("Payment failed:", error);
        } finally {
            setIsPaymentLoading(false);
        }
    }

    return (
        <div className="container">
            <div className="badge-group">
                <p className="badge">{!isPaymentDone ? "NOT PAID" : "PAID"}</p>
            </div>
            <h2>Item Payment </h2>
            <div className="group">
                <h3 className="note">Finish payment to start delivery!</h3>
            </div>
            <div className="group">
                {!cost || !itemName ? (
                    <p className="note">
                        Please add item to the supply chain inorder to pay!
                    </p>
                ) : !isPaymentDone ? (
                    <div className="group">
                        <p className="note">
                            The Cost in ETH: {cost} for Item Name: {itemName}
                        </p>
                        <button
                            type="button"
                            onClick={handlePayment}
                            disabled={isPaymentLoading}
                        >
                            {isPaymentLoading ? "Paying..." : `Pay ${cost} ETH`}
                        </button>
                    </div>
                ) : (
                    <p className="note">
                        Payment Done. Now {itemName} could be delivered!
                    </p>
                )}
            </div>
        </div>
    );
}
