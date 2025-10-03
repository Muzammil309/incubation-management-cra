# Icon Replacement Guide: @iconify/react → Lucide React

## Overview
This document maps all @iconify/react icons used in the WOWDASH template to their Lucide React equivalents.

## Icon Mapping

### Navigation & UI Icons
| @iconify Icon | Lucide React Icon | Usage |
|--------------|-------------------|-------|
| `radix-icons:cross-2` | `X` | Close buttons |
| `radix-icons:cross-1` | `X` | Close buttons (smaller) |
| `heroicons:bars-3-solid` | `Menu` | Mobile menu toggle |
| `iconoir:arrow-right` | `ArrowRight` | Sidebar toggle |
| `ion:search-outline` | `Search` | Search input |

### Dashboard & Home Icons
| @iconify Icon | Lucide React Icon | Usage |
|--------------|-------------------|-------|
| `solar:home-smile-angle-outline` | `Home` or `LayoutDashboard` | Dashboard/Home |
| `solar:pie-chart-outline` | `PieChart` or `BarChart3` | Charts |
| `fe:vector` | `Box` or `Package` | Widgets |
| `simple-line-icons:vector` | `Shield` or `Lock` | Authentication |

### Communication Icons
| @iconify Icon | Lucide React Icon | Usage |
|--------------|-------------------|-------|
| `mage:email` | `Mail` | Email |
| `bi:chat-dots` | `MessageSquare` or `MessageCircle` | Chat |
| `iconoir:bell` | `Bell` | Notifications |
| `tabler:message-check` | `MessageSquareCheck` or `CheckCircle` | Message status |

### Calendar & Time Icons
| @iconify Icon | Lucide React Icon | Usage |
|--------------|-------------------|-------|
| `solar:calendar-outline` | `Calendar` or `CalendarDays` | Calendar |

### Document & File Icons
| @iconify Icon | Lucide React Icon | Usage |
|--------------|-------------------|-------|
| `solar:document-text-outline` | `FileText` or `File` | Documents |
| `heroicons:document` | `FileText` | Forms/Documents |
| `hugeicons:invoice-03` | `Receipt` or `FileText` | Invoices |

### User & People Icons
| @iconify Icon | Lucide React Icon | Usage |
|--------------|-------------------|-------|
| `flowbite:users-group-outline` | `Users` | User groups |
| `solar:user-linear` | `User` or `UserCircle` | User profile |
| `gridicons:multiple-users` | `Users` | Multiple users |

### Data & Storage Icons
| @iconify Icon | Lucide React Icon | Usage |
|--------------|-------------------|-------|
| `mingcute:storage-line` | `Database` or `HardDrive` | Tables/Storage |

### Financial Icons
| @iconify Icon | Lucide React Icon | Usage |
|--------------|-------------------|-------|
| `hugeicons:money-send-square` | `DollarSign` or `Banknote` | Payments/Money |
| `bitcoin-icons:verify-outline` | `CheckCircle` or `BadgeCheck` | Verification |

### Settings & Configuration Icons
| @iconify Icon | Lucide React Icon | Usage |
|--------------|-------------------|-------|
| `icon-park-outline:setting-two` | `Settings` or `Cog` | Settings |

### Status & Info Icons
| @iconify Icon | Lucide React Icon | Usage |
|--------------|-------------------|-------|
| `streamline:straight-face` | `AlertCircle` or `Info` | 404 page |
| `octicon:info-24` | `Info` or `HelpCircle` | Information |
| `mage:message-question-mark-round` | `HelpCircle` or `MessageCircleQuestion` | FAQ/Help |

### Action Icons
| @iconify Icon | Lucide React Icon | Usage |
|--------------|-------------------|-------|
| `lucide:power` | `Power` or `LogOut` | Logout |
| `material-symbols:map-outline` | `Map` or `MapPin` | Maps |

## Implementation Steps

### 1. Install Lucide React (Already Installed)
```bash
npm install lucide-react
```

### 2. Replace Imports
**Before:**
```jsx
import { Icon } from '@iconify/react';
```

**After:**
```jsx
import { 
  Home, Menu, X, Search, Mail, MessageSquare, 
  Calendar, FileText, Users, Settings, Bell,
  // ... other icons as needed
} from 'lucide-react';
```

### 3. Replace Icon Usage
**Before:**
```jsx
<Icon icon="solar:home-smile-angle-outline" className="menu-icon" />
```

**After:**
```jsx
<Home className="menu-icon" size={20} />
```

### 4. Icon Size Standardization
Lucide icons use the `size` prop for consistent sizing:
- Small icons: `size={16}`
- Medium icons: `size={20}` (default)
- Large icons: `size={24}`
- Extra large: `size={32}`

### 5. Color Customization
Lucide icons inherit color from CSS or can use the `color` prop:
```jsx
<Home className="text-primary-500" size={20} />
// or
<Home color="#487FFF" size={20} />
```

## Benefits of Lucide React

1. **Better Performance**: No API calls, icons are bundled
2. **Consistent Design**: All icons from the same design system
3. **TypeScript Support**: Full type safety
4. **Tree Shaking**: Only bundle icons you use
5. **Smaller Bundle Size**: More efficient than @iconify
6. **Better Accessibility**: Built-in ARIA attributes

## Files to Update

### Priority 1 (Core Layout)
- `src/wowdash/masterLayout/MasterLayout.jsx` - Main sidebar and header

### Priority 2 (Components)
- `src/components/upload/FileList.tsx` - File icons
- All WOWDASH component files in `src/wowdash/components/`

### Priority 3 (Pages)
- All page files in `src/wowdash/pages/`

## Testing Checklist

After replacement:
- [ ] All icons render correctly
- [ ] Icon sizes are consistent
- [ ] Colors match the design system
- [ ] No console errors
- [ ] Build succeeds without warnings
- [ ] Bundle size is reduced

