import { useState } from 'react';
import { Table, Button, Space, Input, Select, Tag, Image, Popconfirm, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, CrownOutlined } from '@ant-design/icons';
import type { Action } from '@shared/schema';
import type { ColumnsType } from 'antd/es/table';

const { Search } = Input;
const { Text } = Typography;

interface ActionsTableProps {
  actions: Action[];
  onEdit: (action: Action) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
  loading?: boolean;
}

export default function ActionsTable({ 
  actions, 
  onEdit, 
  onDelete, 
  onCreate,
  loading = false 
}: ActionsTableProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedPremium, setSelectedPremium] = useState<string | undefined>(undefined);

  const categories = Array.from(new Set(actions.map(a => a.category)));

  const filteredActions = actions.filter(action => {
    const matchesSearch = action.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         action.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = !selectedCategory || action.category === selectedCategory;
    const matchesPremium = !selectedPremium || 
                          (selectedPremium === 'premium' ? action.isPremium : !action.isPremium);
    return matchesSearch && matchesCategory && matchesPremium;
  });

  const columns: ColumnsType<Action> = [
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: 80,
      render: (thumbnail: string) => (
        <Image
          src={thumbnail}
          alt="thumbnail"
          width={60}
          height={60}
          style={{ objectFit: 'cover', borderRadius: 6 }}
          placeholder
          data-testid={`img-thumbnail-${thumbnail}`}
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: Action) => (
        <Text strong data-testid={`text-title-${record.id}`}>{title}</Text>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag color="blue" data-testid={`tag-category-${category}`}>{category}</Tag>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      render: (description: string) => (
        <Text type="secondary" data-testid={`text-description`}>
          {description.length > 80 ? `${description.substring(0, 80)}...` : description}
        </Text>
      ),
    },
    {
      title: 'Downloads',
      dataIndex: 'downloads',
      key: 'downloads',
      width: 100,
      sorter: (a, b) => a.downloads - b.downloads,
      render: (downloads: number, record: Action) => (
        <Text data-testid={`text-downloads-${record.id}`}>{downloads.toLocaleString()}</Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isPremium',
      key: 'isPremium',
      width: 100,
      render: (isPremium: boolean, record: Action) => (
        isPremium ? (
          <Tag icon={<CrownOutlined />} color="gold" data-testid={`badge-premium-${record.id}`}>Premium</Tag>
        ) : (
          <Tag color="default" data-testid={`badge-free-${record.id}`}>Free</Tag>
        )
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      fixed: 'right',
      render: (_, record: Action) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            data-testid={`button-edit-${record.id}`}
          />
          <Popconfirm
            title="Delete this action?"
            description="This action cannot be undone."
            onConfirm={() => onDelete(record.id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              data-testid={`button-delete-${record.id}`}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <Space wrap>
            <Search
              placeholder="Search actions..."
              allowClear
              style={{ width: 300 }}
              onChange={(e) => setSearchText(e.target.value)}
              prefix={<SearchOutlined />}
              data-testid="input-search"
            />
            <Select
              placeholder="Category"
              style={{ width: 150 }}
              allowClear
              onChange={setSelectedCategory}
              data-testid="select-category"
            >
              {categories.map(cat => (
                <Select.Option key={cat} value={cat}>{cat}</Select.Option>
              ))}
            </Select>
            <Select
              placeholder="Status"
              style={{ width: 120 }}
              allowClear
              onChange={setSelectedPremium}
              data-testid="select-status"
            >
              <Select.Option value="premium">Premium</Select.Option>
              <Select.Option value="free">Free</Select.Option>
            </Select>
          </Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onCreate}
            data-testid="button-create"
          >
            Add New Action
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={filteredActions}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} actions`,
            pageSizeOptions: ['10', '25', '50'],
          }}
          scroll={{ x: 1200 }}
        />
      </Space>
    </div>
  );
}
