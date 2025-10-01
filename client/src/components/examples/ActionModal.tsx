import { useState } from 'react';
import ActionModal from '../ActionModal';
import { Button } from 'antd';
import type { Action } from '@shared/schema';

const mockAction: Action = {
  id: '1',
  title: 'Hero Section Modern',
  category: 'Hero',
  description: 'A beautiful hero banner section with customizable background and text overlay',
  downloads: 1250,
  isPremium: false,
  thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop',
  filters: ['hero', 'banner'],
};

export default function ActionModalExample() {
  const [visible, setVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', gap: 16 }}>
        <Button 
          type="primary" 
          onClick={() => {
            setEditMode(false);
            setVisible(true);
          }}
        >
          Open Create Modal
        </Button>
        <Button 
          onClick={() => {
            setEditMode(true);
            setVisible(true);
          }}
        >
          Open Edit Modal
        </Button>
      </div>
      <ActionModal
        visible={visible}
        action={editMode ? mockAction : null}
        onCancel={() => setVisible(false)}
        onSubmit={(values) => {
          console.log('Submitted values:', values);
          setVisible(false);
        }}
      />
    </div>
  );
}
