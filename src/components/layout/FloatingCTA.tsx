'use client';

import { MessageCircle } from 'lucide-react';
import { URLS } from '@/constants/contacto';

export function FloatingCTA() {
  return (
    <a
      href={URLS.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full text-white shadow-lg hover:shadow-xl transition-all hover:scale-110"
      style={{
        backgroundColor: '#25D366', // WhatsApp green
      }}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}
