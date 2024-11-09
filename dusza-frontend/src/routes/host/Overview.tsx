import { useState } from "react";
import { Button } from "react-daisyui";
import { Link } from "react-router-dom";
import { Overview as AbstractOverview } from "../../components/middle/Overview.tsx";

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
    <AbstractOverview title="Áttekintés">
      <AbstractOverview.Card title="Kategóriák">
        {categories.map((category, index) => (
          <AbstractOverview.Card
            key={index}
            title={category.name}
            className="bg-blue-200"
          >
            <p>Hátralévő idő: {countDown(category.deadline)}</p>
            <p>Regisztrált csapatok: {category.teamCount}</p>
          </AbstractOverview.Card>
        ))}
        <Link to="/host/teams" className="w-full">
          <Button color="primary" className="w-full">
            Összes kategória
          </Button>
        </Link>
      </AbstractOverview.Card>

      <AbstractOverview.Card title="Regisztrált csapatok">
        {teams.map((team, index) => (
          <AbstractOverview.Card
            key={index}
            title={team.name}
            className="bg-blue-200"
          >
            <p>Rögzítve: {team.registeredAt.toDateString()}</p>
            <p>Kategória: {team.category}</p>
          </AbstractOverview.Card>
        ))}
        <Link to="/host/teams" className="w-full">
          <Button color="primary" className="w-full">
            All teams
          </Button>
        </Link>
      </AbstractOverview.Card>

      <AbstractOverview.Card title="Nem jóváhagyott csapatok">
        {pendingTeams.map((team, index) => (
          <AbstractOverview.Card
            key={index}
            title={team.name}
            className="bg-blue-200"
          >
            <p>Rögzítve: {team.registeredAt.toDateString()}</p>
            <p>Kategória: {team.category}</p>
          </AbstractOverview.Card>
        ))}
        <Link to="/host/teams" className="w-full">
          <Button color="primary" className="w-full">
            Összes nem jóváhagyott csapat
          </Button>
        </Link>
      </AbstractOverview.Card>
    </AbstractOverview>
  );
};
