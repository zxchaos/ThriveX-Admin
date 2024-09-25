import { Button, Card, Drawer, Dropdown, MenuProps, message } from 'antd';
import { BiSave } from "react-icons/bi";

import VditorEditor from './components/VditorMD';
import PublishForm from './components/PublishForm';
import { useEffect, useState } from 'react';

import Title from '@/components/Title';
import { Article } from '@/types/app/article';
import { getArticleDataAPI } from '@/api/Article'
import { useSearchParams } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'AI 续写',
  },
  {
    key: '2',
    label: 'AI 优化',
  },
  {
    key: '3',
    label: 'AI 生成',
  },
];

const CreatePage = () => {
  const [params] = useSearchParams()
  const id = +params.get('id')!

  const [data, setData] = useState<Article>({} as Article)
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

  // 获取文章数据
  const getArticleData = async () => {
    const { data } = await getArticleDataAPI(id)
    setData(data)
    setContent(data.content)
  }

  useEffect(() => {
    if (id) getArticleData()
  }, [id])

  useEffect(() => {
    setData({ ...data, content })
  }, [content])

  return (
    <>
      <Title value="创作" />

      <Card className='relative mt-2'>
        <div className='absolute top-[4.5%] right-[5%] z-10 flex space-x-4'>
          <Dropdown.Button menu={{ items }}>创作神器</Dropdown.Button>

          <Button type="primary" className='w-full flex justify-between' onClick={baseBtn} >
            <BiSave className='text-base' /> 保存
          </Button>
        </div>

        <VditorEditor value={content} getValue={getVditorData} />

        <Drawer
          title={data.id ? "编辑文章" : "发布文章"}
          placement="right"
          size='large'
          closable={false}
          onClose={() => setPublishOpen(false)}
          open={publishOpen}
        >
          <PublishForm data={data} closeModel={() => setPublishOpen(false)} />
        </Drawer>
      </Card >
    </>
  );
};

export default CreatePage;
