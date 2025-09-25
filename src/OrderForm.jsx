import { jsPDF } from "jspdf";
import React, { useState } from "react";

const PRODUCTS = [
  // SPARKLERS
  { cat: "Sparklers", id: "1", name: "7cm Electric Sparklers", price: 12 },
  { cat: "Sparklers", id: "2", name: "7cm Colour Sparklers", price: 20 },
  { cat: "Sparklers", id: "3", name: "7cm Green Sparklers", price: 26 },
  { cat: "Sparklers", id: "4", name: "7cm Red Sparklers", price: 30 },
  { cat: "Sparklers", id: "5", name: "10cm Electric Sparklers", price: 22 },
  { cat: "Sparklers", id: "6", name: "10cm Colour Sparklers", price: 26 },
  { cat: "Sparklers", id: "7", name: "10cm Green Sparklers", price: 28 },
  { cat: "Sparklers", id: "8", name: "10cm Red Sparklers", price: 34 },
  { cat: "Sparklers", id: "9", name: "12cm Electric Sparklers", price: 26 },
  { cat: "Sparklers", id: "10", name: "12cm Colour Sparklers", price: 28 },
  { cat: "Sparklers", id: "11", name: "12cm Green Sparklers", price: 33 },
  { cat: "Sparklers", id: "12", name: "12cm Red Sparklers", price: 38 },
  { cat: "Sparklers", id: "13", name: "15cm Electric Sparklers", price: 66 },
  { cat: "Sparklers", id: "14", name: "15cm Colour Sparklers", price: 77 },
  { cat: "Sparklers", id: "15", name: "15cm Green Sparklers", price: 88 },
  { cat: "Sparklers", id: "16", name: "15cm Red Sparklers", price: 99 },
  { cat: "Sparklers", id: "17", name: "30cm Electric Sparklers", price: 66 },
  { cat: "Sparklers", id: "18", name: "30cm Colour Sparklers", price: 77 },
  { cat: "Sparklers", id: "19", name: "30cm Green Sparklers", price: 88 },
  { cat: "Sparklers", id: "20", name: "30cm Red Sparklers", price: 99 },
  { cat: "Sparklers", id: "21", name: "50cm Electric Sparklers", price: 275 },
  { cat: "Sparklers", id: "22", name: "50cm Colour Sparklers", price: 385 },
  { cat: "Sparklers", id: "23", name: "50cm Green Sparklers", price: 440 },
  { cat: "Sparklers", id: "24", name: "50cm Red Sparklers", price: 550 },

  // SOUND CRACKERS
  { cat: "Sound Crackers", id: "25", name: '2 3/4" Kuruvi', price: 12 },
  { cat: "Sound Crackers", id: "26", name: '3 1/2" Laxmi', price: 22 },
  { cat: "Sound Crackers", id: "27", name: '4" Laxmi', price: 33 },
  { cat: "Sound Crackers", id: "28", name: '4" Deluxe Laxmi', price: 55 },
  { cat: "Sound Crackers", id: "29", name: '4" Gold Laxmi', price: 66 },
  { cat: "Sound Crackers", id: "30", name: '5" Laxmi', price: 99 },
  { cat: "Sound Crackers", id: "31", name: "2 Sound Crackers", price: 55 },
  { cat: "Sound Crackers", id: "32", name: "3 Sound Crackers", price: 66 },

  // BIJILI CRACKERS
  { cat: "Bijili Crackers", id: "33", name: "Red Bijili 100", price: 66 },
  { cat: "Bijili Crackers", id: "34", name: "Stripped Bijili 100", price: 88 },
  { cat: "Bijili Crackers", id: "35", name: "28 Chorsa", price: 66 },
  { cat: "Bijili Crackers", id: "36", name: "28 Giant", price: 88 },
  { cat: "Bijili Crackers", id: "37", name: "56 Giant", price: 176 },
  { cat: "Bijili Crackers", id: "38", name: "50 Dlx", price: 220 },
  { cat: "Bijili Crackers", id: "39", name: "100 Dlx", price: 440 },
  { cat: "Bijili Crackers", id: "40", name: "100 wala", price: 66 },
  { cat: "Bijili Crackers", id: "41", name: "200 wala", price: 132 },
  { cat: "Bijili Crackers", id: "42", name: "1K", price: 300 },
  { cat: "Bijili Crackers", id: "43", name: "2K", price: 600 },
  { cat: "Bijili Crackers", id: "44", name: "5K", price: 1500 },
  { cat: "Bijili Crackers", id: "45", name: "10K", price: 3000 },
  { cat: "Bijili Crackers", id: "46", name: "1K Rock Star", price: 660 },
  { cat: "Bijili Crackers", id: "47", name: "2K Rock Star", price: 660 },
  { cat: "Bijili Crackers", id: "48", name: "5K Rock Star", price: 3300 },
  { cat: "Bijili Crackers", id: "49", name: "10K Rock Star", price: 6600 },

  // GROUND CHAKKAR
  { cat: "Ground Chakkar", id: "50", name: "Ground Chakkar Big", price: 66 },
  {
    cat: "Ground Chakkar",
    id: "51",
    name: "Ground Chakkar Special",
    price: 198,
  },
  {
    cat: "Ground Chakkar",
    id: "52",
    name: "Ground Chakkar Deluxe",
    price: 330,
  },
  { cat: "Ground Chakkar", id: "53", name: "Spinner Special", price: 275 },
  { cat: "Ground Chakkar", id: "54", name: "Spinner Deluxe", price: 440 },

  // TWINKLING STARS
  {
    cat: "Twinkling Stars",
    id: "55",
    name: '1 1/2" Twinkling Stars',
    price: 55,
  },
  { cat: "Twinkling Stars", id: "56", name: '4" Twinkling Stars', price: 165 },

  // FLOWER POTS
  { cat: "Flower Pots", id: "57", name: "Flower Pots Big", price: 132 },
  { cat: "Flower Pots", id: "58", name: "Flower Pots Special", price: 165 },
  { cat: "Flower Pots", id: "59", name: "Flower Pots Asoka", price: 275 },
  { cat: "Flower Pots", id: "60", name: "Colour Koti", price: 440 },
  { cat: "Flower Pots", id: "61", name: "Colour Koti Deluxe", price: 770 },

  // PENCILS
  { cat: "Pencils", id: "62", name: "Niagara Pencil", price: 275 },
  { cat: "Pencils", id: "63", name: "Star Rain", price: 440 },

  // ROCKETS
  { cat: "Rockets", id: "64", name: "Rocket Bombs", price: 110 },
  { cat: "Rockets", id: "65", name: "Lunik Express", price: 220 },
  { cat: "Rockets", id: "66", name: "2 Sound Rocket", price: 275 },
  { cat: "Rockets", id: "67", name: "Whistling Rocket", price: 330 },

  // BOMBS
  { cat: "Bombs", id: "68", name: "Bullet Bomb", price: 55 },
  { cat: "Bombs", id: "69", name: "Hydro Bomb", price: 165 },
  { cat: "Bombs", id: "70", name: "King Bomb", price: 220 },
  { cat: "Bombs", id: "71", name: "Classic Bomb", price: 330 },
  { cat: "Bombs", id: "72", name: "Digital Bomb", price: 385 },
  { cat: "Bombs", id: "73", name: "Adiyal 1/4 Kg", price: 88 },
  { cat: "Bombs", id: "74", name: "Adiyal 1/2 Kg", price: 165 },
  { cat: "Bombs", id: "75", name: "Adiyal 1 Kg", price: 330 },

  // FOUNTAINS
  { cat: "Fountains", id: "76", name: "Electric Stones", price: 16 },
  { cat: "Fountains", id: "77", name: "Kit Kat", price: 34 },
  { cat: "Fountains", id: "78", name: "Jelly", price: 78 },
  { cat: "Fountains", id: "79", name: "Kurkure", price: 110 },
  { cat: "Fountains", id: "80", name: "Fruit Fountain", price: 440 },
  { cat: "Fountains", id: "81", name: "Peacock Feather", price: 275 },
  { cat: "Fountains", id: "82", name: "Poppings/Tweet/6000", price: 363 },
  { cat: "Fountains", id: "83", name: "Peacock Multicolour", price: 330 },
  { cat: "Fountains", id: "84", name: "Bada Peacock", price: 770 },
  { cat: "Fountains", id: "85", name: "Melody Peacock", price: 880 },
  { cat: "Fountains", id: "86", name: "Rainbow Shower", price: 660 },
  { cat: "Fountains", id: "87", name: "Mini Siren", price: 385 },
  { cat: "Fountains", id: "88", name: "Mega Siren", price: 440 },
  { cat: "Fountains", id: "89", name: "Sing Pop Crackling", price: 440 },
  { cat: "Fountains", id: "90", name: "Ice Cream Cone", price: 440 },
  { cat: "Fountains", id: "91", name: "Colour Smoke", price: 330 },
  { cat: "Fountains", id: "92", name: "Photo Flash", price: 165 },
  { cat: "Fountains", id: "93", name: "Selfie Stick", price: 220 },
  { cat: "Fountains", id: "94", name: "Butterfly", price: 165 },
  { cat: "Fountains", id: "95", name: "Golden Sky Shot", price: 385 },
  { cat: "Fountains", id: "96", name: "Drone", price: 330 },
  { cat: "Fountains", id: "97", name: "Helicopter", price: 220 },
  { cat: "Fountains", id: "98", name: "Bambaram", price: 275 },
  { cat: "Fountains", id: "99", name: "Water Queen", price: 330 },
  { cat: "Fountains", id: "100", name: "Jolly Crackers", price: 440 },
  { cat: "Fountains", id: "101", name: "Lollipop", price: 440 },
  { cat: "Fountains", id: "102", name: "Tin Fountain", price: 198 },
  { cat: "Fountains", id: "103", name: "Money Bomb", price: 440 },
  { cat: "Fountains", id: "104", name: "Tricolour Fountain", price: 550 },
  { cat: "Fountains", id: "105", name: "Guitar", price: 440 },
  { cat: "Fountains", id: "106", name: "Lotus Wheel", price: 330 },
  { cat: "Fountains", id: "107", name: "Bat", price: 330 },
  { cat: "Fountains", id: "108", name: "Free Fire Gun", price: 440 },
  { cat: "Fountains", id: "109", name: "Wire Chakkar", price: 440 },
  { cat: "Fountains", id: "110", name: "For Star Crackling", price: 330 },
  {
    cat: "Fountains",
    id: "111",
    name: "Krishna Chakra (Rotating Sparklers)",
    price: 330,
  },

  // FANCY
  { cat: "Fancy", id: "112", name: "Chotta Fancy", price: 88 },
  { cat: "Fancy", id: "113", name: '2" Pipe Fancy', price: 330 },
  { cat: "Fancy", id: "114", name: '2.5" Pipe Fancy', price: 440 },
  { cat: "Fancy", id: "115", name: '3.5" Pipe Fancy', price: 660 },
  { cat: "Fancy", id: "116", name: '3.5" Pipe 2 Balls Fancy', price: 825 },
  { cat: "Fancy", id: "117", name: '4" Niagra Fancy', price: 880 },
  { cat: "Fancy", id: "118", name: '4" Pipe Fancy', price: 880 },
  { cat: "Fancy", id: "119", name: '4" Pipe Fancy Violet', price: 990 },
  { cat: "Fancy", id: "120", name: '4" Pipe Fancy Pink', price: 1100 },
  { cat: "Fancy", id: "121", name: '4" Pipe Fancy Blue', price: 1210 },
  { cat: "Fancy", id: "122", name: '5" Pipe Fancy', price: 1320 },
  { cat: "Fancy", id: "123", name: '5" Pipe Fancy Pink', price: 1430 },
  { cat: "Fancy", id: "124", name: '5" Pipe Fancy Blue', price: 1540 },

  // AERIAL / MULTI SHOTS
  { cat: "Multi Shots", id: "125", name: "7 Shots", price: 220 },
  { cat: "Multi Shots", id: "126", name: "12 Multi Shots", price: 330 },
  { cat: "Multi Shots", id: "127", name: "30 Multi Shots", price: 880 },
  { cat: "Multi Shots", id: "128", name: "60 Multi Shots", price: 1760 },
  { cat: "Multi Shots", id: "129", name: "120 Multi Shots", price: 3520 },
  { cat: "Multi Shots", id: "130", name: "240 Multi Shots", price: 7040 },
  { cat: "Multi Shots", id: "131", name: "IPL Winner", price: 6600 },

  // MATCHES & CAPS
  { cat: "Matches & Caps", id: "132", name: "Roll Caps", price: 55 },
  { cat: "Matches & Caps", id: "133", name: "Black Serpents", price: 33 },
  {
    cat: "Matches & Caps",
    id: "134",
    name: "Super Deluxe Matches",
    price: 220,
  },
  { cat: "Matches & Caps", id: "135", name: "Maxx Matches", price: 495 },
  { cat: "Matches & Caps", id: "136", name: "Mega Matches", price: 550 },

  // GIFT BOXES
  { cat: "Gift Boxes", id: "137", name: "21 Items", price: 270 },
  { cat: "Gift Boxes", id: "138", name: "31 Items", price: 450 },
  { cat: "Gift Boxes", id: "139", name: "41 Items", price: 750 },
  { cat: "Gift Boxes", id: "140", name: "51 Items", price: 900 },
];

