import { useEffect, useState } from "react";
import AddItem from "./components/AddItem";
import Payment from "./components/Payment";
import { EthProvider } from "./contexts/EthContext";
import Delivery from "./components/Delivery";
import Navbar from "./components/Navbar";

function App() {
    const [itemName, setItemName] = useState("");
    const [cost, setCost] = useState(undefined);
    const [itemIndex, setItemIndex] = useState(undefined);
    const [isItemAdded, setIsItemAdded] = useState(false);
    const [isPaymentDone, setIsPaymentDone] = useState(false);
    const [isDelivered, setIsDelivered] = useState(false);

    function handleReset() {
        if (isDelivered) {
            setItemName("");
            setCost(undefined);
            setItemIndex(undefined);
            setIsPaymentDone(false);
            setIsItemAdded(false);
            setIsDelivered(false);
        }
    }

    return (
        <EthProvider>
            <Navbar />
            <section className="section">
                <h1>Supply Chain</h1>
                <AddItem
                    itemName={itemName}
                    setItemName={setItemName}
                    cost={cost}
                    setCost={setCost}
                    setItemIndex={setItemIndex}
                    isItemAdded={isItemAdded}
                    setIsItemAdded={setIsItemAdded}
                    isDelivered={isDelivered}
                    isPaymentDone={isPaymentDone}
                />
                <Payment
                    itemName={itemName}
                    cost={cost}
                    itemIndex={itemIndex}
                    isPaymentDone={isPaymentDone}
                    setIsPaymentDone={setIsPaymentDone}
                    isItemAdded={isItemAdded}
                />
                <Delivery
                    itemName={itemName}
                    cost={cost}
                    itemIndex={itemIndex}
                    isPaymentDone={isPaymentDone}
                    isItemAdded={isItemAdded}
                    isDelivered={isDelivered}
                    setIsDelivered={setIsDelivered}
                    onReset={handleReset}
                />
            </section>
        </EthProvider>
    );
}

export default App;
