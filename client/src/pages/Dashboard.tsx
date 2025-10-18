import { Typography, Card, Row, Col, Statistic } from 'antd';
import { 
  AppstoreOutlined, 
  DownloadOutlined, 
  CrownOutlined, 
  FileImageOutlined 
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import type { Action } from '@shared/schema';
import { toast } from '@/hooks/use-toast';

const { Title } = Typography;

export default function Dashboard() {
  // Make stats real from Firestore data
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalActions: 0,
    totalDownloads: 0,
    premiumActions: 0,
    freeActions: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/sections');
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.message || `GET /api/sections failed (${res.status})`);
        }
        const actions = (await res.json()) as Action[];
        const totalActions = actions.length;
        const totalDownloads = actions.reduce((sum, a) => sum + (a.downloads ?? 0), 0);
        const premiumActions = actions.filter((a) => a.isPremium).length;
        const freeActions = totalActions - premiumActions;
        setMetrics({ totalActions, totalDownloads, premiumActions, freeActions });
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        toast({ title: 'Load failed', description: message, variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <Title level={2}>Dashboard Overview</Title>
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Total Actions"
              value={metrics.totalActions}
              prefix={<AppstoreOutlined />}
              valueStyle={{ color: '#1890ff' }}
              data-testid="stat-total-actions"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Total Downloads"
              value={metrics.totalDownloads}
              prefix={<DownloadOutlined />}
              valueStyle={{ color: '#52c41a' }}
              data-testid="stat-total-downloads"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Premium Actions"
              value={metrics.premiumActions}
              prefix={<CrownOutlined />}
              valueStyle={{ color: '#faad14' }}
              data-testid="stat-premium-actions"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card loading={loading}>
            <Statistic
              title="Free Actions"
              value={metrics.freeActions}
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
