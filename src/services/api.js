// Simulación de una base de datos de lugares basada en los IDs del SVG
const LUGARES_DB = [
  {
    id: 'servicios-sociales',
    nombre: 'Gestión Servicios Sociales',
    descripcion: 'Programas destinados al bienestar de la comunidad, salud y recreación.',
    servicios: ['Salud Preventiva', 'Recreación', 'Cultura'],
    banner: 'https://picsum.photos/seed/ss1/1200/400',
    galeria: ['https://picsum.photos/seed/ss1/800/600', 'https://picsum.photos/seed/ss2/800/600'],
    imagen360: '/360/servicios-sociales.jpg',
    yaw: 0,
    pitch: 0,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'subsidio-familiar',
    nombre: 'Gestión Subsidio Familiar',
    descripcion: 'Administración y entrega de aportes para el fortalecimiento del núcleo familiar.',
    servicios: ['Cuota Monetaria', 'Vivienda', 'Educación'],
    banner: 'https://picsum.photos/seed/sf1/1200/400',
    galeria: ['https://picsum.photos/seed/sf1/800/600', 'https://picsum.photos/seed/sf2/800/600'],
    imagen360: '/360/subsidio-familiar.jpg',
    yaw: 0,
    pitch: 0,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'direccion',
    nombre: 'Dirección General',
    descripcion: 'Liderazgo estratégico y toma de decisiones para el cumplimiento de objetivos.',
    servicios: ['Estrategia', 'Liderazgo', 'Relaciones Públicas'],
    banner: 'https://picsum.photos/seed/dir1/1200/400',
    galeria: ['https://picsum.photos/seed/dir1/800/600', 'https://picsum.photos/seed/dir2/800/600'],
    imagen360: '/360/direccion.jpg',
    yaw: 0,
    pitch: 0,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'planeacion',
    nombre: 'Gestión Planeación',
    descripcion: 'Proyección y seguimiento de metas institucionales a corto y largo plazo.',
    servicios: ['Seguimiento a Metas', 'Estadísticas', 'Proyectos'],
    banner: 'https://picsum.photos/seed/plan1/1200/400',
    galeria: ['https://picsum.photos/seed/plan1/800/600', 'https://picsum.photos/seed/plan2/800/600'],
    imagen360: 'https://images.unsplash.com/photo-1596263576925-d90d63691097?q=80&w=1622&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    yaw: 0,
    pitch: 0,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'tic',
    nombre: 'Gestión TIC',
    descripcion: 'Soporte tecnológico y transformación digital de los procesos.',
    servicios: ['Soporte Técnico', 'Desarrollo de Software', 'Infraestructura'],
    banner: 'https://picsum.photos/seed/tic1/1200/400',
    galeria: ['https://picsum.photos/seed/tic1/800/600', 'https://picsum.photos/seed/tic2/800/600'],
    imagen360: '/360/prueba3.jpg',
    yaw: 180,
    pitch: -15,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'juridica',
    nombre: 'Gestión Jurídica',
    descripcion: 'Asesoría legal y normativa para garantizar la transparencia institucional.',
    servicios: ['Asesoría Legal', 'Contratación', 'Defensa Judicial'],
    banner: 'https://picsum.photos/seed/jur1/1200/400',
    galeria: ['https://picsum.photos/seed/jur1/800/600', 'https://picsum.photos/seed/jur2/800/600'],
    imagen360: '/360/juridica.jpg',
    yaw: 0,
    pitch: 0,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'control-interno',
    nombre: 'Gestión Control Interno',
    descripcion: 'Evaluación y auditoría de los procesos para la mejora continua.',
    servicios: ['Auditoría', 'Evaluación de Gestión', 'Gestión de Riesgos'],
    banner: 'https://picsum.photos/seed/ctrl1/1200/400',
    galeria: ['https://picsum.photos/seed/ctrl1/800/600', 'https://picsum.photos/seed/ctrl2/800/600'],
    imagen360: '/360/control-interno.jpg',
    yaw: 0,
    pitch: 0,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'humana',
    nombre: 'Gestión Humana',
    descripcion: 'Administración del talento humano y bienestar de los colaboradores.',
    servicios: ['Nómina', 'Bienestar Laboral', 'Selección de Personal'],
    banner: 'https://picsum.photos/seed/hum1/1200/400',
    galeria: ['https://picsum.photos/seed/hum1/800/600', 'https://picsum.photos/seed/hum2/800/600'],
    imagen360: '/360/humana.jpg',
    yaw: 0,
    pitch: 0,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'contratacion',
    nombre: 'Gestión Contratación',
    descripcion: 'Procesos de adquisición de bienes y servicios.',
    servicios: ['Licitaciones', 'Proveedores', 'Compras'],
    banner: 'https://picsum.photos/seed/cont1/1200/400',
    galeria: ['https://picsum.photos/seed/cont1/800/600', 'https://picsum.photos/seed/cont2/800/600'],
    imagen360: '/360/contratacion.jpg',
    yaw: 0,
    pitch: 0,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'administrativo',
    nombre: 'Gestión Administrativa',
    descripcion: 'Manejo eficiente de los recursos físicos y administrativos de la organización.',
    servicios: ['Mantenimiento', 'Inventario', 'Logística'],
    banner: 'https://picsum.photos/seed/adm1/1200/400',
    galeria: ['https://picsum.photos/seed/adm1/800/600', 'https://picsum.photos/seed/adm2/800/600'],
    imagen360: '/360/administrativo.jpg',
    yaw: 0,
    pitch: 0,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'financiera-contable',
    nombre: 'Gestión Financiera y Contable',
    descripcion: 'Manejo de los recursos financieros, presupuestales y contables de la institución.',
    servicios: ['Contabilidad', 'Tesorería', 'Estados Financieros'],
    banner: 'https://picsum.photos/seed/fin1/1200/400',
    galeria: ['https://picsum.photos/seed/fin1/800/600', 'https://picsum.photos/seed/fin2/800/600'],
    imagen360: '/360/financiera-contable.jpg',
    yaw: 0,
    pitch: 0,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'recaudo-cobro-02',
    nombre: 'Gestión Recaudo y Cobro',
    descripcion: 'Procesos de recaudo de aportes y gestión de cartera.',
    servicios: ['Cobro Persuasivo', 'Conciliaciones', 'Liquidación'],
    banner: 'https://picsum.photos/seed/rec1/1200/400',
    galeria: ['https://picsum.photos/seed/rec1/800/600', 'https://picsum.photos/seed/rec2/800/600'],
    imagen360: '/360/recaudo-cobro-02.jpg',
    yaw: 0,
    pitch: 0,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'presupuesto-tesoreria',
    nombre: 'Gestión Presupuesto y Tesorería',
    descripcion: 'Asignación, seguimiento y control de las partidas presupuestales de la caja.',
    servicios: ['Pagos', 'Flujo de Caja', 'CDPs'],
    banner: 'https://picsum.photos/seed/pres1/1200/400',
    galeria: ['https://picsum.photos/seed/pres1/800/600', 'https://picsum.photos/seed/pres2/800/600'],
    imagen360: '/360/presupuesto-tesoreria.jpg',
    yaw: 0,
    pitch: 0,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

export const getLugares = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(LUGARES_DB);
    }, 800);
  });
};

export const getLugarById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const lugar = LUGARES_DB.find(l => l.id === id);
      if (lugar) {
        resolve(lugar);
      } else {
        reject(new Error('Lugar no encontrado'));
      }
    }, 500);
  });
};
