import { Card } from 'antd';
import HeaderInfo from './components/HeaderInfo';

const Home = () => {
  return (
    <>
      <Card>
        <HeaderInfo />
      </Card>

      <Card className='mt-2'>
        暂时没有灵感，先空着
      </Card>
    </>
  );
};

export default Home;
