import { useState } from "react";
import OrderForm from "./OrderForm";
import OrderSummary from "./OrderSummary";
import "./styles.css";

export default function App() {
  const [orderData, setOrderData] = useState(null);

  return (
    <div className="container">
      <h1>Sri Maruthi Pyro Park</h1>
      <h2 className="subtitle">
        1 / 332 Middle Street, Naranapuram, Sivakasi - 626189
      </h2>
      <br />
      <h2 className="subtitle">Official Price List & Online Order Form 2025</h2>
      <p className="muted">
        Choose quantities for the products you want to order. The product prices
        are pre-filled.
      </p>
      <strong> Discount: 45% (excludes Matches & Caps, Gift Boxes)</strong>
      <br />
      <strong>Minimum purchase value: ₹ 3000</strong>

      <OrderForm setOrderData={setOrderData} />

      {orderData && <OrderSummary orderData={orderData} />}

      <div className="share-info">
        📲 After downloading, please share your <strong>PDF order</strong> to
        WhatsApp <strong>7358803957</strong>. <br />
        We will then send you the <strong>payment options</strong>.
        <div className="note">
          ⏳ Due to heavy orders, we will definitely respond within{" "}
          <strong>12 to 14 hours</strong>.
        </div>
      </div>
    </div>
  );
}
