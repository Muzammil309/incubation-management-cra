# Deployment & Infrastructure Guide
## Incubation Management Platform

### Document Information
- **Version**: 1.0
- **Date**: September 2025
- **Target Audience**: DevOps Engineers, System Administrators, Development Teams
- **Review Cycle**: Monthly

---

## 1. Infrastructure Overview

### 1.1 Architecture Summary
The Incubation Management Platform follows a cloud-native, microservices architecture designed for scalability, reliability, and security. The infrastructure leverages modern containerization, orchestration, and managed cloud services.

### 1.2 Technology Stack
- **Frontend**: React 18+ with TypeScript, deployed on Vercel
- **Backend**: Node.js/Express microservices with TypeScript
- **Database**: PostgreSQL 14+ (Supabase managed)
- **Authentication**: Supabase Auth with JWT tokens
- **File Storage**: Supabase Storage with CDN
- **Container Orchestration**: Docker + Kubernetes (EKS/GKE)
- **CI/CD**: GitHub Actions with automated testing and deployment
- **Monitoring**: Prometheus, Grafana, and ELK Stack
- **Security**: AWS WAF, CloudFlare, and comprehensive security tools

### 1.3 Environment Strategy
- **Development**: Local development with Docker Compose
- **Staging**: Full production mirror for testing and validation
- **Production**: High-availability, multi-region deployment
- **DR (Disaster Recovery)**: Cross-region backup and failover

---

## 2. Cloud Infrastructure

### 2.1 AWS Infrastructure Components

#### Core Services
```yaml
# Primary AWS Services
Compute:
  - EKS (Elastic Kubernetes Service) for container orchestration
  - EC2 instances for worker nodes (t3.large, m5.xlarge)
  - Lambda functions for serverless processing
  - Auto Scaling Groups for dynamic scaling

Networking:
  - VPC with public/private subnets across 3 AZs
  - Application Load Balancer (ALB) for traffic distribution
  - CloudFront CDN for global content delivery
  - Route 53 for DNS management

Storage:
  - EBS volumes for persistent storage
  - S3 buckets for object storage and backups
  - EFS for shared file systems

Security:
  - WAF for web application protection
  - Security Groups and NACLs for network security
  - IAM roles and policies for access control
  - KMS for encryption key management
```

#### Database Infrastructure
```yaml
# Supabase Configuration
Primary Database:
  - PostgreSQL 14+ with read replicas
  - Connection pooling with PgBouncer
  - Automated backups with point-in-time recovery
  - Real-time subscriptions for live updates

Caching Layer:
  - Redis cluster for session storage
  - Application-level caching with Redis
  - CDN caching for static assets

Analytics:
  - Dedicated analytics database (ClickHouse)
  - Data warehouse for reporting (BigQuery/Redshift)
  - ETL pipelines for data processing
```

### 2.2 Kubernetes Configuration

#### Cluster Setup
```yaml
# EKS Cluster Configuration
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
  name: incubation-platform-prod
  region: us-west-2
  version: "1.27"

nodeGroups:
  - name: worker-nodes
    instanceType: m5.large
    desiredCapacity: 3
    minSize: 2
    maxSize: 10
    volumeSize: 100
    ssh:
      allow: false
    iam:
      withAddonPolicies:
        autoScaler: true
        cloudWatch: true
        ebs: true
        efs: true

addons:
  - name: vpc-cni
  - name: coredns
  - name: kube-proxy
  - name: aws-load-balancer-controller
```

#### Application Deployment
```yaml
# Backend Service Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-server
  namespace: production
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api-server
  template:
    metadata:
      labels:
        app: api-server
    spec:
      containers:
      - name: api-server
        image: incubation-platform/api:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: database-secret
              key: url
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: auth-secret
              key: jwt-secret
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

---

## 3. CI/CD Pipeline

### 3.1 GitHub Actions Workflow

#### Frontend Deployment
```yaml
# .github/workflows/frontend-deploy.yml
name: Frontend Deployment

