import { useState } from "react";
import { Artboard, Button } from "react-daisyui";
import { Link } from "react-router-dom";

// TODO: Export types into a shared file
type Category = {
  name: string;
  deadline: Date;
  teamCount: number;
};

type Team = {
  name: string;
  registeredAt: Date;
  category: string;
};

export const Overview = () => {
  function countDown(deadline: Date) {
    const now = new Date();
    const timeLeft = deadline.getTime() - now.getTime();

    if (timeLeft <= 0) {
      return "Lejárt az idő!";
    }

    const seconds = Math.floor(timeLeft / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} nap`;
    }

    if (hours > 0) {
      return `${hours} óra`;
    }

    if (minutes > 0) {
      return `${minutes} perc`;
    }

    if (seconds > 0) {
      return `${seconds} másodperc`;
    }
  }

  const [categories] = useState<Category[]>([
    {
      name: "Category 1",
      deadline: new Date("2024-12-10"),
      teamCount: 0,
    },
    {
      name: "Category 2",
      deadline: new Date("2024-11-10"),
      teamCount: 0,
    },
    {
      name: "Category 3",
      deadline: new Date("2024-11-8"),
      teamCount: 0,
    },
  ]);

  const [teams] = useState<Team[]>([
    {
      name: "Team 1",
      registeredAt: new Date("2024-10-10"),
      category: "Category 1",
    },
    {
      name: "Team 2",
      registeredAt: new Date("2024-10-10"),
      category: "Category 2",
    },
    {
      name: "Team 3",
      registeredAt: new Date("2024-10-10"),
      category: "Category 3",
    },
  ]);

  const [pendingTeams] = useState<Team[]>([
    {
      name: "Team 4",
      registeredAt: new Date("2024-10-10"),
      category: "Category 1",
    },
    {
      name: "Team 5",
      registeredAt: new Date("2024-10-10"),
      category: "Category 2",
    },
    {
      name: "Team 6",
      registeredAt: new Date("2024-10-10"),
      category: "Category 3",
    },
  ]);

  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="w-full text-center text-4xl">Overview</h1>
      <div className="flex gap-4 flex-wrap content-stretch">
        <Artboard className="gap-4 p-4 flex-1 min-w-72 justify-start h-fit bg-white">
          <h2 className="text-2xl w-full">Categories</h2>
          {categories.map((category, index) => (
            <Artboard key={index} className="gap-2 p-4 bg-blue-200">
              <h3 className="w-full font-bold">{category.name}</h3>
              <div className="w-full flex flex-row justify-between gap-2">
                <p className="">Time left: {countDown(category.deadline)}</p>
                <p className="">Team Count: {category.teamCount}</p>
              </div>
            </Artboard>
          ))}
          <Link to="/host/categories" className="w-full">
            <Button color="primary" className="w-full">
              All categories
            </Button>
          </Link>
        </Artboard>

        <Artboard className="gap-4 p-4 flex-1 min-w-72 justify-start h-fit bg-white">
          <h2 className="text-2xl w-full">Teams</h2>
          {teams.map((team, index) => (
            <Artboard key={index} className="gap-2 p-4 bg-blue-200">
              <h3 className="w-full font-bold">{team.name}</h3>
              <div className="w-full flex flex-row justify-between gap-2">
                <p className="">
                  Registered at: {team.registeredAt.toDateString()}
                </p>
                <p className="">Category: {team.category}</p>
              </div>
            </Artboard>
          ))}
          <Link to="/host/teams" className="w-full">
            <Button color="primary" className="w-full">
              All teams
            </Button>
          </Link>
        </Artboard>

        <Artboard className="gap-4 p-4 flex-1 min-w-72 justify-start h-fit bg-white">
          <h2 className="text-2xl w-full">Pending teams</h2>
          {pendingTeams.map((team, index) => (
            <Artboard key={index} className="gap-2 p-4 bg-blue-200">
              <h3 className="w-full font-bold">{team.name}</h3>
              <div className="w-full flex flex-row justify-between gap-2">
                <p className="">
                  Registered at: {team.registeredAt.toDateString()}
                </p>
                <p className="">Category: {team.category}</p>
              </div>
            </Artboard>
          ))}
          <Link to="/host/teams/pending" className="w-full">
            <Button color="primary" className="w-full">
              All pending teams
            </Button>
          </Link>
        </Artboard>
      </div>
    </div>
  );
};
