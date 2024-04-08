import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Spin, Result, Card } from "antd";
import { FileExcelTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const Home = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const history = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 2000);
    (async () => {
      await axios
        .get("http://localhost:8070/locations/")
        .then((res) => setData(res.data.data))
        .catch((err) => console.log(err));
    })();
  }, []);

  return (
    <div>
      <center>
        <h1 className=" text-3xl text-blue-700">
          Welcome To Location Detailer
        </h1>
      </center>
      <hr />
      {loader === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} size="large" />
        </center>
      ) : data.length === 0 ? (
        <center>
          <Result
            style={{ marginTop: "200px" }}
            icon={<FileExcelTwoTone />}
            title="No Locations Yet...!"
          />
        </center>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 p-5">
          {data.map((i) => (
            <div className=" group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80 lg:aspect-none">
              <img
                  src="https://www.lifewire.com/thmb/YBQuRMKxxhx3Zb3uJ1x-QOT6VsM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Maplocation_-5a492a4e482c52003601ea25.jpg"
                  alt="image"
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 justify-between">
                <center>
                  <div className=" mt-2">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <span aria-hidden="true" className="inset-0" />
                        {i.name}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-700">{i.address}</p>
                    <p className="mt-1 text-sm text-gray-500">{i.phone}</p>
                  </div>
                  <Button
                    style={{ marginTop: "40px" }}
                    type="primary"
                    shape="round"
                    onClick={() =>
                      history(
                        `/location-view/${i._id}`
                      )
                    }
                  >
                    View Location
                  </Button>
                </center>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
