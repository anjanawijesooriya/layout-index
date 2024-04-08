import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Spin,
  Tooltip,
  notification,
  DatePicker,
  Select,
} from "antd";
import {
  FileDoneOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import axios from "axios";

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

const AddLocations = () => {
  const [loader, setLoader] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  //additional
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 2000);
  }, []);

  const locationHandler = async (placement) => {
    setLoading(true);
    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post(
        "http://localhost:8070/locations/add",
        {
          name,
          address,
          phone,
        },
        config
      );

      setTimeout(() => {
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "You have successfully added a new location",
          placement,
        });
        form.resetFields();
      }, 3000);
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error.response.data.error,
        placement,
      });
      setError(true);
      form.resetFields();
      setLoading(false);
    }
  };

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
      {loader === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} size="large" />
        </center>
      ) : (
        <div className=" mt-40">
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={() => locationHandler("top")}
          >
            <center>
              {error && <span style={{ color: "red" }}>{error}</span>}
            </center>
            <Form.Item
              name="name"
              label="Location Name"
              rules={[
                {
                  required: true,
                  max: 20,
                  min: 5,
                },
              ]}
            >
              <Input
                style={{ width: "50%" }}
                placeholder="enter location name"
                prefix={<FileDoneOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="Enter Location Name ex: OneGalle Face">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
                showCount
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <Input
                style={{ width: "50%" }}
                placeholder="enter address"
                prefix={<FileDoneOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="Enter Address ex: Colombo">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
                showCount
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Item>

            <Form.Item name="phone" label="Phone Number">
              <Input
                style={{ width: "50%" }}
                placeholder="enter phone number"
                prefix={<FileDoneOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="Enter Phone Number ex: 0771234567">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
                showCount
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;
              <Button type="primary" htmlType="submit">
                {loading ? (
                  <>
                    <Spin indicator={<LoadingOutlined />} /> Location adding in
                    Progess...
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
      )}
    </>
  );
};

export default AddLocations;
