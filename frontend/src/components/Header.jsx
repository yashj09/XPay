import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { LuWallet } from "react-icons/lu";
import Balance from "@/components/Balance";

const Header = ({ balance, setFilter }) => {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-background border-b">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-lg"
          prefetch="false"
        >
          <LuWallet className="h-6 w-6" />
          <span>Xpay</span>
        </Link>
        <Balance balance={balance} />
      </div>
      <div className="relative w-full max-w-md">
        <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search users"
          className="w-full bg-background pl-10 pr-4 py-2 rounded-lg shadow-sm"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
    </header>
  );
};

export default Header;
