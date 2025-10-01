import { useState } from 'react';
import { Typography, message } from 'antd';
import ActionsTable from '../components/ActionsTable';
import ActionModal from '../components/ActionModal';
import type { Action, InsertAction } from '@shared/schema';

const { Title } = Typography;

const mockActions: Action[] = [
  {
    id: '1',
    title: 'Hero Section Modern',
    category: 'Hero',
    description: 'A beautiful hero banner section with customizable background and text overlay',
    downloads: 1250,
    isPremium: false,
    thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop',
    filters: ['hero', 'banner'],
  },
  {
    id: '2',
    title: 'E-commerce Hero',
    category: 'Hero',
    description: 'Professional e-commerce hero banner with product showcase',
    downloads: 890,
    isPremium: true,
    thumbnail: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&h=300&fit=crop',
    filters: ['hero', 'featured'],
  },
  {
    id: '3',
    title: 'Corporate Banner',
    category: 'Banner',
    description: 'Clean and professional corporate banner design',
    downloads: 645,
    isPremium: false,
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop',
    filters: ['banner'],
  },
  {
    id: '4',
    title: 'Gradient Hero Premium',
    category: 'Hero',
    description: 'Stunning gradient hero section with modern design elements',
    downloads: 2100,
    isPremium: true,
    thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=300&fit=crop',
    filters: ['hero', 'banner', 'featured'],
  },
  {
    id: '5',
    title: 'Minimal Hero',
    category: 'Hero',
    description: 'Minimalist hero banner focusing on content and simplicity',
    downloads: 567,
    isPremium: false,
    thumbnail: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=300&fit=crop',
    filters: ['hero'],
  },
  {
    id: '6',
    title: 'Creative Agency Hero',
    category: 'Hero',
    description: 'Bold and creative hero banner perfect for agencies',
    downloads: 1420,
    isPremium: true,
    thumbnail: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop',
    filters: ['hero', 'featured'],
  },
];

export default function Actions() {
  const [actions, setActions] = useState<Action[]>(mockActions);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAction, setEditingAction] = useState<Action | null>(null);

  const handleCreate = () => {
    setEditingAction(null);
    setModalVisible(true);
  };

  const handleEdit = (action: Action) => {
    setEditingAction(action);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    setActions(actions.filter(a => a.id !== id));
    message.success('Action deleted successfully');
    console.log('Deleted action:', id);
  };

  const handleSubmit = (values: InsertAction) => {
    if (editingAction) {
      setActions(actions.map(a => a.id === editingAction.id ? { ...a, ...values } : a));
      message.success('Action updated successfully');
      console.log('Updated action:', editingAction.id, values);
    } else {
      const newAction: Action = {
        id: Date.now().toString(),
        downloads: values.downloads || 0,
        isPremium: values.isPremium || false,
        filters: values.filters || [],
        ...values,
      };
      setActions([...actions, newAction]);
      message.success('Action created successfully');
      console.log('Created action:', newAction);
    }
    setModalVisible(false);
  };

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>Actions Management</Title>
      <ActionsTable
        actions={actions}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
      />
      <ActionModal
        visible={modalVisible}
        action={editingAction}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
