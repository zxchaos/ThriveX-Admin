import { Button, Card, Drawer, message } from 'antd';
import { BiSave } from "react-icons/bi";

import VditorEditor from './components/VditorMD';
import PublishForm from './components/PublishForm';
import { useState } from 'react';

import Title from '@/components/Title';

const CreatePage = () => {
  const [content, setContent] = useState('');
  const [publishOpen, setPublishOpen] = useState(false)

  // 获取编辑器的内容
  const getVditorData = (value: string) => {
    setContent(value)
  }

  // 保存文章
  const baseBtn = () => {
    content.trim().length >= 1 ? setPublishOpen(true) : message.error('请输入文章内容')
  }

  return (
    <>
      <Title value="创作" />

      <Card className='relative mt-2'>
        <div className='absolute top-12 right-[5%] w-22 z-10'>
          <Button type="primary" className='w-full flex justify-between' onClick={baseBtn} >
            <BiSave className='text-base' /> 保存
          </Button>
        </div>

        <VditorEditor getValue={getVditorData} />

        <Drawer
          title="发布文章"
          placement="right"
          size='large'
          closable={false}
          onClose={() => setPublishOpen(false)}
          open={publishOpen}
        >
          <PublishForm content={content} />
        </Drawer>
      </Card >
    </>
  );
};

export default CreatePage;