on:
  push:
    branches: [main, staging]
    paths: ['frontend/**']
  pull_request:
    branches: [main]
    paths: ['frontend/**']

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
      
      - name: Run tests
        run: |
          cd frontend
          npm run test:coverage
      
      - name: Run linting
        run: |
          cd frontend
          npm run lint
      
      - name: Type checking
        run: |
          cd frontend
          npm run type-check
      
      - name: Build application
        run: |
          cd frontend
          npm run build

  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/staging'
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel Staging
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: frontend
          scope: staging

  deploy-production:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel Production
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: frontend
```

#### Backend Deployment
```yaml
# .github/workflows/backend-deploy.yml
name: Backend Deployment

on:
  push:
    branches: [main, staging]
    paths: ['backend/**']

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_db
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json
      
      - name: Install dependencies
        run: |
          cd backend
          npm ci
      
      - name: Run database migrations
        run: |
          cd backend
          npm run migrate:test
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
      
      - name: Run tests
        run: |
          cd backend
          npm run test:coverage
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
      
      - name: Security audit
        run: |
          cd backend
          npm audit --audit-level high

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-west-2
      
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1
      
      - name: Build and push Docker image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: incubation-platform/api
          IMAGE_TAG: ${{ github.sha }}
        run: |
          cd backend
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
          docker tag $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY:latest
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:latest

  deploy-staging:
    needs: build-and-push
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/staging'
    steps:
      - name: Deploy to EKS Staging
        run: |
          aws eks update-kubeconfig --region us-west-2 --name incubation-platform-staging
          kubectl set image deployment/api-server api-server=$ECR_REGISTRY/$ECR_REPOSITORY:${{ github.sha }} -n staging
          kubectl rollout status deployment/api-server -n staging

  deploy-production:
    needs: build-and-push
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - name: Deploy to EKS Production
        run: |
          aws eks update-kubeconfig --region us-west-2 --name incubation-platform-prod
          kubectl set image deployment/api-server api-server=$ECR_REGISTRY/$ECR_REPOSITORY:${{ github.sha }} -n production
          kubectl rollout status deployment/api-server -n production
```

### 3.2 Database Migration Strategy

#### Migration Pipeline
```yaml
# Database Migration Job
apiVersion: batch/v1
kind: Job
metadata:
  name: db-migration
  namespace: production
spec:
  template:
    spec:
      containers:
      - name: migration
        image: incubation-platform/migrations:latest
        command: ["npm", "run", "migrate:up"]
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: database-secret
              key: url
      restartPolicy: Never
  backoffLimit: 3
```

#### Migration Scripts
```javascript
// migrations/001_initial_schema.js
exports.up = async function(knex) {
  // Create organizations table
  await knex.schema.createTable('organizations', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name', 255).notNullable();
    table.string('slug', 100).unique().notNullable();
    table.string('domain', 255).unique();
    table.text('logo_url');
    table.timestamps(true, true);
  });

  // Create users table
  await knex.schema.createTable('users', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('email', 255).unique().notNullable();
    table.string('first_name', 100).notNullable();
    table.string('last_name', 100).notNullable();
    table.uuid('organization_id').references('id').inTable('organizations');
    table.timestamps(true, true);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('organizations');
};
```

---

## 4. Monitoring & Observability

### 4.1 Application Monitoring

#### Prometheus Configuration
```yaml
# prometheus-config.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

scrape_configs:
  - job_name: 'kubernetes-pods'
    kubernetes_sd_configs:
      - role: pod
    relabel_configs:
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
        action: keep
        regex: true
      - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
        action: replace
        target_label: __metrics_path__
        regex: (.+)

  - job_name: 'api-server'
    static_configs:
      - targets: ['api-server:3000']
    metrics_path: '/metrics'
    scrape_interval: 10s

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093
```

#### Grafana Dashboards
```json
{
  "dashboard": {
    "title": "Incubation Platform - API Metrics",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{route}}"
          }
        ]
      },
      {
        "title": "Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))",
            "legendFormat": "95th percentile"
          }
        ]
      },
      {
        "title": "Error Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~\"5..\"}[5m])",
            "legendFormat": "5xx errors"
          }
        ]
      }
    ]
  }
}
```

### 4.2 Log Management

#### ELK Stack Configuration
```yaml
# elasticsearch.yml
cluster.name: incubation-platform-logs
node.name: node-1
path.data: /var/lib/elasticsearch
path.logs: /var/log/elasticsearch
network.host: 0.0.0.0
discovery.type: single-node
xpack.security.enabled: true
xpack.security.transport.ssl.enabled: true

