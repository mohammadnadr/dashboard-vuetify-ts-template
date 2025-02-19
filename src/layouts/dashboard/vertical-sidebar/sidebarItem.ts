// icons
import {
  QuestionOutlined,
  MenuUnfoldOutlined,
  StopOutlined,
  BorderOutlined,
  ChromeOutlined,
  DeploymentUnitOutlined
} from '@ant-design/icons-vue';

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
  { header: 'Starterkit' },
  {
    title: 'Sample Page',
    icon: ChromeOutlined,
    to: '/'
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
  },
  {
    title: 'Documentation',
    icon: QuestionOutlined,
    to: 'https://codedthemes.gitbook.io/mantis-vuetify/',
    type: 'external',
    chip: 'gitbook',
    chipColor: 'secondary',
    chipVariant: 'flat'
  },
  {
    title: 'Road Map',
    icon: DeploymentUnitOutlined,
    to: 'https://codedthemes.gitbook.io/mantis-vuetify/roadmap',
    type: 'external'
  }
];

export default sidebarItem;
