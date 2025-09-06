import { useState } from "react";
import AddItem from "./components/AddItem";
import Payment from "./components/Payment";
import { EthProvider } from "./contexts/EthContext";
import Delivery from "./components/Delivery";
import Navbar from "./components/Navbar";

function App() {
    const [itemName, setItemName] = useState("");
    const [cost, setCost] = useState(undefined);
    const [itemIndex, setItemIndex] = useState(undefined);
    const [isPaymentDone, setIsPaymentDone] = useState(false);

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
                />
                <Payment
                    itemName={itemName}
                    cost={cost}
                    itemIndex={itemIndex}
                    isPaymentDone={isPaymentDone}
                    setIsPaymentDone={setIsPaymentDone}
                />
                <Delivery
                    itemName={itemName}
                    cost={cost}
                    itemIndex={itemIndex}
                    isPaymentDone={isPaymentDone}
                />

            </section>
        </EthProvider>
    );
}

export default App;
