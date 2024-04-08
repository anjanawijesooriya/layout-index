import { Button, Popover } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

  const [open, setOpen] = useState(false);

  const history = useNavigate();

  const logoutHandler = () => {
    localStorage.setItem("authToken", null);
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("type");
    localStorage.removeItem("id");
    history("/");
  };

  const addLocationHandler = () => {
    history("/add-location");
  }

  const content = (
    <div style={{ width: "2px" }}>
      <div>
        <Button onClick={addLocationHandler}>Add Locations</Button>
      </div>
      <div className="mt-1">
        <Button
          onClick={() =>
            history(
              `/home/${localStorage.getItem(
                "username"
              )}/my-profile`
            )
          }
        >
          Profile
        </Button>
      </div>
      <div className="mt-1">
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </div>
  );

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-10">
      <div className="md:flex items-center justify-between bg-zinc-600 py-1 md:px-10 px-7">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-sky-600">
          <div className=" w-10 h-10 mr-1">
            
          </div>
          <span className="text-2xl">Location Detailer</span>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-8 cursor-pointer md:hidden text-white"
        >
          <ion-icon name={open ? "close" : "menu-sharp"}></ion-icon>
        </div>
          <ul
            className={`md:flex md:items-center font-semibold md:pb-0 mt-3  pb-0 absolute md:static bg-zinc-600   md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-10 transition-all duration-500 ease-in ${
              open ? "top-21 opacity-100" : "top-[-490px]"
            } md:opacity-100`}
          >
            <div className=" flex ite">
              <button className="inline-flex items-center bg-sky-600 text-white border-0 mb-2 px-3 focus:outline-none hover:bg-black rounded-full text-base mt-2 md:mt-0 translate-x-6">
                <Popover
                  placement="bottom"
                  content={content}
                  title={`Hello ${localStorage.getItem("username")} ❤️`}
                  trigger="hover"
                >
                  My Account
                </Popover>
              </button>
            </div>
          </ul>
      </div>
    </div>
  );
};

export default NavBar;