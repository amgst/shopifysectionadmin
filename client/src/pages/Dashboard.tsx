import { Typography, Card, Row, Col, Statistic } from 'antd';
import { 
  AppstoreOutlined, 
  DownloadOutlined, 
  CrownOutlined, 
  FileImageOutlined 
} from '@ant-design/icons';

const { Title } = Typography;

export default function Dashboard() {
  return (
    <div>
      <Title level={2}>Dashboard Overview</Title>
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Actions"
              value={24}
              prefix={<AppstoreOutlined />}
              valueStyle={{ color: '#1890ff' }}
              data-testid="stat-total-actions"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Downloads"
              value={8450}
              prefix={<DownloadOutlined />}
              valueStyle={{ color: '#52c41a' }}
              data-testid="stat-total-downloads"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Premium Actions"
              value={8}
              prefix={<CrownOutlined />}
              valueStyle={{ color: '#faad14' }}
              data-testid="stat-premium-actions"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Free Actions"
              value={16}
              prefix={<FileImageOutlined />}
              valueStyle={{ color: '#8c8c8c' }}
              data-testid="stat-free-actions"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
