import { Outlet } from "react-router";

function Page() {


  return (
    <>
      <div className="h-screen overflow-hidden">
        {/* <Header />
        <div className="flex h-full">
          <Categories />
          <Outlet />
        </div> */}
        <Outlet />
      </div>

    </>
  );
}

export default Page;