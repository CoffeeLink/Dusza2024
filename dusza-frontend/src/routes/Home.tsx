import { MiddlePanel } from "../components/middle/MiddlePanel.tsx";

export const Home = () => {
  return (
    
    <div className="w-full max-w-3xl flex flex-col gap-4 justify-center">
      <MiddlePanel title={"Főoldal"}>
        <h1 className="text-2xl text-center pb-8 pt-8">
          Üdvözlünk a <br />
          <span className="text-4xl font-bold text-amber-600">
            Dusza Árpád Programozási Emlékverseny
          </span>
          <br />
          <div className="p-1">jelentkezési felületén!</div>
        </h1>
        <p className="text-md md:text-xl text-center text-gray-700 max-w-2xl pb-4">
          Ezen a felületen regisztrálhatod a csapatodat a különböző <br />
          Dusza Árpád Programozási versenyekre.
        </p>
        <p className="text-lg">
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
      </MiddlePanel>
    </div>
  );
};
