export const navigation = [
  {
    text: 'Inicio',
    path: '/home',
    icon: 'fa-light fa-house'
  },
  {
    text: 'Test',
    path: '/test',
    icon: 'fa-light fa-code-compare'
  },
  {
    text: 'Calendario',
    icon: 'fa-light fa-calendar',
    path: '/calendario'
  },
  {
    text: 'Reporte',
    icon: 'fa-light fa-chart-user',
    path: '/reporte'
  },
  {
    text: 'Contactos',
    icon: 'fa-light fa-address-card',
    path: '/contactos'
  },
  {
    text: 'Usuarios',
    icon: 'fa-light fa-users',
    path: '/usuarios',
    role: 'client'
  },
  {
    text: 'WhatsApp',
    icon: 'fa-light fa-whatsapp',
    visible: false,
    items: [
      {
        text: 'Send Files',
        icon: 'fa-light fa-file-pdf',
        path: '/whatsApp/send-files'
      }
    ]
  }
];
