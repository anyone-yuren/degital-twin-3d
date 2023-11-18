import { observer, ThreeStoreContext, ThreeStore } from 'mobx-threejs-store';
import React, { useContext, useState } from 'react';
import { Button, Form, Input, Radio, Switch } from 'antd';
type LayoutType = Parameters<typeof Form>[0]['layout'];
const Tools = () => {
  const mobxStore = useContext(ThreeStoreContext);
  const [formLayout, setFormLayout] = useState<LayoutType>('inline');
  // console.log('threeStore', ThreeStore.visible);

  const onFormLayoutChange = (values) => {
    mobxStore.threeStore.setCameraCtrls({ ...mobxStore.threeStore.cameraCtrls, ...values });
    // ThreeStore.setVisible(!ThreeStore.visible);
  };
  return (
    <>
      {/* <p>响应{String(ThreeStore.visible)}</p> */}
      <Form
        layout={'inline'}
        className="absolute bottom-0 left-0 translate-x-[-100%] flex-nowrap w-max"
        initialValues={{ layout: formLayout }}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="自动巡航" name="autoCruise">
          <Switch />
        </Form.Item>
        <Form.Item label="控制器切换" name="choiceCtrls">
          <Radio.Group>
            <Radio value="0">按键控制</Radio>
            <Radio value="1">自由控制</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </>
  );
};

export default observer(Tools);
