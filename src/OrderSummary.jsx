export default function OrderSummary({ orderData }) {
  const { customer, items, totals } = orderData;
  return (
    <div id="pdfData">
      <h2>Order Summary</h2>
      <div id="customerDetails">
        <p>
          <strong>Name:</strong> {customer.name}
          <br />
          <strong>Phone:</strong> {customer.phone}
          <br />
          <strong>Address:</strong> {customer.address}
        </p>
      </div>
      <table id="orderItemsHTML">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Category</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Line Total</th>
          </tr>
        </thead>
        <tbody>
          {items
            .filter((it) => it.picked && it.qty > 0)
            .map((it, idx) => {
              console.log(it)
              return <tr key={it.code}>
                <td>{idx + 1}</td>
                <td>{it.cat}</td>
                <td>{it.name}</td>
                <td>{it.qty}</td>
                <td>₹ {Math.round(it.price)}</td>
                <td>₹ {(it.price * it.qty).toFixed(2)}</td>
              </tr>
            })}
        </tbody>
      </table>
      <div id="orderTotals">
        <p>
          <strong>Subtotal:</strong>₹{" "}
          {Math.round(totals.subtotal).toLocaleString("en-IN")}
          <br />
          <strong>Discount (45%):</strong> ₹{" "}
          {Math.round(totals.discount).toLocaleString("en-IN")}
          <br />
          <strong>Total:</strong> ₹{" "}
          {Math.round(totals.total).toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
