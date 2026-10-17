import { useState } from 'react';

// Inline fallback so an image can never render as a broken link.
const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'><rect width='100%' height='100%' fill='#e4f3f8'/><path d='M370 190h60v60h60v60h-60v60h-60v-60h-60v-60h60z' fill='#0e6e8c' opacity='.35'/></svg>",
  );

export default function Img({ src, alt = '', className = '', ...rest }) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      src={failed ? FALLBACK : src}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  );
}
