import { useState, useEffect } from 'react';
import { Table, Button, Tag, notification, Card, Popconfirm, Form, Input, DatePicker } from 'antd';
import { titleSty } from '@/styles/sty'
import Title from '@/components/Title';
import { Link } from 'react-router-dom';

import { delFootprintDataAPI, getFootprintListAPI } from '@/api/Footprint';
import type { Footprint, FilterFootprint, FilterForm } from '@/types/app/footprint';

import dayjs from 'dayjs';

const FootprintPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [footprintList, setFootprintList] = useState<Footprint[]>([]);

  const { RangePicker } = DatePicker;

  const getFootprintList = async () => {
    setLoading(true);

    const { data } = await getFootprintListAPI();
    setFootprintList(data as Footprint[]);

    setLoading(false);
  };

  useEffect(() => {
    getFootprintList()
  }, []);

  const delFootprintData = async (id: number) => {
    setLoading(true);

    await delFootprintDataAPI(id);
    notification.success({ message: '🎉 删除足迹成功' })
    getFootprintList();

    setLoading(false);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 100,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      width: 150,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      width: 200,
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      align: 'center',
      width: 200,
    },
    {
      title: '坐标纬度',
      dataIndex: 'position',
      key: 'position',
      align: 'center',
      width: 200,
      render: (list: number[]) => list.map((item, index) => <Tag key={index}>{item}</Tag>)
    },
    {
      title: '图片',
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      width: 200,
      render: (images: string[]) => images.map((image, index) => <Tag key={index}>{image}</Tag>)
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      width: 200,
      render: (text: string) => dayjs(+text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      align: 'center',
      render: (text: string, record: Footprint) => (
        <div className='flex space-x-2'>
          <Link to={`/create?id=${record.id}`}>
            <Button>修改</Button>
          </Link>

          <Popconfirm title="警告" description="你确定要删除吗" okText="确定" cancelText="取消" onConfirm={() => delFootprintData(record.id!)}>
            <Button type="primary" danger>删除</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onSubmit = async (values: FilterForm) => {
    const query: FilterFootprint = {
      key: values.address ? values.address : null,
      startDate: values.createTime ? values.createTime[0].valueOf() + '' : null,
      endDate: values.createTime ? values.createTime[1].valueOf() + '' : null,
    }

    const { data } = await getFootprintListAPI({ query });
    setFootprintList(data as Footprint[]);
  }

  return (
    <>
      <Title value="足迹管理" />

      <Card className='my-2 overflow-scroll'>
        <Form layout="inline" onFinish={onSubmit} autoComplete="off" className='flex-nowrap'>
          <Form.Item label="地址" name="address" className='w-2/12'>
            <Input placeholder='请输入地址关键词' />
          </Form.Item>

          <Form.Item label="时间范围" name="createTime" className='w-3/12'>
            <RangePicker placeholder={["选择起始时间", "选择结束时间"]} />
          </Form.Item>

          <Form.Item className='pr-6'>
            <Button type="primary" htmlType="submit">查询</Button>
          </Form.Item>
        </Form>
      </Card>

      <Card className={`${titleSty}`}>
        <Table
          rowKey="id"
          dataSource={footprintList}
          columns={columns as any}
          loading={loading}
          scroll={{ x: 'max-content' }}
          pagination={{
            position: ['bottomCenter'],
            pageSize: 8
          }}
        />
      </Card>
    </>
  );
};

export default FootprintPage;