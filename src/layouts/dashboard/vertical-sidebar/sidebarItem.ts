// icons
import {
  MenuUnfoldOutlined,
  StopOutlined,
  BorderOutlined,
  ChromeOutlined,
} from '@ant-design/icons-vue';
import { MessageChatbotIcon } from 'vue-tabler-icons';


export interface menu {
  header?: string;
  title?: string;
  icon?: object;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  {
    title: 'Dashboard',
    icon: ChromeOutlined,
    to: '/starter'
  },
  {
    title: 'About me',
    icon: MessageChatbotIcon,
    to: '/aboutMe'
  },
  { divider: true },
  { header: 'Others' },
  {
    title: 'Menu levels',
    icon: MenuUnfoldOutlined,
    to: '#',
    children: [
      {
        title: 'Level 01',
        to: ''
      },
      {
        title: 'Level 02',
        to: '',
        children: [
          {
            title: 'Level 11',
            to: ''
          },
          {
            title: 'Level 12',
            to: '/2.2level',
            children: [
              {
                title: 'Level 21',
                to: ''
              }
            ]
          }
        ]
      }
    ]
  },
  {
    title: 'Disabled Menu',
    icon: StopOutlined,
    disabled: true,
    to: ''
  },
  {
    title: 'Oval Chip',
    icon: BorderOutlined,
    to: ''
  }
];

export default sidebarItem;
