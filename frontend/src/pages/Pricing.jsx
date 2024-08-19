import { FaCheckCircle } from "react-icons/fa";
import Gpay from "../assets/pricing/gpay.svg"
const Pricing = () => {
  const features = [
    {
      id: 1,
      feature:
        "Check compatibility with matches by viewing unlimited horoscopes",
    },
    {
      id: 2,
      feature:
        "View and contact ID verified mathces with photos from exclusive section",
    },
    { id: 3, feature: "Priority customer service helpline" },
  ];
  const priceCard = [
    {
      id: 1,
      name: "Silver",
      price: "4,500 INR",
      discountPrice: "4,500 INR",
      discount: "Discount 9%",
      months: "3 months",
      special: false,
    },
    {
      id: 2,
      name: "Gold",
      price: "6,000 INR",
      discountPrice: "6,000 INR",
      discount: "Discount 19%",
      months: "3 months",
      special: true,
    },
  ];
  return (
    <main className="min-h-[90vh]">
      <div className="px-[20%] py-[2%] flex flex-col items-center gap-5">
        <h3 className="text-xl font-semibold text-pink-500">
          Pay now to switch unlimited mathces
        </h3>
        <ul className="flex flex-col gap-2">
          {features.map(({ id, feature }) => (
            <li key={id} className="flex items-center gap-3">
              {" "}
              <FaCheckCircle className="text-pink-500" /> {feature}
            </li>
          ))}
        </ul>
        <div className="flex gap-4">
          {priceCard.map(({ id, name, price, discount, discountPrice,  months, special }) => (
            <card
              key={id}
              className={`shadow p-5 flex flex-col  ${special ? "bg-pink-100 border-pink-300 border-2" : "bg-white"}  w-[200px] justify-center rounded-md`}
            >
              <input type="radio" name="price" value={name}/>
              <h2 className="text-center py-3">{name}</h2>
              <h3 className="text-center py-1">{price}</h3>
              <h4 className="text-center py-1">Save {discount}</h4>
              <h3 className="text-center py-1">{discountPrice}</h3>
              <p className="text-center py-1">{months}</p>
            </card>
          ))}
        </div>

        <div className="flex items-center gap-3 my-4 shadow rounded-md border-[1px] border-blue-200 px-3 py-2">
            <h2 className="w-full text-4xl text-blue-500 font-semibold ">Pay with</h2> <img src={Gpay} className="w-32" />
        </div>
      </div>
    </main>
  );
};

export default Pricing;
