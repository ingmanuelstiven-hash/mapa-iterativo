// Simulación de una base de datos de lugares basada en los IDs del SVG
const LUGARES_DB = [
  {
    id: 'parque',
    nombre: 'Parque Principal de Simijaca',
    descripcion: 'El corazón del municipio, rodeado de hermosos jardines y arquitectura tradicional colonial. Un lugar tranquilo ideal para el descanso, rodeado por la calidez de su gente.',
    servicios: ['Senderos peatonales', 'Zonas de descanso', 'Eventos culturales'],
    banner: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=1200&auto=format&fit=crop',
    galeria: [
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop'
    ],
    imagen360: '/360/tic.jpg',
    yaw: 0,
    pitch: 0,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'iglesia',
    nombre: 'Parroquia Inmaculada Concepción',
    descripcion: 'Una joya arquitectónica colonial e histórica ubicada frente al parque principal. Destaca por su fachada imponente y su valor religioso para los habitantes de la región.',
    servicios: ['Patrimonio histórico', 'Turismo religioso', 'Arquitectura colonial'],
    banner: 'https://images.unsplash.com/photo-1548625361-155deee223d2?q=80&w=1200&auto=format&fit=crop',
    galeria: [
      'https://images.unsplash.com/photo-1548625361-155deee223d2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1478147427282-58a87a120781?q=80&w=800&auto=format&fit=crop'
    ],
    imagen360: '/360/tic.jpg',
    yaw: 120,
    pitch: -5,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'maria',
    nombre: 'Parque Ecológico y Recreativo La María',
    descripcion: `Este hermoso parque, alberga múltiples atractivos como el parque interactivo de tránsito, las canchas de fútbol, voleibol y tejo; los kioscos para asados familiares, el lago, los atractivos para niños, las llamas y la piscina que está en construcción. También se encuentra espacios para caminatas, actividades familiares, camping, eventos, entre otros.

El Parque Ecológico y Recreativo “La María” donado por el señor Agustín Parra, habitante de Simijaca y de propiedad del municipio. Es un espacio de esparcimiento y aprovechamiento del tiempo libre para las familias simijenses y visitantes, donde se puede disfrutar de un hermoso paisaje, hacer asados, acampar y pasar gratos momentos de contacto con el medio natural que brinda el parque.`,
    servicios: ['Senderismo guiado', 'Zona de camping', 'Avistamiento de fauna'],
    contacto: {
      direccion: 'Calle 7 No. 7-42, Simijaca',
      telefono: '(+57) 3219876558',
      email: 'alcaldia@simijaca-cundinamarca.gov.co'
    },
    comoLlegar: {
      mapaIframe: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3971.357982323091!2d-73.842041!3d5.513768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e41b557dfa6300d%3A0x431740abd59ec5dd!2sParque%20Ecol%C3%B3gico%20y%20Recreativo%20La%20Mar%C3%ADa!5e0!3m2!1ses-419!2sco!4v1782279136575!5m2!1ses-419!2sco" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>',
      link: 'https://maps.app.goo.gl/m9wRuH42wBoJep2k7'
    },
    banner: '/maria/fotos maria (1).JPG',
    galeria: [
      '/maria/fotos maria (1).JPG',
      '/maria/fotos maria (2).JPG',
      '/maria/fotos maria (3).JPG',
      '/maria/fotos maria (4).JPG',
      '/maria/fotos maria (5).JPG',
      '/maria/fotos maria (6).JPG',
      '/maria/fotos maria (7).JPG',
      '/maria/fotos maria (8).JPG',
      '/maria/fotos maria (9).JPG',
      '/maria/fotos maria (10).JPG',
      '/maria/fotos maria (11).JPG',
      '/maria/fotos maria (12).JPG'
    ],
    imagen360: '/360/pw.webp',
    yaw: 90,
    pitch: 0,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'cruz',
    nombre: 'Alto de la Cruz',
    descripcion: 'Ubicado en la cima del Cerro de San Juanito, este histórico lugar de peregrinación ofrece la mejor panorámica de todo el valle de Simijaca y los Picos del Sicuara.',
    servicios: ['Mirador turístico', 'Sendero viacrucis', 'Fotografía de paisaje'],
    banner: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    galeria: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop'
    ],
    imagen360: '/360/cruz_2.jpeg',
    yaw: 0,
    pitch: 0,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'sagrado',
    nombre: 'Monumento Sagrado Corazón',
    descripcion: 'Sitio de recogimiento espiritual y mirador natural ubicado en una colina con vistas al sector campestre de Simijaca, rodeado de paz y un entorno verde inigualable.',
    servicios: ['Turismo de fe', 'Mirador natural', 'Caminata corta'],
    banner: 'https://images.unsplash.com/photo-1550133730-695473e51000?q=80&w=1200&auto=format&fit=crop',
    galeria: [
      'https://images.unsplash.com/photo-1550133730-695473e51000?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop'
    ],
    imagen360: '/360/tic.jpg',
    yaw: 45,
    pitch: -10,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'bahama',
    nombre: 'Pico de Bahama',
    descripcion: 'Imponente formación montañosa y mirador natural. Un reto ideal para amantes del senderismo y trekking de montaña que buscan vistas únicas del valle.',
    servicios: ['Senderismo de montaña', 'Senderos ecológicos', 'Mirador panorámico'],
    banner: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1200&auto=format&fit=crop',
    galeria: [
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?q=80&w=800&auto=format&fit=crop'
    ],
    imagen360: '/360/prueba3.jpg',
    yaw: 180,
    pitch: -15,
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'lajas',
    nombre: 'Cuevas de las Lajas',
    descripcion: 'Maravillosa formación geológica natural con senderos de piedra, pequeñas cuevas y vegetación nativa que despierta leyendas de los ancestros muiscas de la región.',
    servicios: ['Espeleología básica', 'Caminata de aventura', 'Guías locales'],
    banner: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    galeria: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800&auto=format&fit=crop'
    ],
    imagen360: '/360/tic.jpg',
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
