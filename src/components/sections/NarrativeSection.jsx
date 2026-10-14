import React from 'react';

export const NarrativeSection = ({
  label,
  text,
  align = 'default',
  isBigHeadline = false,
  words = null,
  tagline = '',
}) => {
  if (isBigHeadline) {
    const rawWords = words || (text ? text.trim().split(/\s+/) : ['FORM', 'MEETS', 'FUTURE']);
    const w1 = rawWords[0] || 'FORM';
    const w2 = rawWords[1] || 'MEETS';
    const w3 = rawWords.slice(2).join(' ') || 'FUTURE';

    return (
      <section className="w-full min-h-[25vh] sm:min-h-[32vh] my-14 sm:my-24 flex flex-col items-center justify-center text-center px-4 relative z-10">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight uppercase font-serif-fraunces text-white leading-tight select-none">
          {w1}{' '}
          <span className="italic text-[#ff5a1f] font-serif-fraunces font-normal">
            {w2}
          </span>{' '}
          {w3}
        </h2>
        {tagline && (
          <p className="mt-4 text-[11px] sm:text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">
            {tagline}
          </p>
        )}
      </section>
    );
  }

  let alignClass = '';
  if (align === 'left') alignClass = ' project--left';
  if (align === 'right') alignClass = ' project--right';

  return (
    <section className={`project project--details${alignClass}`}>
      <span className="project__label project__label--default">{label}</span>
      <p>{text}</p>
    </section>
  );
};
