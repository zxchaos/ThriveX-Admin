import React, { useEffect, useState } from 'react';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';

import { getSystemDataAPI } from '@/api/Project';
import { System } from '@/types/project';
import HeaderInfo from './components/HeaderInfo';
import { Card } from 'antd';

const ECommerce: React.FC = () => {
  const [system, setSystem] = useState<System>({} as System)

  const getSystemData = async () => {
    const { data } = await getSystemDataAPI()
    setSystem(data)
  }

  useEffect(() => {
    getSystemData()
  }, [])

  return (
    <>
      <Card>
        <HeaderInfo />
      </Card>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
