import "./App.css";

function App() {
  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const amount = 50000;
  const currency = "INR";
  const receipt = "receipt#1";
  const handlePayment = async (e) => {
    const response = await fetch("http://localhost:5001/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt,
      }),
    });
    const order = await response.json();
    console.log(order);
    var options = {
      key: keyId, // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Dawood Beekeeper", //your business name
      description: "Test Transaction",
      image: "./assets/honeybee.png",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = { ...response };
        const validateRes = await fetch(
          "http://localhost:5001/order/validate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      payment_capture: 1, //1 for automatic capture
      method: {
        netbanking: true,
        card: true,
        upi: true,  // ✅ Enable UPI (includes QR code)
        wallet: true
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Mohd Faziel", //your customer's name
        email: "mohdfazel969@gmail.com",
        contact: "7006205934", //Provide the customer's phone number for better conversion rates
      },
      theme: {
        color: "#FFCE23",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.description);
    });
    rzp1.open();
    e.preventDefault();
  };

  return (
    <>
      <button onClick={handlePayment}>Pay Now</button>
    </>
  );
}

export default App;
