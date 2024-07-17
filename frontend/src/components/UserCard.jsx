import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const UserCard = React.memo(({ user }) => {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col items-center gap-4 p-4">
      <Avatar className="w-16 h-16 bg-primary text-primary-foreground font-bold">
        <AvatarFallback className="w-16 h-16 bg-gray-500 text-primary-foreground font-bold">
          {user.firstName[0]}
          {user.lastName[0]}
        </AvatarFallback>
      </Avatar>
      <div className="text-center">
        <div className="font-medium">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <Button
        className="w-full"
        onClick={() => {
          navigate(`/send?id=${user._id}&name=${user.firstName}`);
        }}
      >
        Send Money
      </Button>
    </Card>
  );
});

export default UserCard;
