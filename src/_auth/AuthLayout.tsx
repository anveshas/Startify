import { Outlet, Navigate } from "react-router-dom";
const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          <img
            width="50%"
            height="50%"
            className="background-clip hidden xl:block h-screen  object-cover bg-no-repeat"
            src="/public/assets/images/1.svg"
          />
        </>
      )}
    </>
  );
};

export default AuthLayout;
