import { useState } from "react";
import Card from ".././components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({ username, email, password });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper">
      <Card>
        <h1 className="font-display text-2xl lg:text-3xl mb-6">
          Create your account
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:gap-5">
          <Input
            label="Username"
            id="username"
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
          <Input
            label="Email"
            id="email"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
          <Input
            label="Password"
            id="password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          <Button type="submit">Sign up</Button>
        </form>
      </Card>
    </div>
  );
}

export default Signup;
