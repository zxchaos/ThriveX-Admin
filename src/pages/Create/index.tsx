import { Button, Card, Drawer, message } from 'antd';
import { BiSave } from "react-icons/bi";

import VditorEditor from './components/VditorMD';
import PublishForm from './components/PublishForm';
import { useEffect, useState } from 'react';

import Title from '@/components/Title';
import { Article } from '@/types/article';
import { getArticleDataAPI } from '@/api/Article'
import { useSearchParams } from 'react-router-dom';

const CreatePage = () => {
  const [params] = useSearchParams()
  const id = +params.get('id')!

  const [data, setData] = useState<Article>({} as Article)
  const [content, setContent] = useState('');
  const [publishOpen, setPublishOpen] = useState(false)

  // 获取编辑器的内容
  const getVditorData = (value: string) => {
    console.log(value, 333);

    setContent(value)
  }

  // 保存文章
  const baseBtn = () => {
    content.trim().length >= 1 ? setPublishOpen(true) : message.error('请输入文章内容')
  }

  // 获取文章数据
  const getArticleData = async () => {
    const { data } = await getArticleDataAPI(id)
    setData(data)
    console.log(222,data);
  }

  useEffect(() => {
    if (id) {
      console.log(111);
      
      getArticleData()
    }
  }, [id])

  useEffect(() => {
    if (data.id) {
      setContent(data.content)
      console.log(333,data);
    }
  }, [data])

  return (
    <>
      <Title value="创作" />

      <Card className='relative mt-2'>
        <div className='absolute top-12 right-[5%] w-22 z-10'>
          <Button type="primary" className='w-full flex justify-between' onClick={baseBtn} >
            <BiSave className='text-base' /> 保存
          </Button>
        </div>

        <VditorEditor value={data.content} getValue={getVditorData} />

        <Drawer
          title={data.id ? "编辑文章" : "发布文章"}
          placement="right"
          size='large'
          closable={false}
          onClose={() => setPublishOpen(false)}
          open={publishOpen}
        >
          <PublishForm data={data} />
        </Drawer>
      </Card >
    </>
  );
};

export default CreatePage;
