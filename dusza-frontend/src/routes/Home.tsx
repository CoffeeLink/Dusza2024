import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { MiddlePanel } from "../components/middle/MiddlePanel.tsx";
import { Button } from "react-daisyui";

export const Home = () => {
  return (
    
    <div className="w-full max-w-3xl flex flex-col gap-4 justify-center">
      <MiddlePanel title={"Főoldal"}>
        <div className="items-center pb-8 w-full">
        <h1 className="text-2xl text-center pb-8 pt-8">
          Üdvözlünk a <br />
          <span className="text-4xl font-bold text-amber-600">
            Dusza Árpád<br/><span className="text-3xl">Országos Programozói Emlékverseny</span>
          </span>
          <br />
          <div className="p-1">jelentkezési felületén!</div>
        </h1>
        <p className="text-md md:text-xl text-center text-gray-700 pb-4">
          Ezen a felületen regisztrálhatod a csapatodat a különböző <br />
          Dusza Árpád Programozói versenyekre.
        </p>
        <p className="text-lg text-center">
          A kezdéshez{" "}
          <a
            href="/register"
            className="text-blue-500 font-bold hover:text-blue-700"
          >
            regisztráld a csapatodat
          </a>
          , vagy{" "}
          <a
            href="/login"
            className="text-blue-500 font-bold hover:text-blue-700"
          >
            lépj be
          </a>
          .

          
        </p>
        <div className="text-center pt-4">

        <a href="https://docs.google.com/document/d/1JNqhN0r94sDhKR_QHdWUVLa5mF2sL9gW/edit?usp=sharing&ouid=101270343276873567969&rtpof=true&sd=true" target="_blank">
        <Button className="bg-amber-800 hover:bg-amber-700 active:bg-amber-900 text-slate-50">
          <DocumentTextIcon className="w-5" /> Az alkalmazás működési leírása
        </Button>
        </a>
        </div>
        

        </div>
      </MiddlePanel>
    </div>
  );
};
