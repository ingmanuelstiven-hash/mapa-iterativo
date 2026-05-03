// Simulación de una base de datos de lugares basada en los IDs del SVG
const LUGARES_DB = [
  {
    id: 'servicios-sociales',
    nombre: 'Gestión Servicios Sociales',
    descripcion: 'Programas destinados al bienestar de la comunidad, salud y recreación.',
    servicios: ['Salud Preventiva', 'Recreación', 'Cultura'],
    galeria: ['https://picsum.photos/seed/ss1/800/600', 'https://picsum.photos/seed/ss2/800/600'],
  },
  {
    id: 'subsidio-familiar',
    nombre: 'Gestión Subsidio Familiar',
    descripcion: 'Administración y entrega de aportes para el fortalecimiento del núcleo familiar.',
    servicios: ['Cuota Monetaria', 'Vivienda', 'Educación'],
    galeria: ['https://picsum.photos/seed/sf1/800/600', 'https://picsum.photos/seed/sf2/800/600'],
  },
  {
    id: 'direccion',
    nombre: 'Dirección General',
    descripcion: 'Liderazgo estratégico y toma de decisiones para el cumplimiento de objetivos.',
    servicios: ['Estrategia', 'Liderazgo', 'Relaciones Públicas'],
    galeria: ['https://picsum.photos/seed/dir1/800/600', 'https://picsum.photos/seed/dir2/800/600'],
  },
  {
    id: 'planeacion',
    nombre: 'Gestión Planeación',
    descripcion: 'Proyección y seguimiento de metas institucionales a corto y largo plazo.',
    servicios: ['Seguimiento a Metas', 'Estadísticas', 'Proyectos'],
    galeria: ['https://picsum.photos/seed/plan1/800/600', 'https://picsum.photos/seed/plan2/800/600'],
  },
  {
    id: 'tic',
    nombre: 'Gestión TIC',
    descripcion: 'Soporte tecnológico y transformación digital de los procesos.',
    servicios: ['Soporte Técnico', 'Desarrollo de Software', 'Infraestructura'],
    galeria: ['https://picsum.photos/seed/tic1/800/600', 'https://picsum.photos/seed/tic2/800/600'],
  },
  {
    id: 'juridica',
    nombre: 'Gestión Jurídica',
    descripcion: 'Asesoría legal y normativa para garantizar la transparencia institucional.',
    servicios: ['Asesoría Legal', 'Contratación', 'Defensa Judicial'],
    galeria: ['https://picsum.photos/seed/jur1/800/600', 'https://picsum.photos/seed/jur2/800/600'],
  },
  {
    id: 'control-interno',
    nombre: 'Gestión Control Interno',
    descripcion: 'Evaluación y auditoría de los procesos para la mejora continua.',
    servicios: ['Auditoría', 'Evaluación de Gestión', 'Gestión de Riesgos'],
    galeria: ['https://picsum.photos/seed/ctrl1/800/600', 'https://picsum.photos/seed/ctrl2/800/600'],
  },
  {
    id: 'humana',
    nombre: 'Gestión Humana',
    descripcion: 'Administración del talento humano y bienestar de los colaboradores.',
    servicios: ['Nómina', 'Bienestar Laboral', 'Selección de Personal'],
    galeria: ['https://picsum.photos/seed/hum1/800/600', 'https://picsum.photos/seed/hum2/800/600'],
  },
  {
    id: 'contratacion',
    nombre: 'Gestión Contratación',
    descripcion: 'Procesos de adquisición de bienes y servicios.',
    servicios: ['Licitaciones', 'Proveedores', 'Compras'],
    galeria: ['https://picsum.photos/seed/cont1/800/600', 'https://picsum.photos/seed/cont2/800/600'],
  },
  {
    id: 'administrativo',
    nombre: 'Gestión Administrativa',
    descripcion: 'Manejo eficiente de los recursos físicos y administrativos de la organización.',
    servicios: ['Mantenimiento', 'Inventario', 'Logística'],
    galeria: ['https://picsum.photos/seed/adm1/800/600', 'https://picsum.photos/seed/adm2/800/600'],
  },
  {
    id: 'financiera-contable',
    nombre: 'Gestión Financiera y Contable',
    descripcion: 'Manejo de los recursos financieros, presupuestales y contables de la institución.',
    servicios: ['Contabilidad', 'Tesorería', 'Estados Financieros'],
    galeria: ['https://picsum.photos/seed/fin1/800/600', 'https://picsum.photos/seed/fin2/800/600'],
  },
  {
    id: 'recaudo-cobro-02',
    nombre: 'Gestión Recaudo y Cobro',
    descripcion: 'Procesos de recaudo de aportes y gestión de cartera.',
    servicios: ['Cobro Persuasivo', 'Conciliaciones', 'Liquidación'],
    galeria: ['https://picsum.photos/seed/rec1/800/600', 'https://picsum.photos/seed/rec2/800/600'],
  },
  {
    id: 'presupuesto-tesoreria',
    nombre: 'Gestión Presupuesto y Tesorería',
    descripcion: 'Asignación, seguimiento y control de las partidas presupuestales de la caja.',
    servicios: ['Pagos', 'Flujo de Caja', 'CDPs'],
    galeria: ['https://picsum.photos/seed/pres1/800/600', 'https://picsum.photos/seed/pres2/800/600'],
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
