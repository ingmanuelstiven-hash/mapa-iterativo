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
    nombre: 'Parque Ecológico La María',
    descripcion: 'Hermoso entorno ecológico y recreativo. Es un destino predilecto para caminatas al aire libre, acampar, observar aves y conectarse directamente con la naturaleza local.',
    servicios: ['Senderismo guiado', 'Zona de camping', 'Avistamiento de fauna'],
    banner: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1200&auto=format&fit=crop',
    galeria: [
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop'
    ],
    imagen360: '/360/prueba3.jpg',
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
