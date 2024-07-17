import React, { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useSearchParams } from "react-router-dom";
const Sendmoney = () => {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState(0);
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-[100dvh]">
      <Card className="w-full max-w-sm  ">
        <CardHeader>
          <CardTitle>Send Money to {name}</CardTitle>
          <CardDescription>Enter the amount to send.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                className="w-full"
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
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
                alert("send " + amount + "$ to " + name);
                navigate("/dashboard");
              }}
            >
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Sendmoney;
