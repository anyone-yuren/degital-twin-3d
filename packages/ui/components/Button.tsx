import React from 'react';

function Button({ title, ...res }: { title: string }) {
  return (
    <button {...res}>
      <span>{title}</span>
    </button>
  );
}

export default Button;
