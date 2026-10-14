import React from 'react';

export const FlipGallery = ({
  id,
  wrapClassName = 'gallery-wrap',
  className = 'gallery',
  items = [],
  caption = '',
  hasParagraph = false,
}) => {
  return (
    <div className={wrapClassName}>
      <div className={className} id={id}>
        {items.map((item, index) => {
          const key = item.key || `${id}-item-${index}`;

          if (item.innerImage) {
            return (
              <div key={key} className={item.className}>
                <div
                  className="gallery__item-inner"
                  style={{ backgroundImage: `url(${item.innerImage})` }}
                />
              </div>
            );
          }

          return (
            <div
              key={key}
              className={item.className}
              style={{ backgroundImage: `url(${item.image})` }}
            />
          );
        })}

        {caption && (
          <div className="caption">
            {hasParagraph ? <p>{caption}</p> : caption}
          </div>
        )}
      </div>
    </div>
  );
};
