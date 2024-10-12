import { useState, useEffect } from 'react';
import { Table, Button, Tag, notification, Card, Popconfirm, Form, Input, DatePicker, Modal, Spin, message } from 'antd';
import { titleSty } from '@/styles/sty';
import Title from '@/components/Title';
import { delFootprintDataAPI, getFootprintListAPI, addFootprintDataAPI, editFootprintDataAPI, getFootprintDataAPI } from '@/api/Footprint';
import type { Footprint, FilterForm } from '@/types/app/footprint';
import dayjs from 'dayjs';

const FootprintPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [footprintList, setFootprintList] = useState<Footprint[]>([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [footprint, setFootprint] = useState<Footprint>({} as Footprint);
  const [isMethod, setIsMethod] = useState<'create' | 'edit'>('create');
  const [form] = Form.useForm();

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
      width: 400,
      render: (value: string) => <div className='line-clamp-3'>{value}</div>
    },
    {
      title: '坐标纬度',
      dataIndex: 'position',
      key: 'position',
      align: 'center',
      width: 200,
      render: (value: string) => <Tag>{value}</Tag>
    },
    {
      title: '时间',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center',
      width: 200,
      render: (time: string) => dayjs(+time).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      align: 'center',
      render: (text: string, record: Footprint) => (
        <div className='flex space-x-2'>
          <Button onClick={() => editFootprintData(record.id!)}>修改</Button>
          <Popconfirm title="警告" description="你确定要删除吗" okText="确定" cancelText="取消" onConfirm={() => delFootprintData(record.id!)}>
            <Button type="primary" danger>删除</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const { RangePicker } = DatePicker;

  const getFootprintList = async () => {
    setLoading(true);
    const { data } = await getFootprintListAPI();
    setFootprintList(data as Footprint[]);
    setLoading(false);
  };

  useEffect(() => {
    getFootprintList();
  }, []);

  const reset = () => {
    setIsMethod("create");
    form.resetFields();
    setFootprint({} as Footprint);
    setIsModelOpen(false);
  }

  const delFootprintData = async (id: number) => {
    setLoading(true);
    await delFootprintDataAPI(id);
    notification.success({ message: '🎉 删除足迹成功' });
    getFootprintList();
    setLoading(false);
  };

  const addFootprintData = () => {
    setIsMethod("create");
    setIsModelOpen(true);
    form.resetFields();
    setFootprint({} as Footprint);
  };

  const editFootprintData = async (id: number) => {
    setIsMethod("edit");
    setLoading(true);
    setIsModelOpen(true);

    const { data } = await getFootprintDataAPI(id);

    data.images = (data.images as string[]).join("\n")
    data.createTime = dayjs(+data.createTime)

    setFootprint(data);
    form.setFieldsValue(data);
    setLoading(false);
  };

  const onSubmit = async () => {
    form.validateFields().then(async (values: Footprint) => {
      values.createTime = values.createTime.valueOf()
      values.images = values.images ? (values.images as string).split("\n") : []

      if (isMethod === "edit") {
        await editFootprintDataAPI({ ...footprint, ...values });
        message.success('🎉 修改足迹成功');
      } else {
        await addFootprintDataAPI({ ...footprint, ...values });
        message.success('🎉 新增足迹成功');
      }

      reset()
      getFootprintList();
    });
  };

  const closeModel = () => reset();

  const onFilterSubmit = async (values: FilterForm) => {
    const query: FilterData = {
      key: values.address,
      startDate: values.createTime && values.createTime[0].valueOf() + '',
      endDate: values.createTime && values.createTime[1].valueOf() + ''
    }

    const { data } = await getFootprintListAPI({ query });
    setFootprintList(data as Footprint[]);
  }

  return (
    <>
      <Title value="足迹管理" />

      <Card className='my-2 overflow-scroll'>
        <div className='flex'>
          <Form layout="inline" onFinish={onFilterSubmit} autoComplete="off" className='flex-nowrap w-full'>
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

          <Button type="primary" onClick={addFootprintData}>新增足迹</Button>
        </div>
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

      <Modal title={isMethod === "edit" ? "编辑足迹" : "新增足迹"} open={isModelOpen} onCancel={closeModel} destroyOnClose footer={null}>
        <Form form={form} layout="vertical" initialValues={footprint} size='large' preserve={false} className='mt-6'>
          <Form.Item label="标题" name="title" rules={[{ required: true, message: '标题不能为空' }]}>
            <Input placeholder="请输入标题" />
          </Form.Item>

          <Form.Item label="地址" name="address" rules={[{ required: true, message: '地址不能为空' }]}>
            <Input placeholder="请输入地址" />
          </Form.Item>

          <Form.Item label="坐标纬度" name="position" rules={[{ required: true, message: '坐标纬度不能为空' }]}>
            <Input placeholder="请输入坐标纬度" />
          </Form.Item>

          <Form.Item label="图片" name="images">
            <Input.TextArea
              autoSize={{ minRows: 2, maxRows: 10 }}
              placeholder="请输入图片链接"
            />
          </Form.Item>

          <Form.Item label="内容" name="content" rules={[{ required: true, message: '内容不能为空' }]}>
            <Input.TextArea
              autoSize={{ minRows: 5, maxRows: 10 }}
              placeholder="请输入内容"
            />
          </Form.Item>

          <Form.Item label="时间" name="createTime" rules={[{ required: true, message: '时间不能为空' }]}>
            <DatePicker showTime placeholder='请选择时间' className='w-full' />
          </Form.Item>

          <Form.Item className='!mb-0 flex justify-end'>
            <Button onClick={closeModel}>取消</Button>
            <Button type="primary" onClick={onSubmit} className='ml-2'>确定</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FootprintPage;