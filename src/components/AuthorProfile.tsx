import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import authorPortrait from '../assets/images/divino_luciano_belmiro.jpg';

export default function AuthorProfile() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
      <img 
        src={authorPortrait} 
        alt="Foto de Divino Luciano Belmiro" 
        className="w-24 h-24 rounded-full object-cover border-4 border-slate-50 mb-4 shadow-sm"
        loading="lazy"
        decoding="async"
      />
      <h3 className="font-heading font-bold text-xl text-brand-primary mb-1">Divino Luciano Belmiro</h3>
      <p className="text-sm font-semibold text-brand-secondary mb-4 leading-snug">
        Psicanalista Clínico &amp; Terapeuta Integrativo
      </p>
      
      <p className="text-sm text-slate-600 mb-6 leading-relaxed">
        Com uma abordagem que une a escuta analítica profunda e práticas integrativas de saúde, dedica-se a ajudar pessoas a ressignificarem suas dores e encontrarem equilíbrio emocional.
      </p>

      <div className="w-full flex flex-col gap-3 text-sm text-slate-600 bg-slate-50 rounded-lg p-4 border border-slate-100">
        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-brand-secondary flex-shrink-0" />
          <span>+55 (43) 98439-0879</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-brand-secondary flex-shrink-0" />
          <span className="text-left">Londrina, Paraná, Brasil</span>
        </div>
      </div>
    </div>
  );
}
