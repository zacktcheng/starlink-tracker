import React from "react";
import Title from "antd/lib/typography/Title";
import { List, Checkbox, Avatar } from "antd";
import satelliteImage from '../images/satellite-1.svg';

const SatelliteList = ({
  satList,
  updateSatelliteList,
  loading,
  disabled
}) => {
  const onSelectionChange = (checked, targetSatllite) => {
    const nextSatlliteList = satList.map((satllite) => {
      if (satllite.satid === targetSatllite.satid) {
        return {
          ...satllite,
          selected: checked
        }
      }
      else {
        return {
          ...satllite
        }
      }
    });

    updateSatelliteList(nextSatlliteList);
  }

  return (
    <section>
      <Title level={5} style={{ color: '#eefbfb' }}>Nearby Satellites ({satList? satList.length : 0})</Title>
      <hr/>
      <List 
        className="sat-list"
        itemLayout="horizontal"
        size="small"
        dataSource={satList}
        loading={loading}
        renderItem={ item => (
            <List.Item 
              actions={[<Checkbox onChange={(e) => onSelectionChange(e.target.checked, item)} checked={item.selected} disabled={disabled} />]}>
                <List.Item.Meta
                  avatar={<Avatar src={satelliteImage} size="default" alt="satellite" style={{ borderRadius: 50, border: '2px solid' }}/>}
                  title={<><span>{item.satname}</span><span className="item-subTitle">{`Launch Date: ${item.launchDate}`}</span></>}
                />
            </List.Item>
        )}
      />
    </section>
  )
}

export default SatelliteList;