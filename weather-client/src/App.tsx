import Home from "./pages/home";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Home />
      <Toaster position="top-right" />
    </>
  );
}