# logstash.conf
input {
  beats {
    port => 5044
  }
}

filter {
  if [fields][service] == "api-server" {
    json {
      source => "message"
    }
    
    date {
      match => [ "timestamp", "ISO8601" ]
    }
    
    mutate {
      add_field => { "service" => "api-server" }
    }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "incubation-platform-%{+YYYY.MM.dd}"
    user => "elastic"
    password => "${ELASTIC_PASSWORD}"
  }
}

# kibana.yml
server.host: "0.0.0.0"
elasticsearch.hosts: ["http://elasticsearch:9200"]
elasticsearch.username: "kibana_system"
elasticsearch.password: "${KIBANA_PASSWORD}"
```

### 4.3 Health Checks & Alerts

#### Health Check Endpoints
```javascript
// health-check.js
const express = require('express');
const router = express.Router();

// Basic health check
router.get('/health', async (req, res) => {
  try {
    // Check database connectivity
    await db.raw('SELECT 1');
    
    // Check Redis connectivity
    await redis.ping();
    
    // Check external service dependencies
    const supabaseHealth = await checkSupabaseHealth();
    
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'healthy',
        redis: 'healthy',
        supabase: supabaseHealth ? 'healthy' : 'degraded'
      }
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// Readiness check
router.get('/ready', async (req, res) => {
  try {
    // Check if application is ready to serve traffic
    const isReady = await checkApplicationReadiness();
    
    if (isReady) {
      res.status(200).json({ status: 'ready' });
    } else {
      res.status(503).json({ status: 'not ready' });
    }
  } catch (error) {
    res.status(503).json({ status: 'not ready', error: error.message });
  }
});

module.exports = router;
```

#### Alert Rules
```yaml
# alert-rules.yml
groups:
  - name: api-server-alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value }} errors per second"

      - alert: HighResponseTime
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 2
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High response time detected"
          description: "95th percentile response time is {{ $value }} seconds"

      - alert: DatabaseConnectionFailure
        expr: up{job="postgres"} == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Database connection failure"
          description: "Cannot connect to PostgreSQL database"

      - alert: PodCrashLooping
        expr: rate(kube_pod_container_status_restarts_total[15m]) > 0
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Pod is crash looping"
          description: "Pod {{ $labels.pod }} is restarting frequently"
```

---

## 5. Security Configuration

### 5.1 Network Security

#### AWS Security Groups
```yaml
# Security Group for EKS Worker Nodes
SecurityGroup:
  Type: AWS::EC2::SecurityGroup
  Properties:
    GroupDescription: Security group for EKS worker nodes
    VpcId: !Ref VPC
    SecurityGroupIngress:
      - IpProtocol: tcp
        FromPort: 22
        ToPort: 22
        SourceSecurityGroupId: !Ref BastionSecurityGroup
      - IpProtocol: tcp
        FromPort: 443
        ToPort: 443
        SourceSecurityGroupId: !Ref ALBSecurityGroup
      - IpProtocol: tcp
        FromPort: 10250
        ToPort: 10250
        SourceSecurityGroupId: !Ref EKSControlPlaneSecurityGroup
    SecurityGroupEgress:
      - IpProtocol: -1
        CidrIp: 0.0.0.0/0
```

#### WAF Configuration
```yaml
# AWS WAF Rules
WebACL:
  Type: AWS::WAFv2::WebACL
  Properties:
    Name: IncubationPlatformWAF
    Scope: REGIONAL
    DefaultAction:
      Allow: {}
    Rules:
      - Name: AWSManagedRulesCommonRuleSet
        Priority: 1
        OverrideAction:
          None: {}
        Statement:
          ManagedRuleGroupStatement:
            VendorName: AWS
            Name: AWSManagedRulesCommonRuleSet
        VisibilityConfig:
          SampledRequestsEnabled: true
          CloudWatchMetricsEnabled: true
          MetricName: CommonRuleSetMetric
      
      - Name: RateLimitRule
        Priority: 2
        Action:
          Block: {}
        Statement:
          RateBasedStatement:
            Limit: 2000
            AggregateKeyType: IP
        VisibilityConfig:
          SampledRequestsEnabled: true
          CloudWatchMetricsEnabled: true
          MetricName: RateLimitMetric
