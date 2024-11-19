import { Main } from "./components/Main";
import { Login } from "./components/Login";

export default function Home() {
  return (
    <div className="flex w-screen">
      <Main />
      <Login />
    </div>
  );
}
