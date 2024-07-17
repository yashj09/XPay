import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const Sendmoney = () => {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState(0);
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  return (
    <>
      Sendmoney to {name}
      <Input
        placeholder="enter amount"
        type="number"
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          axios.post(
            "http://localhost:3000/api/v1/account/transfer",
            {
              amount,
              to: id,
            },
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          );
          alert("send " + amount + "Rs to " + name);
        }}
      >
        Send money
      </Button>
    </>
  );
};

export default Sendmoney;
