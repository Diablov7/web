import React from 'react';
import { urlFor } from '../../lib/sanity';

// Componente para renderizar blocos de conteúdo do Sanity
const BlockContent = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <div className="prose prose-invert prose-lg max-w-none">
      {blocks.map((block, index) => {
        if (block._type === 'block') {
          // Texto normal
          const style = block.style || 'normal';
          const text = block.children
            ?.map((child) => child.text || '')
            .join('') || '';

          if (style === 'h1') {
            return (
              <h1
                key={index}
                className="text-4xl font-bold mb-6 mt-8 text-white font-orbitron"
              >
                {text}
              </h1>
            );
          }
          if (style === 'h2') {
            return (
              <h2
                key={index}
                className="text-3xl font-bold mb-4 mt-6 text-white font-orbitron"
              >
                {text}
              </h2>
            );
          }
          if (style === 'h3') {
            return (
              <h3
                key={index}
                className="text-2xl font-bold mb-3 mt-4 text-white font-orbitron"
              >
                {text}
              </h3>
            );
          }
          if (style === 'blockquote') {
            return (
              <blockquote
                key={index}
                className="border-l-4 border-emerald-500 pl-4 my-4 italic text-gray-300"
              >
                {text}
              </blockquote>
            );
          }

          // Parágrafo normal
          return (
            <p key={index} className="mb-4 text-gray-300 leading-relaxed">
              {text}
            </p>
          );
        }

        if (block._type === 'image') {
          // Imagem
          const imageUrl = block.asset
            ? urlFor(block.asset).width(1200).url()
            : null;

          if (!imageUrl) return null;

          return (
            <figure key={index} className="my-8">
              <img
                src={imageUrl}
                alt={block.alt || ''}
                className="w-full rounded-lg"
              />
              {block.caption && (
                <figcaption className="text-center text-sm text-gray-400 mt-2">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        return null;
      })}
    </div>
  );
};

export default BlockContent;

