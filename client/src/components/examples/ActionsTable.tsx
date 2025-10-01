import ActionsTable from '../ActionsTable';
import type { Action } from '@shared/schema';

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
];

export default function ActionsTableExample() {
  return (
    <div style={{ padding: 24 }}>
      <ActionsTable
        actions={mockActions}
        onEdit={(action) => console.log('Edit action:', action)}
        onDelete={(id) => console.log('Delete action:', id)}
        onCreate={() => console.log('Create new action')}
        loading={false}
      />
    </div>
  );
}
