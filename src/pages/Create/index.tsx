import { Button, Card, Drawer } from 'antd';
import { BiSave } from "react-icons/bi";

import VditorEditor from './components/VditorMD';
import PublishForm from './components/PublishForm';
import { useEffect, useState } from 'react';

import { addCateDataAPI, delCateDataAPI, editCateDataAPI, getCateDataAPI, getCateListAPI } from '@/api/Cate'
import Title from '@/components/Title';

const CreatePage = () => {
  const [content, setContent] = useState('');
  const [publishOpen, setPublishOpen] = useState(false)

  // 获取编辑器的内容
  const getVditorData = (value: string) => {
    console.log(111, value);
  }

  useEffect(() => {
    console.log(content);
    getCateListAPI().then(async res => {
      console.log(await res);
    })
  }, [content])

  return (
    <>
      <Title value="创作" />

      <Card className='mt-2'>
        <div className='fixed bottom-10 right-[5%] w-22 z-10'>
          <Button type="primary" className='w-full' onClick={() => setPublishOpen(true)} >
            <BiSave className='text-base' /> 保存</Button>
        </div>

        <VditorEditor getValue={getVditorData} />

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

export default CreatePage;
