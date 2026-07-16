import React from 'react';
import { CheckCircle2, XCircle, ShoppingCart, MessageCircle, Send } from 'lucide-react';
import { ReviewData } from '../types';

interface ReviewCardProps {
  data: ReviewData;
}

export default function ReviewCard({ data }: ReviewCardProps) {
  const {
    productName,
    originalPrice,
    currentPrice,
    discountPercentage,
    pros,
    cons,
    affiliateLink,
    storeName,
    telegramLink,
    whatsappLink
  } = data;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="bg-white border-2 border-slate-100 rounded-xl mb-10 mt-6 shadow-sm overflow-hidden">
      {/* Header section */}
      <div className="p-6 pb-4 flex flex-col md:flex-row md:items-start justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-800 flex-1">
          {productName}
        </h2>
        <div className="flex flex-col items-end">
          {originalPrice && (
            <div className="flex items-center gap-2 text-sm text-slate-400 line-through">
              {formatCurrency(originalPrice)}
              {discountPercentage && (
                <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold no-underline">
                  -{discountPercentage}% OFF
                </span>
              )}
            </div>
          )}
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            {formatCurrency(currentPrice)}
          </div>
        </div>
      </div>

      {/* Pros and Cons section */}
      <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-50 rounded-lg p-5 border border-emerald-100">
          <h3 className="font-bold text-emerald-800 text-sm mb-3">Prós</h3>
          <ul className="space-y-2.5">
            {pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-rose-50 rounded-lg p-5 border border-rose-100">
          <h3 className="font-bold text-rose-800 text-sm mb-3">Contras</h3>
          <ul className="space-y-2.5">
            {cons.map((con, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0 mt-1.5" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action section */}
      <div className="p-6 pt-2 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-500 flex-1">
          A entrega dos itens depende do estoque na loja
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded font-bold transition-colors flex items-center justify-center gap-2 text-sm"
          >
            IR PARA A LOJA <ShoppingCart className="w-4 h-4 ml-1" />
          </a>
          
          {(whatsappLink || telegramLink) && (
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
              {whatsappLink && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#25D366] text-white rounded font-bold hover:brightness-110 transition-all flex items-center gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              )}
              {telegramLink && (
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#0088cc] text-white rounded font-bold hover:brightness-110 transition-all flex items-center gap-2 text-sm"
                >
                  <Send className="w-4 h-4" />
                  Telegram
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
