import Title from "antd/lib/typography/Title";
import React from "react";
import { InputNumber, Select, Form, Button } from "antd";

const ObserverInfo = (props) => {
  const onFormFinish = (observerInfo) => {
    props.findSatellitesOnClick(observerInfo);
  }

  const { Option } = Select;

  return (
    <section>
      <Title level={5} style={{ color: '#eefbfb' }}>Observer Info &#129122;</Title>
      <hr/>
      <Form
        initialValues={{ 
          latitude: "0", longitude: "0", altitude: "0", radius: "67.5", category: "52"
        }}
        size="small"
        onFinish={onFormFinish}
      >
        <div className="form-buttons">
          <Form.Item
            label="Latitude"
            name="latitude"
          >
            <InputNumber size="small" min={-90} max={90} disabled={props.disabled} />
          </Form.Item>
          <Form.Item
            label="Longitude"
            name="longitude"
          >
            <InputNumber size="small" min={-180} max={180} disabled={props.disabled} />
          </Form.Item>
          <Form.Item
            label="Altitude(m)"
            name="altitude"
          >
            <InputNumber size="small" min={-413} max={8850} disabled={props.disabled} />
          </Form.Item>
          <Form.Item
            label="Radius"
            name="radius"
          >
            <Select
              style={{ width: 90 }}
              size="small"
            >
              <Option value="45">Small</Option>
              <Option value="67.5">Medium</Option>
              <Option value="90">Large</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
          >
            <Select 
              style={{ width: 180 }}
              size="small"
            >
              <Option value="52">Starlink</Option>
              <Option value="2">The Intl. Space Station</Option>
              <Option value="15">Iridium</Option>
              <Option value="5">GOES</Option>
              <Option value="22">Galileo</Option>
              <Option value="30">Military</Option>
              <Option value="26">Space & Earth Science</Option>
              <Option value="34">TV</Option>
              <Option value="18">Amateur radio</Option>
              <Option value="35">Beidou Navigation System</Option>
            </Select>
          </Form.Item>
        </div>
        <Form.Item /*{...tailLayout}*/>
          <Button 
            type="primary" 
            size="default" 
            shape="round" 
            htmlType="submit" 
            disabled={props.loading || props.disabled}
          >
            Search nearby satellites
          </Button>
        </Form.Item>
      </Form>
    </section>
  )
}

export default ObserverInfo;