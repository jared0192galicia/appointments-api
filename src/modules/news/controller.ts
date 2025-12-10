import type { Context } from 'hono';

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  imageUrl?: string;
  link?: string;
  createdAt: string;
};

export async function getNewsController(context: Context) {
  try {
    // Por ahora devolvemos datos estáticos. Más adelante puedes cargar desde BD.
    const now = new Date();
    const items: NewsItem[] = [
      {
        id: 'n1',
        title: 'Promoción de Año Nuevo',
        summary: 'Aprovecha nuestro 25% de descuento en todas las consultas.',
        imageUrl: '/images/news/newyear.png',
        link: '/ofertas/newyear',
        createdAt: now.toISOString()
      },
      {
        id: 'n2',
        title: 'Nuevos horarios disponibles',
        summary: 'Hemos añadido más turnos para fines de semana.',
        imageUrl: '/images/news/schedule.png',
        createdAt: now.toISOString()
      }
    ];

    return context.json({ success: true, data: items }, 200);
  } catch (error) {
    console.error('getNewsController error:', error);
    return context.json({ success: false, error: 'Error interno' }, 500);
  }
}
