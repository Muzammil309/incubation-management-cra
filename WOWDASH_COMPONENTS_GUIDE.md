# WowDash Components Quick Reference Guide

## 📦 **Available Components**

### **1. DashboardLayout**

**Purpose**: Main wrapper for dashboard pages

**Import**:
```tsx
import { DashboardLayout } from '../../components/wowdash';
```

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | ReactNode | ✅ | Dashboard content |
| title | string | ❌ | Dashboard title |
| subtitle | string | ❌ | Dashboard subtitle |
| headerAction | ReactNode | ❌ | Action buttons/controls |

**Example**:
```tsx
<DashboardLayout
  title="Attendee Dashboard"
  subtitle="Welcome back! Here's what's happening."
  headerAction={<WowButton>Add Event</WowButton>}
>
  {/* Your dashboard content */}
</DashboardLayout>
```

---

### **2. GradientStatCard**

**Purpose**: Beautiful gradient stat cards with icons and trends

**Import**:
```tsx
import { GradientStatCard } from '../../components/wowdash';
```

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| title | string | ✅ | Card title |
| value | string \| number | ✅ | Main value to display |
| icon | string | ✅ | Iconify icon name |
| iconBgColor | string | ❌ | Icon background color (default: 'bg-cyan') |
| gradientClass | string | ❌ | Gradient class (default: 'bg-gradient-start-1') |
| trend | object | ❌ | Trend data (value, isPositive, label) |
| className | string | ❌ | Additional CSS classes |

**Gradient Options**:
- `bg-gradient-start-1` - Purple gradient
- `bg-gradient-start-2` - Pink gradient
- `bg-gradient-start-3` - Blue gradient
- `bg-gradient-start-4` - Green gradient
- `bg-gradient-start-5` - Orange gradient