```

### 5.2 Secrets Management

#### Kubernetes Secrets
```yaml
# Database Secret
apiVersion: v1
kind: Secret
metadata:
  name: database-secret
  namespace: production
type: Opaque
data:
  url: <base64-encoded-database-url>
  username: <base64-encoded-username>
  password: <base64-encoded-password>

---
# JWT Secret
apiVersion: v1
kind: Secret
metadata:
  name: auth-secret
  namespace: production
type: Opaque
data:
  jwt-secret: <base64-encoded-jwt-secret>
  refresh-secret: <base64-encoded-refresh-secret>
```

#### External Secrets Operator
```yaml
# External Secret for AWS Secrets Manager
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: database-credentials
  namespace: production
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets-manager
    kind: SecretStore
  target:
    name: database-secret
    creationPolicy: Owner
  data:
    - secretKey: url
      remoteRef:
        key: prod/database
        property: url
    - secretKey: username
      remoteRef:
        key: prod/database
        property: username
    - secretKey: password
      remoteRef:
        key: prod/database
        property: password
```

---

## 6. Backup & Disaster Recovery

### 6.1 Database Backup Strategy

#### Automated Backups
```bash
#!/bin/bash
# backup-database.sh

# Configuration
BACKUP_BUCKET="incubation-platform-backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="database_backup_${TIMESTAMP}.sql"

# Create database backup
pg_dump $DATABASE_URL > /tmp/$BACKUP_FILE

# Compress backup
gzip /tmp/$BACKUP_FILE

# Upload to S3
aws s3 cp /tmp/${BACKUP_FILE}.gz s3://$BACKUP_BUCKET/database/

# Clean up local files
rm /tmp/${BACKUP_FILE}.gz

# Retain only last 30 days of backups
aws s3 ls s3://$BACKUP_BUCKET/database/ | \
  awk '{print $4}' | \
  sort | \
  head -n -30 | \
  xargs -I {} aws s3 rm s3://$BACKUP_BUCKET/database/{}

echo "Database backup completed: ${BACKUP_FILE}.gz"
```

#### Point-in-Time Recovery
```yaml
# Kubernetes CronJob for Database Backup
apiVersion: batch/v1
kind: CronJob
metadata:
  name: database-backup
  namespace: production
spec:
  schedule: "0 2 * * *"  # Daily at 2 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: backup
            image: postgres:14
            command:
            - /bin/bash
            - -c
            - |
              pg_dump $DATABASE_URL | gzip > /backup/db_$(date +%Y%m%d_%H%M%S).sql.gz
              aws s3 sync /backup/ s3://incubation-platform-backups/database/
            env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: database-secret
                  key: url
            volumeMounts:
            - name: backup-storage
              mountPath: /backup
          volumes:
          - name: backup-storage
            emptyDir: {}
          restartPolicy: OnFailure
```

### 6.2 Application State Backup

#### Kubernetes Resource Backup
```yaml
# Velero Backup Configuration
apiVersion: velero.io/v1
kind: Backup
metadata:
  name: daily-backup
  namespace: velero
spec:
  includedNamespaces:
  - production
  - staging
  excludedResources:
  - secrets
  - configmaps
  storageLocation: aws-s3
  ttl: 720h  # 30 days
  
---
# Scheduled Backup
apiVersion: velero.io/v1
kind: Schedule
metadata:
  name: daily-backup-schedule
  namespace: velero
spec:
  schedule: "0 3 * * *"  # Daily at 3 AM
  template:
    includedNamespaces:
    - production
    storageLocation: aws-s3
    ttl: 720h
```

---

## 7. Performance Optimization

### 7.1 Caching Strategy

#### Redis Configuration
```yaml
# Redis Cluster Configuration
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: redis-cluster
  namespace: production
spec:
  serviceName: redis-cluster
  replicas: 6
  selector:
    matchLabels:
      app: redis-cluster
  template:
    metadata:
      labels:
        app: redis-cluster
    spec:
      containers:
      - name: redis
        image: redis:7-alpine
        ports:
        - containerPort: 6379
        - containerPort: 16379
        command:
        - redis-server
        - /etc/redis/redis.conf
        - --cluster-enabled
        - "yes"
        - --cluster-config-file
        - nodes.conf
        - --cluster-node-timeout
        - "5000"
        volumeMounts:
        - name: redis-data
          mountPath: /data
        - name: redis-config
          mountPath: /etc/redis
  volumeClaimTemplates:
  - metadata:
      name: redis-data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 10Gi