const DISCOUNT_PERCENT = 45;

export default function OrderForm({ setOrderData }) {
  const [quantities, setQuantities] = useState({});
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleQtyChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, Math.floor(Number(value) || 0)),
    }));
  };

  const handleCustomerChange = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const calcTotals = () => {
    let subtotal = 0;
    let discountableAmount = 0;
    const excludedCategories = ["Matches & Caps", "Gift Boxes"];

    PRODUCTS.forEach((p) => {
      const q = quantities[p.id] || 0;
      const lineTotal = p.price * q;
      subtotal += lineTotal;

      // Only add to discountable amount if category is not excluded
      if (!excludedCategories.includes(p.cat)) {
        discountableAmount += lineTotal;
      }
    });

    const discount = +(discountableAmount * (DISCOUNT_PERCENT / 100));
    const total = +(subtotal - discount); // Remove + SHIPPING
    return {
      subtotal: Math.round(subtotal),
      discount: Math.round(discount),
      // Remove: shipping: SHIPPING,
      total: Math.round(total),
    };
  };

  const generatePDF = (order) => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const left = 40;
    let y = 40;

    doc.setFontSize(18);
    doc.text("Sri Maruthi Pyro Park", left, y);

    y += 20;
    doc.setFontSize(11);
    doc.text(`Order date: ${new Date().toLocaleString()}`, left, y);

    y += 24;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Customer details:", left, y);
    doc.setFont("helvetica", "normal");
    y += 14;
    doc.setFontSize(10);

    // Name - Bold label, normal value
    doc.setFont("helvetica", "bold");
    doc.text("Name: ", left, y);
    doc.setFont("helvetica", "normal");
    doc.text(order.customer.name, left + 35, y);
    y += 12;

    // Phone - Bold label, normal value
    doc.setFont("helvetica", "bold");
    doc.text("Phone: ", left, y);
    doc.setFont("helvetica", "normal");
    doc.text(order.customer.phone, left + 40, y);
    y += 12;

    // Address - Bold label, normal value
    doc.setFont("helvetica", "bold");
    doc.text("Address: ", left, y);
    doc.setFont("helvetica", "normal");
    const addressLines = doc.splitTextToSize(order.customer.address, 450);
    doc.text(addressLines, left + 55, y);
    y += 12 * (addressLines.length + 1);

    y += 18;
    doc.setFontSize(12);
    doc.text("Products ordered:", left, y);
    y += 14;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("S.No", left, y);
    doc.text("Product", left + 40, y);
    doc.text("Category", left + 200, y);
    doc.text("Qty", left + 280, y);
    doc.text("Unit (Rs)", left + 330, y);
    doc.text("Line Total (Rs)", left + 420, y);
    doc.setFont("helvetica", "normal");
    y += 12;

    let serial = 1;
    order.items
      .filter((it) => it.qty > 0 && it.picked)
      .forEach((item) => {
        // Find the product to get its category
        const product = PRODUCTS.find((p) => p.id === item.code);
        const category = product ? product.cat : "";

        doc.text(String(serial), left, y);
        doc.text(item.name, left + 40, y);
        doc.text(category, left + 200, y);
        doc.text(String(item.qty), left + 280, y);
        doc.text(`Rs ${item.price.toLocaleString("en-IN")}`, left + 330, y);
        doc.text(
          `Rs ${(item.price * item.qty).toLocaleString("en-IN")}`,
          left + 420,
          y
        ); // ← FIXED LINE
        serial++;
        y += 14;
        if (y > 720) {
          doc.addPage();
          y = 40;
        }
      });

    y += 18;
    doc.setFont("helvetica", "bold");
    doc.text(
      `Subtotal: Rs ${Math.round(order.totals.subtotal).toLocaleString(
        "en-IN"
      )}`,
      left,
      y
    );
    y += 14;
    doc.text(
      `Discount (${DISCOUNT_PERCENT}% - excludes Matches & Caps, Gift Boxes): Rs ${Math.round(
        order.totals.discount
      ).toLocaleString("en-IN")}`,
      left,
      y
    );
    y += 14;
    doc.text(
      `Total: Rs ${Math.round(order.totals.total).toLocaleString("en-IN")}`,
      left,
      y
    );

    y += 24;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(
      "Please share this PDF to WhatsApp 7358803957 to receive payment options.",
      left,
      y
    );

    return doc;
  };

  const handlePlaceOrder = () => {
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Please fill name, phone and address.");
      return;
    }

    const totals = calcTotals();

    // Check minimum purchase value
    if (totals.total < 3000) {
      alert(
        "Minimum purchase value is Rs 3000. Please add more items to your order."
      );
      return;
    }

    const items = PRODUCTS.map((p) => ({
      code: p.id,
      name: p.name,
      price: p.price,
      qty: quantities[p.id] || 0,
      picked: true,
      cat: p.cat,
    }));

    const order = { customer, items, totals };
    setOrderData(order);

    const doc = generatePDF(order);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    doc.save(
      `SkyFire_order_${customer.name.replace(/\s+/g, "_")}_${timestamp}.pdf`
    );
  };

  function customCategoryTitle(cat) {
    if (cat === "Matches & Caps") {
      return "Matches & Caps (Net Price)";
    }
    if (cat === "Gift Boxes") {
      return "Gift Boxes (Net Price)";
    }
    return cat;
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <table>
        <thead>
          <tr>
            {/* <th>Pick</th> */}
            <th>S.no</th>
            <th>Product</th>
            <th>Unit Price (Rs)</th>
            <th>Quantity</th>
            <th>Line Total (Rs)</th>
          </tr>
        </thead>
        <tbody>
          {PRODUCTS.map((p, idx) => {
            const lastCat = idx === 0 || PRODUCTS[idx - 1].cat !== p.cat;

            return (
              <React.Fragment key={p.id}>
                {lastCat && (
                  <tr className="category-row">
                    <td colSpan="5">{customCategoryTitle(p.cat)}</td>
                  </tr>
                )}
                <tr>
                  <td>{idx + 1}</td>
                  {/* <td>
                    <input
                      type="checkbox"
                      checked={picked[p.id] !== false}
                      onChange={(e) => handlePickChange(p.id, e.target.checked)}
                    />
                  </td> */}
                  <td>{p.name}</td>
                  <td>₹ {p.price}</td>
                  <td>
                    <input
                      type="number"
                      value={quantities[p.id] || 0}
                      onChange={(e) => handleQtyChange(p.id, e.target.value)}
                    />
                  </td>
                  <td>₹ {(quantities[p.id] || 0) * p.price}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>

      <div className="totals">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="small">Subtotal</div>
          <div>₹ {calcTotals().subtotal.toLocaleString("en-IN")}</div>
        </div>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="small">
            Discount (45% - excludes Matches & Caps, Gift Boxes)
          </div>
          <div>₹ {calcTotals().discount.toLocaleString("en-IN")}</div>
        </div>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="small">Total</div>
          <div>₹ {calcTotals().total.toLocaleString("en-IN")}</div>
        </div>
      </div>

      <h3>Delivery details</h3>
      <label>
        Name{" "}
        <input
          value={customer.name}
          onChange={(e) => handleCustomerChange("name", e.target.value)}
          autoComplete="name"
          required
        />
      </label>
      <label>
        Phone{" "}
        <input
          value={customer.phone}
          autoComplete="phone"
          onChange={(e) => handleCustomerChange("phone", e.target.value)}
          required
        />
      </label>
      <label>
        Address{" "}
        <textarea
          rows="3"
          id="address"
          autoComplete="address"
          value={customer.address}
          onChange={(e) => handleCustomerChange("address", e.target.value)}
          required
        />
      </label>

      <div style={{ marginTop: 14 }}>
        <button type="button" onClick={handlePlaceOrder}>
          Download Order PDF
        </button>
      </div>
    </form>
  );
}
