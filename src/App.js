import React, { useState, useEffect } from "react";
import zhCN from "antd/es/locale/zh_CN";

import {
  Form,
  Select,
  InputNumber,
  DatePicker,
  Switch,
  Slider,
  Button,
  Rate,
  Typography,
  Space,
  Divider,
  ConfigProvider,
  Calendar,
  Row,
  Col,
} from "antd";
import moment from "moment";
import "./App.less";
import "moment/locale/zh-cn";

const { Option } = Select;
const { Title } = Typography;

moment.locale("zh-cn");

const App = () => {
  const [time, setTime] = useState(30);
  const [start, setStart] = useState(moment());
  const [target, setTarget] = useState("");

  const calc = () => {
    const copy = moment(start);
    const t = copy.subtract(time, "days").format("LL");
    setTarget(t);
  };

  useEffect(() => {
    calc();
  }, []);

  useEffect(() => {
    calc();
  }, [start, time]);

  return (
    <ConfigProvider locale={zhCN}>
      <section style={{ textAlign: "center", marginTop: 48, marginBottom: 40 }}>
        <Space align="start">
          <Title level={2} style={{ marginBottom: 0 }}>
            火车票时间计算
          </Title>
        </Space>
      </section>
      <Divider style={{ marginBottom: 60 }}></Divider>
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
        <Form.Item label="预售时间">
          <Space>
            <InputNumber
              onChange={(v) => setTime(v)}
              min={1}
              max={100}
              defaultValue={30}
            />
            <Button type="primary" onClick={() => setTime(30)}>
              正常(30天)
            </Button>
            <Button type="primary" onClick={() => setTime(90)}>
              过年(90天)
            </Button>
          </Space>
        </Form.Item>

        <Row>
          <Col span={8} style={{ textAlign: "right" }}>
            <span>选择出发日期：</span>
          </Col>
          <Col span={8}>
            <div className="site-calendar-demo-card">
              <Calendar
                onChange={(date) => {
                  setStart(date);
                }}
                fullscreen={false}
                defaultValue={moment()}
              />
            </div>
          </Col>
        </Row>

        <Form.Item label="你应该在" style={{ marginTop: 20 }}>
          <Space>
            <Title level={2} style={{ color: "#f00", marginBottom: 0 }}>
              {target}
            </Title>
            <span>买票</span>
          </Space>
        </Form.Item>

        {/*<Form.Item label="日期范围选择框">
        <DatePicker.RangePicker />
      </Form.Item>*/}

        {/*<Form.Item wrapperCol={{ span: 8, offset: 8 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button>Cancel</Button>
          </Space>
        </Form.Item>*/}
      </Form>
    </ConfigProvider>
  );
};

export default App;
