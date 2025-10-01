import AdminLayout from '../AdminLayout';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function AdminLayoutExample() {
  return (
    <AdminLayout>
      <Title level={2}>Welcome to Admin Dashboard</Title>
      <Paragraph>
        This is an example content area. The sidebar can be collapsed and the theme can be toggled.
      </Paragraph>
    </AdminLayout>
  );
}
