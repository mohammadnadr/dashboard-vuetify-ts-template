import { CircleFilledIcon } from 'vue-tabler-icons';
// icons
import { MenuUnfoldOutlined, ChromeOutlined } from '@ant-design/icons-vue';

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
  subCaption?: string;
  class?: string;
  extraclass?: string;
  type?: string;
}

const horizontalItems: menu[] = [
  {
    title: 'Sample Page',
    icon: ChromeOutlined,
    to: '/'
  },
  {
    title: 'Menu levels',
    icon: MenuUnfoldOutlined,
    to: '#',
    children: [
      {
        title: 'Level 1',
        icon: CircleFilledIcon,
        to: ''
      },
      {
        title: 'Level 1',
        icon: CircleFilledIcon,
        to: '',
        children: [
          {
            title: 'Level 2',
            icon: CircleFilledIcon,
            to: ''
          },
          {
            title: 'Level 2',
            icon: CircleFilledIcon,
            to: '/2.2level',
            children: [
              {
                title: 'Level 3',
                icon: CircleFilledIcon,
                to: ''
              }
            ]
          }
        ]
      }
    ]
  }
];

export default horizontalItems;