**Icon Background Colors**:
- `bg-cyan` - Cyan (#06B6D4)
- `bg-purple` - Purple (#A855F7)
- `bg-info` - Blue (#3b82f6)
- `bg-success-main` - Green (#22c55e)
- `bg-red` - Red (#EF4444)

**Example**:
```tsx
<GradientStatCard
  title="Total Users"
  value="20,000"
  icon="gridicons:multiple-users"
  iconBgColor="bg-cyan"
  gradientClass="bg-gradient-start-1"
  trend={{
    value: '+5000',
    isPositive: true,
    label: 'Last 30 days'
  }}
/>
```

**Grid Layout** (5 cards per row on large screens):
```tsx
<div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
  <GradientStatCard {...props1} />
  <GradientStatCard {...props2} />
  <GradientStatCard {...props3} />
  <GradientStatCard {...props4} />
  <GradientStatCard {...props5} />
</div>
```

---

### **3. TabNavigation**

**Purpose**: Consistent tab navigation with badges and icons

**Import**:
```tsx
import { TabNavigation } from '../../components/wowdash';
```

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| tabs | Tab[] | ✅ | Array of tab objects |
| activeTab | string | ✅ | Currently active tab ID |
| onTabChange | (id: string) => void | ✅ | Tab change handler |
| variant | 'default' \| 'pills' \| 'underline' | ❌ | Tab style (default: 'pills') |
| className | string | ❌ | Additional CSS classes |

**Tab Object**:
```typescript
interface Tab {
  id: string;        // Unique identifier
  label: string;     // Display text
  icon?: string;     // Optional icon class
  badge?: number;    // Optional badge count
}
```

**Example**:
```tsx
const tabs = [
  { id: 'overview', label: 'Overview', icon: 'mdi:view-dashboard' },
  { id: 'tickets', label: 'My Tickets', icon: 'mdi:ticket', badge: 5 },
  { id: 'settings', label: 'Settings', icon: 'mdi:cog' }
];

<TabNavigation
  tabs={tabs}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  variant="pills"
/>
```

---

### **4. DataCard**

**Purpose**: Enhanced card for displaying data with headers and actions

**Import**:
```tsx
import { DataCard } from '../../components/wowdash';
```

**Props**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| children | ReactNode | ✅ | Card content |
| title | string | ❌ | Card title |
| subtitle | string | ❌ | Card subtitle |
| headerAction | ReactNode | ❌ | Header action buttons |
| className | string | ❌ | Additional CSS classes |
| bodyClassName | string | ❌ | Body CSS classes |
| noPadding | boolean | ❌ | Remove body padding (default: false) |
| shadow | 'none' \| 'sm' \| 'md' \| 'lg' | ❌ | Shadow size (default: 'sm') |

**Example**:
```tsx
<DataCard
  title="Upcoming Events"
  subtitle="Events you're registered for"
  headerAction={
    <WowButton variant="primary" size="sm">
      <Icon icon="mdi:plus" className="me-2" />
      Add Event
    </WowButton>
  }
  shadow="md"
>
  <div className="table-responsive">
    <table className="table">
      {/* Table content */}
    </table>
  </div>
</DataCard>
```

---

## 🎨 **Utility Classes**

### **Spacing**
```css
.p-20      /* padding: 20px */
.p-24      /* padding: 24px */
.px-24     /* padding-left/right: 24px */
.py-16     /* padding-top/bottom: 16px */
.mt-12     /* margin-top: 12px */
.mb-24     /* margin-bottom: 24px */
.gap-2     /* gap: 8px */
.gap-3     /* gap: 12px */
```

### **Sizes**
```css
.w-50-px   /* width: 50px */
.h-50-px   /* height: 50px */
```

### **Text Colors**
```css
.text-primary-light   /* #D0D5DD */
.text-success-main    /* #22c55e */
.text-danger-main     /* #ef4444 */
.text-info-main       /* #3b82f6 */
.text-warning-main    /* #f59e0b */
```

### **Background Colors**
```css
.bg-cyan          /* #06B6D4 */
.bg-purple        /* #A855F7 */
.bg-info          /* #3b82f6 */
.bg-success-main  /* #22c55e */
.bg-red           /* #EF4444 */
```

### **Gradients**
```css
.bg-gradient-start-1  /* Purple gradient */
.bg-gradient-start-2  /* Pink gradient */
.bg-gradient-start-3  /* Blue gradient */
.bg-gradient-start-4  /* Green gradient */
.bg-gradient-start-5  /* Orange gradient */
```

---

## 📐 **Responsive Grid**

### **Bootstrap Grid Classes**
```html
<!-- 5 columns on xxxl, 3 on lg, 2 on sm, 1 on xs -->
<div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
  <div className="col">Card 1</div>
  <div className="col">Card 2</div>
  <div className="col">Card 3</div>
</div>

<!-- 8 columns + 4 columns layout -->
<div className="row gy-4">
  <div className="col-lg-8">Main content</div>
  <div className="col-lg-4">Sidebar</div>
</div>
```

### **Breakpoints**
- `xs`: < 576px (mobile)
- `sm`: ≥ 576px (mobile landscape)
- `md`: ≥ 768px (tablet)
- `lg`: ≥ 992px (desktop)
- `xl`: ≥ 1200px (large desktop)
- `xxl`: ≥ 1400px (extra large)
- `xxxl`: ≥ 1400px (custom for 5-column grid)

---

## 🎯 **Complete Dashboard Template**

```tsx
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { 
  DashboardLayout, 
  GradientStatCard, 
  TabNavigation, 
  DataCard,
  WowButton,
  WowBadge 
} from '../../components/wowdash';

const MyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'mdi:view-dashboard' },
    { id: 'data', label: 'Data', icon: 'mdi:database', badge: 5 },
    { id: 'settings', label: 'Settings', icon: 'mdi:cog' }
  ];

  return (
    <DashboardLayout
      title="My Dashboard"
      subtitle="Welcome back! Here's your overview."
    >
      {/* Tabs */}
      <div className="col-12">
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          variant="pills"
        />
      </div>

      {/* Stats Cards */}
      <div className="col-12">
        <div className="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
          <GradientStatCard
            title="Total Users"
            value="20,000"
            icon="gridicons:multiple-users"
            iconBgColor="bg-cyan"
            gradientClass="bg-gradient-start-1"
            trend={{ value: '+5000', isPositive: true, label: 'Last 30 days' }}
          />
          {/* More stat cards... */}
        </div>
      </div>

      {/* Main Content */}
      <div className="col-lg-8">
        <DataCard
          title="Recent Activity"
          subtitle="Your latest updates"
          headerAction={
            <WowButton variant="primary" size="sm">
              <Icon icon="mdi:plus" className="me-2" />
              Add New
            </WowButton>
          }
        >
          {/* Content here */}
        </DataCard>
      </div>

      {/* Sidebar */}
      <div className="col-lg-4">
        <DataCard title="Quick Stats">
          {/* Sidebar content */}
        </DataCard>
      </div>
    </DashboardLayout>
  );
};

export default MyDashboard;
```

---

## 🔧 **Common Patterns**

### **Table in DataCard**
```tsx
<DataCard title="Users" noPadding>
  <div className="table-responsive">
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John Doe</td>
          <td>john@example.com</td>
          <td><WowBadge variant="success">Active</WowBadge></td>
        </tr>
      </tbody>
    </table>
  </div>
</DataCard>
```

### **List in DataCard**
```tsx
<DataCard title="Recent Items">
  <div className="d-flex flex-column gap-3">
    {items.map(item => (
      <div key={item.id} className="d-flex align-items-center justify-content-between p-3 bg-neutral-50 rounded-lg">
        <div className="d-flex align-items-center gap-3">
          <Icon icon={item.icon} className="text-2xl text-primary-500" />
          <div>
            <div className="fw-semibold">{item.title}</div>
            <div className="text-sm text-neutral-600">{item.subtitle}</div>
          </div>
        </div>
        <WowBadge variant={item.status}>{item.label}</WowBadge>
      </div>
    ))}
  </div>
</DataCard>
```

---

## 📚 **Icon Library**

Using `@iconify/react` with Material Design Icons:

```tsx
import { Icon } from '@iconify/react';

<Icon icon="mdi:account" />
<Icon icon="mdi:calendar" />
<Icon icon="mdi:ticket" />
<Icon icon="mdi:email" />
<Icon icon="mdi:cog" />
<Icon icon="mdi:plus" />
<Icon icon="mdi:check-circle" />
<Icon icon="mdi:alert-circle" />
```

Browse icons: https://icon-sets.iconify.design/mdi/

---

**Last Updated**: 2025-09-30  
**Version**: 1.0.0

