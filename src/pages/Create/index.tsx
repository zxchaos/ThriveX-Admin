import { Button, Card, Drawer, Dropdown, MenuProps, message } from 'antd';
import { BiSave } from "react-icons/bi";

import VditorEditor from './components/VditorMD';
import PublishForm from './components/PublishForm';
import { useEffect, useState } from 'react';

import Title from '@/components/Title';
import { Article } from '@/types/app/article';
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
    setContent(value)
  }

  // 保存文章
  const saveBtn = () => {
    content.trim().length >= 1 ? setPublishOpen(true) : message.error('请输入文章内容')
  }

  // 下一步
  const nextBtn = () => {
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


  // 解析接口数据
  const parsingData = async (command: string) => {
    const res = await fetch(`/ai/v1/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_AI_APIPassword}`
      },
      body: JSON.stringify({
        model: import.meta.env.VITE_AI_MODEL,
        messages: [{
          role: "user",
          content: `${command}${content}`
        }],
        stream: true
      })
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let receivedText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      receivedText += decoder.decode(value, { stream: true });

      // 处理每一块数据
      const lines = receivedText.split("\n");
      for (let i = 0; i < lines.length - 1; i++) {
        const line = lines[i].trim();
        if (line.startsWith("data:")) {
          const jsonString = line.substring(5).trim();
          if (jsonString !== "[DONE]") {
            const data = JSON.parse(jsonString);
            console.log("Received chunk:", data.choices[0].delta.content);
            setContent((content) => content + data.choices[0].delta.content);
            // 在这里处理每一块数据
          } else {
            console.log("Stream finished.");
            return;
          }
        }
      }

      // 保留最后一行未处理的数据
      receivedText = lines[lines.length - 1];
    }
  }

  // AI功能
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'AI 续写',
      onClick: async () => {
        parsingData("帮我续写：")
      },
    },
    {
      key: '2',
      label: 'AI 优化',
      onClick: async () => {
        parsingData("帮我优化该文章，意思不变：")
      },
    },
    {
      key: '3',
      label: 'AI 生成',
      onClick: async () => {
        parsingData("")
      },
    },
  ];

  return (
    <>
      <Title value="创作" />

      <Card className='relative mt-2'>
        <div className='absolute top-[4.5%] right-[5%] z-10 flex space-x-4'>
          <Dropdown.Button menu={{ items }}>创作神器</Dropdown.Button>

          <Button className='w-full flex justify-between' onClick={saveBtn} >
            <BiSave className='text-base' /> 保存
          </Button>

          <Button type="primary" className='w-full flex justify-between' onClick={nextBtn} >
            <BiSave className='text-base' /> 下一步
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
