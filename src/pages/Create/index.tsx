import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Button } from 'antd';

const Create = () => {
  return (
    <>
      <Breadcrumb pageName="Calendar" />
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </>
  );
};

export default Create;
