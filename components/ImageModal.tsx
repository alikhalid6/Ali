import React, { useState, MouseEvent } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl }) => {
  const [transform, setTransform] = useState('scale(1)');
  const [transformOrigin, setTransformOrigin] = useState('center center');

  if (!isOpen || !imageUrl) return null;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setTransform('scale(2)'); // Zoom factor
    setTransformOrigin(`${x}% ${y}%`);
  };

  const handleMouseLeave = () => {
    setTransform('scale(1)');
    setTransformOrigin('center center');
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative max-w-4xl max-h-[90vh] overflow-hidden cursor-zoom-in rounded-lg"
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={imageUrl}
          alt="Product closeup"
          className="block max-w-full max-h-[90vh] object-contain transition-transform duration-100 ease-out"
          style={{ transform, transformOrigin }}
        />
      </div>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-5xl font-light hover:text-gray-300 transition-colors leading-none"
        aria-label="Close image view"
      >
        &times;
      </button>
    </div>
  );
};

export default ImageModal;