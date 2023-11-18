import { HtmlProps } from '@react-three/drei/web/Html';
import { Html } from '@react-three/drei';
import React, { ReactNode, useState, forwardRef, useImperativeHandle } from 'react';
import { CloseOutlined, ApiFilled } from '@ant-design/icons';
import { BorderBox8, Decoration10 } from '@jiaminghi/data-view-react';
import './index.less';
export interface IAnnotationDataItem {
  label: string;
  value: string;
  icon?: ReactNode;
}

interface IProps {
  title?: string;
  position?: THREE.Vector3;
  customAnnotationContent?: ReactNode;
  htmlProps?: HtmlProps;
  data?: IAnnotationDataItem[];
  annotationContentBeforeRender?: ReactNode;
}

export interface IAnnotationRef {
  show: () => void;
  hide: () => void;
}

const defaultHtmlProps: HtmlProps = {};
const defaultIcon: ReactNode = <ApiFilled />;
const renderDefaultAnnotationTemplate = (data: IAnnotationDataItem[]) => (
  <div className="list">
    {data.map(({ icon, label, value }) => (
      <div className="item item-decoration" key={label}>
        <div className="left">
          <div className="icon">{icon || defaultIcon}</div>
          <div className="label">{label}：</div>
        </div>
        <div className="value">{value}</div>
      </div>
    ))}
  </div>
);

// eslint-disable-next-line
const Annotation = forwardRef<IAnnotationRef, IProps>((props, ref) => {
  const {
    title,
    position,
    customAnnotationContent,
    htmlProps,
    data,
    annotationContentBeforeRender,
  } = props;
  const [annotationVisible, setAnnotationVisible] = useState(true);

  useImperativeHandle(ref, () => ({
    show: () => setAnnotationVisible(true),
    hide: () => setAnnotationVisible(false),
  }));

  const cardClass = `line ${annotationVisible ? 'slide-in-elliptic-top-fwd' : ''}`;

  return annotationVisible ? (
    <Html
      position={position}
      distanceFactor={350}
      {...defaultHtmlProps}
      {...htmlProps}
      transform
      sprite
    >
      <BorderBox8 className={cardClass} style={{ padding: '3px' }}>
        <div className="card">
          <div className="header">
            <div className="title">{title}</div>
            <CloseOutlined
              className="close"
              onClick={() => setAnnotationVisible(false)}
            ></CloseOutlined>
          </div>
          <Decoration10 style={{ width: '100%', height: '5px' }} />
          {annotationContentBeforeRender}
          <div className="content">
            {customAnnotationContent ?? renderDefaultAnnotationTemplate(data || [])}
          </div>
        </div>
      </BorderBox8>
    </Html>
  ) : null;
});

export default Annotation;
