import { useState } from "react";
import { useGame } from "../context/GameContext";
import { IoChevronBackOutline } from "react-icons/io5";
import Button from "../components/Button";
import Header from "../components/Header";
import Input from "../components/Input";
import Card from "../components/Card";
import NavButton from "../components/NavButton";

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
      <Card>
        {landing === "select" ? (
          <div className="flex flex-col gap-4">
            <Button onClick={() => setLanding("create")}>Create Game</Button>
            <Button onClick={() => setLanding("join")}>Join Game</Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <NavButton onClick={() => setLanding("select")}>
              <IoChevronBackOutline size={22} /> Back
            </NavButton>
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
          </div>
        )}
      </Card>
    </div>
  );
};

export default Landing;
