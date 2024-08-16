import { Card } from 'antd';
import { useEffect, useState } from 'react';
import HeaderInfo from './components/HeaderInfo';

const Home = () => {
  const [iterativeRecording, setIterativeRecording] = useState<string[]>([])

  // 从github获取最近10次迭代记录
  const getCommitData = async () => {
    const res = await fetch(`https://api.github.com/repos/LiuYuYang01/ThriveX-Admin/commits?per_page=10`)
    const data = await res.json()
    const result = data.map((item: { commit: { message: string } }) => item.commit.message)
    sessionStorage.setItem('iterative_recording', JSON.stringify(result))
  }

  useEffect(() => {
    // 如果缓存中有值就无需重新调接口
    const data = JSON.parse(sessionStorage.getItem('iterative_recording') || '[]')
    console.log(data);

    data.length ? setIterativeRecording(data) : getCommitData()
  }, [])

  return (
    <>
      <Card>
        <HeaderInfo />
      </Card>

      <Card className='mt-2'>

      </Card>
    </>
  );
};

export default Home;
