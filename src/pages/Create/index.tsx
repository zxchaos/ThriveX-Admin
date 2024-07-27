import Breadcrumb from '@/components/Breadcrumbs';
import { Button, Card, Drawer } from 'antd';
import { BiSave } from "react-icons/bi";

import VditorEditor from './components/VditorMD';
import PublishForm from './components/PublishForm';
import { useEffect, useState } from 'react';

const Create = () => {
  const [content, setContent] = useState('');
  const [publishOpen, setPublishOpen] = useState(false)

  useEffect(() => {
    console.log(content);
  }, [content])

  return (
    <>
      <Card title={<Breadcrumb pageName="创作" />} className='border-stroke dark:border-strokedark [&>.ant-card-head]:border-stroke [&>.ant-card-head]:dark:border-strokedark dark:bg-boxdark [&>.ant-card-body]:pt-2'>
        <div className='fixed bottom-10 right-[5%] w-22 z-10'>
          <Button type="primary" className='w-full' onClick={() => setPublishOpen(true)} >
            <BiSave className='text-base' /> 保存</Button>
        </div>

        <VditorEditor />

        <Drawer
          title="发布文章"
          placement="right"
          closable={false}
          onClose={() => setPublishOpen(false)}
          open={publishOpen}
        >
          <PublishForm />
        </Drawer>
      </Card >
    </>
  );
};

export default Create;
