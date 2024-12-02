import { useState, useEffect, memo } from 'react';
import localFont from "next/font/local";

export const departureMono = localFont({
  src: "./fonts/DepartureMono-Regular.woff2",
  variable: "--font-departure-mono",
  weight: "400",
});

export const Typewriter = memo(({
  sign,
  text: texts,
  delay = 100,
  onFinish,
  showCaret
}: {
  sign: string,
  text: string[],
  delay: number,
  onFinish: (finished: boolean) => void,
  showCaret: boolean,
}) => {
  const text = texts.join('\n');

  const [finished, setFinished] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  let calculatedDelay = delay;
  if (!finished && delay > 0 && currentIndex > 0) {
    switch (text[currentIndex-1]) {
    case ',':
      calculatedDelay += 200;
      break;
    case '.':
    case '?':
      calculatedDelay += 500;
      break;
    }
  }

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
        scrollToBottom();
      }, calculatedDelay);
    } else if (delay > 0 && !finished && currentIndex == text.length) {
      setFinished(true);
      onFinish(true);
    }

    return () => clearTimeout(timeout);
  }, [calculatedDelay, finished, onFinish, currentIndex, delay, text]);

  return (
    <span>
      <pre className={`${departureMono.className}`}>
        {sign + ' '}
        {currentText}
        {showCaret && <span className="caret"></span>}
      </pre>
    </span>
  );
});

Typewriter.displayName = 'Typewriter';

function scrollToBottom() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}