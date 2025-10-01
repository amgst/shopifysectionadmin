import { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Switch, Select, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { Action, InsertAction } from '@shared/schema';
import type { UploadFile } from 'antd/es/upload/interface';

const { TextArea } = Input;

interface ActionModalProps {
  visible: boolean;
  action?: Action | null;
  onCancel: () => void;
  onSubmit: (values: InsertAction) => void;
  loading?: boolean;
}

export default function ActionModal({ 
  visible, 
  action, 
  onCancel, 
  onSubmit,
  loading = false 
}: ActionModalProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible && action) {
      form.setFieldsValue({
        ...action,
        filters: action.filters || [],
      });
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, action, form]);

  const handleSubmit = () => {
    form.validateFields()
      .then((values) => {
        onSubmit(values);
        form.resetFields();
      })
      .catch((error) => {
        console.error('Validation failed:', error);
      });
  };

  const categoryOptions = [
    { label: 'Hero', value: 'Hero' },
    { label: 'Banner', value: 'Banner' },
    { label: 'Featured', value: 'Featured' },
    { label: 'Promotional', value: 'Promotional' },
  ];

  const filterOptions = [
    { label: 'Hero', value: 'hero' },
    { label: 'Banner', value: 'banner' },
    { label: 'Featured', value: 'featured' },
    { label: 'New', value: 'new' },
  ];

  return (
    <Modal
      title={action ? 'Edit Action' : 'Create New Action'}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      okText={action ? 'Update' : 'Create'}
      cancelText="Cancel"
      width={600}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          downloads: 0,
          isPremium: false,
          filters: [],
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input 
            placeholder="Enter action title" 
            data-testid="input-title"
          />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select 
            placeholder="Select category" 
            options={categoryOptions}
            data-testid="select-modal-category"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <TextArea
            rows={4}
            placeholder="Enter action description"
            data-testid="input-description"
          />
        </Form.Item>

        <Form.Item
          name="thumbnail"
          label="Thumbnail URL"
          rules={[
            { required: true, message: 'Please enter a thumbnail URL' },
            { type: 'url', message: 'Please enter a valid URL' }
          ]}
        >
          <Input 
            placeholder="https://example.com/image.jpg" 
            data-testid="input-thumbnail"
          />
        </Form.Item>

        <Form.Item
          name="downloads"
          label="Downloads"
        >
          <InputNumber
            min={0}
            style={{ width: '100%' }}
            placeholder="0"
            data-testid="input-downloads"
          />
        </Form.Item>

        <Form.Item
          name="filters"
          label="Filters"
        >
          <Select
            mode="tags"
            placeholder="Select or add filters"
            options={filterOptions}
            data-testid="select-filters"
          />
        </Form.Item>

        <Form.Item
          name="isPremium"
          label="Premium Status"
          valuePropName="checked"
        >
          <Switch 
            checkedChildren="Premium" 
            unCheckedChildren="Free"
            data-testid="switch-premium"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
