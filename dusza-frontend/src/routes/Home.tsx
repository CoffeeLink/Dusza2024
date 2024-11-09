export const Home = () => {
  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center p-4">
      <h1 className="text-4xl">Welcome to Dusza!</h1>
      <p className="text-lg">
        Dusza is a competition hosting platform for schools and organizations.
      </p>
      <p className="text-lg">
        To get started, please <a href="/register">register</a> or{" "}
        <a href="/login">login</a>.
      </p>
    </div>
  );
};
