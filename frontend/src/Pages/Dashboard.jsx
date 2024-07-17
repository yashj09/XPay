import Users from "@/components/Users";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/account/balance`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    fetchBalance();
  }, []);

  return (
    <div>
      <Users balance={balance} />
    </div>
  );
};

export default Dashboard;
