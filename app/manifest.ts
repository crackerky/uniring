import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Üniring - ハラスメント未然防止教育プログラム',
    short_name: 'Üniring',
    description: '高校生発、ハラスメント未然防止教育プログラム',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#FFBFC7',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}