import { Card } from 'antd';
import HeaderInfo from './components/HeaderInfo';
import Stats from './components/Stats';

const Home = () => {
  return (
    <>
      <Card>
        <HeaderInfo />
      </Card>

      <Stats />
    </>
  );
};

export default Home;
