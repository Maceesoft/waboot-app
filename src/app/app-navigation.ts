export const navigation = [
  {
    text: 'Inicio',
    path: '/home',
    icon: 'fa-light fa-house'
  },
  {
    text: 'Calendario',
    icon: 'fa-light fa-calendar menu-icon-purple',
    path: '/calendario'
  },
  {
    text: 'Campañas',
    path: '/campanas',
    icon: 'fa-light fa-drone menu-icon-orange'
  },
  {
    text: 'Contactos',
    icon: 'fa-light fa-address-card menu-icon-blue',
    path: '/contactos'
  },
  {
    text: 'Reporte',
    icon: 'fa-light fa-chart-user menu-icon-green',
    path: '/reporte'
  },
  {
    text: 'Fuente de Datos',
    icon: 'fa-light fa-database fa-calendar menu-icon-purple',
    path: '/fuentes-datos',
  },
  {
    text: 'Administrar Plantillas',
    icon: 'fa-light fa-code menu-icon-orange',
    path: '/templates',
    role: 'admin'
  },
  {
    text: 'Asignar Plantillas',
    icon: 'fa-light fa-user-tag menu-icon-blue',
    path: '/usuario-templates',
    role: 'admin'
  },
  {
    text: 'Usuarios',
    icon: 'fa-light fa-users menu-icon-green',
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
