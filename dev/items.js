const menuItems = [
  { id: 1,
    label: 'Item 1',
    icon: 'fa-battery-half',
    items: [
      { id: 11,
        label: 'Item 1.1',
        icon: 'fa-car',
        link: '/posts',
      },
      { id: 12,
        label: 'Item 1.2',
        icon: 'fa-bullhorn',
        link: '/item12',
      },
    ],
  },
  { id: 2,
    label: 'Item 2',
    icon: 'fa-camera',
    link: '/item2',
  },
  { id: 3,
    label: 'Item 3',
    icon: 'fa-check-square',
    link: '/item3',
  },
  { id: 4,
    label: 'Item 4',
    icon: 'fa-database',
    items: [
      { id: 41,
        label: 'Item 4.1',
        icon: 'fa-paw',
        items: [
          { id: 411,
            label: 'Item 4.1.a',
            icon: 'fa-random',
            link: '/item41/a',
          },
          { id: 412,
            label: 'Item 4.1.b',
            icon: 'fa-sign-in',
            link: '/item41/b',
          },
        ],
      },
      { id: 42,
        label: 'Item 4.2',
        icon: 'fa-user',
        link: '/item42',
      },
      { id: 43,
        label: 'Item 4.3',
        icon: 'fa-gear',
        link: '/item43',
      },
    ],
  },
];
export default menuItems;