 
import useAuthCheck from "./hooks/auth/useAuthCheck";
import AppRouter from "./routes/Routes"
import { Toaster } from "react-hot-toast";

function App() {
 useAuthCheck();
 
  return (
    <>
         <Toaster/>
         <AppRouter/>
    </>
  )
}

export default App
