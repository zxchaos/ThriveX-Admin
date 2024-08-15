import React, { useEffect, useState } from 'react';
import { getSystemDataAPI } from '@/api/Project';
import { System } from '@/types/app/project';
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

      <Card className='mt-2'>

      </Card>
    </>
  );
};

export default ECommerce;
