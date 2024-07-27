import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { Card } from 'antd';

import VditorEditor from './components/VditorMD';
import { useEffect, useState } from 'react';

const Create = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    console.log(content);
  }, [content])

  return (
    <>
      <Card title={<Breadcrumb pageName="创作"/>} className='border-stroke dark:border-strokedark [&>.ant-card-head]:border-stroke [&>.ant-card-head]:dark:border-strokedark dark:bg-boxdark'>
        <VditorEditor />
      </Card>
    </>
  );
};

export default Create;
