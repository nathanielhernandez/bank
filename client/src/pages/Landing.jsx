import { useState } from "react";
import { useGame } from "../context/GameContext";
import { IoChevronBackOutline } from "react-icons/io5";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";

const Landing = () => {
  const [landing, setLanding] = useState("select");
  const [values, setValues] = useState({ name: "", roomCode: "" });
  const { createGame, joinGame } = useGame();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    if (landing === "create") {
      createGame(values.name);
    } else {
      joinGame(values.name, values.roomCode);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-10">
      <Header />
      <div className="w-full bg-zinc-200 p-4 rounded-2xl flex flex-col gap-4 drop-shadow-xl">
        {landing === "select" && (
          <>
            <Button onClick={() => setLanding("create")}>Create Game</Button>
            <Button onClick={() => setLanding("join")}>Join Game</Button>
          </>
        )}
        {(landing === "create" || landing === "join") && (
          <>
            <button
              className="flex items-center text-zinc-600 text-lg leading-none"
              onClick={() => setLanding("select")}
            >
              <IoChevronBackOutline size={22} /> Back
            </button>
            <Input
              name="name"
              placeholder="Enter your name"
              onChange={(e) => handleChange(e)}
            />
            {landing === "join" && (
              <Input
                name="roomCode"
                placeholder="Enter room code"
                onChange={(e) => handleChange(e)}
              />
            )}
            <Button onClick={handleClick}>{landing} Game</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Landing;
