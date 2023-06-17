import LoginWrapper from "@/components/LoginWrapper";
import "@/styles/globals.css";
import { Offline } from "react-detect-offline";

export default function App({ Component, pageProps }) {
  return (
    <>
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