```

#### CDN Configuration
```yaml
# CloudFront Distribution
CloudFrontDistribution:
  Type: AWS::CloudFront::Distribution
  Properties:
    DistributionConfig:
      Origins:
        - Id: S3Origin
          DomainName: !GetAtt S3Bucket.DomainName
          S3OriginConfig:
            OriginAccessIdentity: !Sub "origin-access-identity/cloudfront/${OriginAccessIdentity}"
        - Id: APIOrigin
          DomainName: api.incubationplatform.com
          CustomOriginConfig:
            HTTPPort: 443
            OriginProtocolPolicy: https-only
      DefaultCacheBehavior:
        TargetOriginId: S3Origin
        ViewerProtocolPolicy: redirect-to-https
        CachePolicyId: 4135ea2d-6df8-44a3-9df3-4b5a84be39ad  # Managed-CachingOptimized
        OriginRequestPolicyId: 88a5eaf4-2fd4-4709-b370-b4c650ea3fcf  # Managed-CORS-S3Origin
      CacheBehaviors:
        - PathPattern: "/api/*"
          TargetOriginId: APIOrigin
          ViewerProtocolPolicy: https-only
          CachePolicyId: 4135ea2d-6df8-44a3-9df3-4b5a84be39ad
          TTL: 0  # No caching for API calls
      Enabled: true
      HttpVersion: http2
      PriceClass: PriceClass_100
```

### 7.2 Auto Scaling Configuration

#### Horizontal Pod Autoscaler
```yaml
# HPA for API Server
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-server-hpa
  namespace: production
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-server
  minReplicas: 3
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 60
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 10
        periodSeconds: 60
```

#### Cluster Autoscaler
```yaml
# Cluster Autoscaler Configuration
apiVersion: apps/v1
kind: Deployment
metadata:
  name: cluster-autoscaler
  namespace: kube-system
spec:
  replicas: 1
  selector:
    matchLabels:
      app: cluster-autoscaler
  template:
    metadata:
      labels:
        app: cluster-autoscaler
    spec:
      containers:
      - image: k8s.gcr.io/autoscaling/cluster-autoscaler:v1.21.0
        name: cluster-autoscaler
        resources:
          limits:
            cpu: 100m
            memory: 300Mi
          requests:
            cpu: 100m
            memory: 300Mi
        command:
        - ./cluster-autoscaler
        - --v=4
        - --stderrthreshold=info
        - --cloud-provider=aws
        - --skip-nodes-with-local-storage=false
        - --expander=least-waste
        - --node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/incubation-platform-prod
        - --balance-similar-node-groups
        - --skip-nodes-with-system-pods=false
```

---

## 8. Deployment Checklist

### 8.1 Pre-Deployment Checklist
- [ ] All tests passing (unit, integration, e2e)
- [ ] Security scan completed with no critical issues
- [ ] Database migrations tested and ready
- [ ] Environment variables and secrets configured
- [ ] Monitoring and alerting configured
- [ ] Backup procedures tested
- [ ] Rollback plan prepared
- [ ] Performance benchmarks established
- [ ] Documentation updated

### 8.2 Deployment Steps
1. **Pre-deployment verification**
   - Verify staging environment matches production
   - Run final test suite
   - Check system health and capacity

2. **Database migration**
   - Create database backup
   - Run migrations in maintenance window
   - Verify migration success

3. **Application deployment**
   - Deploy new version with blue-green strategy
   - Verify health checks pass
   - Gradually shift traffic to new version

4. **Post-deployment verification**
   - Monitor application metrics
   - Verify all features working correctly
   - Check error rates and performance

5. **Rollback procedures** (if needed)
   - Immediate traffic rollback
   - Database rollback if necessary
   - Incident response activation

### 8.3 Post-Deployment Monitoring
- Monitor application performance for 24 hours
- Review error logs and metrics
- Validate user feedback and support tickets
- Document any issues and resolutions
- Update runbooks and procedures
