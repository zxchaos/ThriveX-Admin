import { Card } from 'antd';
import HeaderInfo from './components/HeaderInfo';
import Stats from './components/Stats';

const Home = () => {
  return (
    <>
      <Card className='[&>.ant-card-body]:!p-3'>
        <HeaderInfo />
      </Card>

      <Stats />
    </>
  );
};

export default Home;
