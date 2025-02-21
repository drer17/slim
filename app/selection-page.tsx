"use client";

import { Button } from "@/components/ui/button";
import { setPortfolio, setUser } from "@/lib/actions/auth";
import { Portfolio, User } from "@prisma/client";
import { IconCheck } from "@tabler/icons-react";
import Link from "next/link";

const SelectionPage: React.FC<{
  currentUser?: string;
  users: User[];
  portfolios: Portfolio[];
}> = ({ currentUser, users, portfolios }) => {
  return (
    <div className="w-full grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-2 w-full">
        <h2>Users</h2>
        {users.map((user) => (
          <Button
            key={user.id}
            onClick={() => setUser(user.id)}
            variant="secondary"
            className="capitalize"
          >
            {currentUser == user.id ? (
              <IconCheck className="w-4 h-4 mr-2" />
            ) : (
              <></>
            )}
            {user.name}
          </Button>
        ))}
      </div>

      <div className="flex flex-col gap-2 w-full">
        <h2>Portfolios</h2>
        {portfolios.map((portfolio) => (
          <Link key={portfolio.id} href="/portfolio/dashboard">
            <Button
              onClick={() => setPortfolio(portfolio.id)}
              variant="secondary"
              className="capitalize"
            >
              {portfolio.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SelectionPage;
