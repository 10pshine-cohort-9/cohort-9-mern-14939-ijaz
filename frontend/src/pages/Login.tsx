import { useState } from "react";
import toast from "react-hot-toast";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { loginUser } from "../api/auth";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUser(email, password);
      toast.success("Logged in!");
      console.log(data);
    } catch (err: any) {
      const details = err.response?.data?.details;
      if (details?.length) {
        setError(details[0].message);
      } else {
        setError(err.response?.data?.error || "Something went wrong");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper">
      <Card>
        <h1 className="font-display text-2xl lg:text-3xl mb-6">Log in</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:gap-5">
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
          {error && <p className="text-sm text-clay">{error}</p>}
          <Button type="submit">Log in</Button>
          <p className="text-sm text-graphite mt-2">
            Don't have an account?{" "}
            <Link to="/signup" className="text-moss">
              Sign up
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}

export default Login;
