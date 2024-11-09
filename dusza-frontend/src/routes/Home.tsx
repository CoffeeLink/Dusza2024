export const Home = () => {
  return (
    <div className="p-20 flex flex-col gap-6 justify-center items-center p-6 bg-slate-50 border border-1 rounded-lg border-slate-500 shadow-lg">
      <h1 className="text-2xl text-center">
        Üdvözlünk a <br />
        <span className="text-4xl font-bold text-amber-600">Dusza Árpád Programozási Emlékverseny</span><br />
        <div className="p-1">jelentkezési felületén!</div>
      </h1>
      <p className="text-md md:text-xl text-center text-gray-700 max-w-2xl ">
        Ezen a felületen regisztrálhatod a csapatodat a különböző <br/>Dusza Árpád Programozási versenyekre.
      </p>
      <p className="text-lg">
        A kezdéshez <a href="/register" className="text-blue-500 font-bold hover:text-blue-700">regisztráld a csapatodat</a>, vagy {" "}
        <a href="/login" className="text-blue-500 font-bold hover:text-blue-700">lépj be</a>.
      </p>
    </div>
  );
};
