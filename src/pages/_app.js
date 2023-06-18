import LoginWrapper from "@/components/LoginWrapper";
import "@/styles/globals.css";
import { useState } from "react";
import { Offline } from "react-detect-offline";

export default function App({ Component, pageProps }) {
  const [showIsOnline, setShowIsOnline] = useState(false);
  const changeToOnline = (e) => {
    if (e) {
      setShowIsOnline(true);
      setTimeout(() => {
        setShowIsOnline(false);
      }, 3000);
    }
  };
  return (
    <>
      <Offline onChange={(e) => changeToOnline(e)}>
        <div className="bg-red-400 text-white w-full">
          <p>You are offline. Please check your internet connection.</p>
        </div>
      </Offline>

      {showIsOnline && (
        <div className="bg-green-800 text-white w-full">
          <p>You are online.</p>
        </div>
      )}
      <LoginWrapper>
        <Component {...pageProps} />
        <Offline>
          <div className="bg-black text-white absolute p-4 top-[25%] left-[25%]">
            <p>You are offline. Please check your internet connection.</p>
          </div>
        </Offline>
      </LoginWrapper>
    </>
  );
}
