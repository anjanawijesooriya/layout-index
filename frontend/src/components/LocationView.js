import React, { useState, useEffect } from "react";
import {
  Card,
  Spin,
  Button,
  Table,
  Modal,
  Form,
  Input,
  Tooltip,
  notification,
  Select,
  Upload,
} from "antd";
import {
  FileDoneOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const { Option } = Select;

const LocationView = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const { id } = useParams();

  const [serialNumber, setSerialNumber] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("");

  const history = useNavigate();
  const user = localStorage.getItem("username");

  //additional
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  //modal conditions
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
    (async () => {
      await axios
        .get(`http://localhost:8070/locations/view/${id}`)
        .then((res) => setData(res.data.data))
        .catch((err) => console.log(err));
    })();
  }, []);

  //device adding handler
  const deviceHandler = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("serialNumber", serialNumber);
    formData.append("type", type);
    formData.append("image", image);
    formData.append("status", status);

    const config = {
      //headers
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      await axios.post(
        `http://localhost:8070/devices/add/${id}`,
        formData,
        config
      );
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "You have successfully added a new device",
          placement: "top",
        });
        onReset();
        setIsModalOpen(false);
        setLoader(false);
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error.response.data.error,
        placement: "top",
      });
      setError(true);
      onReset();
      setLoading(false);
    }
  };

  //location delete handler
  const locationDeleteHandler = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8070/locations/delete/${id}`);
      setTimeout(() => {
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "You have successfully deleted the location",
          placement: "top",
        });
        history(`/home/${user}`);
      }, 3000);
    } catch (error) {
      alert(error);
    }
  };

  //delete device handler
  const deleteHandler = async (did) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8070/devices/delete/${did}/${id}`);
      setTimeout(() => {
        setLoading(false);
        notification.info({
          title: "Delete Form",
          message: "Successfully Delete The Device",
          placement: "top",
        });
      }, 3000);
      await axios
        .get(`http://localhost:8070/locations/view/${id}`)
        .then((res) => {
          setTimeout(() => {
            setData(res.data.data);
          }, 3000);
        })
        .catch((error) => alert(error));
    } catch (error) {
      alert(error);
    }
  };

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
    setImage(null);
  };

  //image upload handler
  const onUploadChange = (info) => {
    
    // Set the image file to state when upload is done
    setImage(info.fileList[0].originFileObj);
  };

  const columns = [
    {
      title: "Serial Number",
      dataIndex: "serialNumber",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Device Image",
      render: (record) => (
        <img
          src={require(`../images/${record.image}`)}
          style={{ height: "50px", width: "50px" }}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      render: (record) => (
        <div className="flex">
          <div className=" mr-2"></div>
          <div>
            <Button
              style={{ background: "red", color: "white" }}
              onClick={() => deleteHandler(record._id)}
            >
              Delete
            </Button>
          </div>
        </div>
      ),
      width: 120,
    },
  ];

  return (
    <>
      <div>
        {loader  ? (
          <center>
            <Spin style={{ marginTop: "200px" }} size="large" />
          </center>
        ) : (
          <>
            <div className=" mt-20">
              <center>
                <div>
                  <Card
                    title={`Location Name: ${data?.name} `}
                    bordered={false}
                    style={{
                      width: 1000,
                    }}
                  >
                    <p>Location Address: {data.address}</p>
                    <p>Location Phone No: {data.phone}</p>
                    <div className=" mt-2">
                      <Button
                        style={{ background: "red", color: "white" }}
                        onClick={() => locationDeleteHandler(data._id)}
                      >
                        Delete Location
                      </Button>
                    </div>
                    <br />
                    <hr />
                    <div className=" mt-2">
                      <div className=" flex flex-row justify-center items-center">
                        <h3>Devices</h3>
                        <div className=" ml-10">
                          <Button
                            type="primary"
                            shape="round"
                            onClick={showModal}
                          >
                            {" "}
                            Add Device{" "}
                          </Button>
                        </div>
                      </div>
                      <div className=" mt-10">
                        <Table columns={columns} dataSource={data.devices} />
                      </div>
                    </div>
                  </Card>
                </div>
              </center>
            </div>
            <div>
              <Modal
                title="Add Device"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose={true}
              >
                <div className=" mt-40">
                  <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={() => {
                      deviceHandler();
                    }}
                  >
                    <center>
                      {error && <span style={{ color: "red" }}>{error}</span>}
                    </center>
                    <Form.Item
                      name="serialNumber"
                      label="Serial Number"
                      rules={[
                        {
                          required: true,
                          max: 10,
                          min: 5,
                        },
                      ]}
                    >
                      <Input
                        style={{ width: "50%" }}
                        placeholder="enter serial number"
                        prefix={
                          <FileDoneOutlined className="site-form-item-icon" />
                        }
                        suffix={
                          <Tooltip title="Enter Serial Number ex: d12345">
                            <InfoCircleOutlined
                              style={{ color: "rgba(0,0,0,.45)" }}
                            />
                          </Tooltip>
                        }
                        showCount
                        value={serialNumber}
                        onChange={(e) => setSerialNumber(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item
                      name="type"
                      label="Type"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select Device Type"
                        style={{ width: "50%" }}
                        onChange={(e) => setType(e)}
                      >
                        <Option value="POS">POS</Option>
                        <Option value="Kisok">Kisok</Option>
                        <Option value="Signage">Signage</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      name="image"
                      label="Image"
                      rules={[
                        { required: true, message: "Please upload an image" },
                      ]}
                    >
                      <Upload
                        name="image"
                        listType="picture-card"
                        valuePropName="fileList"
                        showUploadList={false}
                        beforeUpload={() => false} // Prevent default upload behavior
                        onChange={onUploadChange}
                      >
                        {image ? (
                          <img
                            src={URL.createObjectURL(image)}
                            alt="uploaded"
                            style={{ width: "100%" }}
                          />
                        ) : (
                          <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                          </div>
                        )}
                      </Upload>
                    </Form.Item>

                    <Form.Item name="status" label="Status">
                      <Select
                        placeholder="Select Device Status"
                        style={{ width: "50%" }}
                        onChange={(e) => setStatus(e)}
                      >
                        <Option value="Active">Active</Option>
                        <Option value="InActive">InActive</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                      &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                      <Button type="primary" htmlType="submit">
                        {loading ? (
                          <>
                            <Spin indicator={<LoadingOutlined />} /> Device
                            adding in Progess...
                          </>
                        ) : (
                          "Submit"
                        )}
                      </Button>{" "}
                      &nbsp;&nbsp; &nbsp;&nbsp;
                      <Button htmlType="button" onClick={onReset}>
                        Reset
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Modal>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LocationView;