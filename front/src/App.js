import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [amount, setamount] = useState(100);
  const [disc, setdisc] = useState(0);
  const [selected, setselected] = useState();
  const [disc_list, setdisclist] = useState([]);

  function filterdisc(selected) {
    for (let item of disc_list) {
      if (item.amount == selected) {
        return item._id;
      }
    }
  }

  const handlecheckout = async () => {
    const data = {
      amount: amount,
      discount: filterdisc(selected),
    };

    await axios
      .post("https://stripe-back-wdoq.onrender.com/api/create_payment", data)
      .then((resp) => {

        window.location.replace(resp.data.payurl);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get("https://stripe-back-wdoq.onrender.com/api/getallcoupons").then((resp) => {
      setdisclist(resp.data.data);
    });
  }, []);

  useEffect(() => {
    setamount((amount - (disc * amount) / 100).toPrecision(4));
    setdisc(0);
  }, [disc]);

  const handledisc = (e) => {
    setdisc(e.target.value);
    setselected(e.target.value);
    setamount(100);
  };


  return (
    <div className="App">
      <header className="App-header">
        <div className="card cardsize container">
          <div className="card-body flex">
            <h5 className="card-title text-black bg-danger border-2 rounded p-2">
              HeyDaw Subscription
            </h5>
            <h1 className="text-black my-5">${amount}</h1>
            <div className="text-black">
              <div>
                <p className="fs12">Select the discount coupon</p>
                <select className="p-1" onChange={handledisc}>
                  <option className="p-1" value={0}>
                    Select
                  </option>
                  {disc_list &&
                    disc_list.map((item, key) => {
                      return (
                        <option className="p-1" value={item.amount} key={key}>
                          {item.name}
                        </option>
                      );
                    })}
                </select>
                <br />
                <button
                  type="button"
                  className="btn btn-primary btnsize px-4 py-1 mt-2 fs-4 "
                  onClick={handlecheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
