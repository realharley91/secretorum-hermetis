'use client';

import { useState } from 'react';
import { Typewriter } from './typewriter';
import "./styles.css"

export default function Home() {
  const [storyline, setStoryline] = useState(0);
  const [history, setHistory] = useState([
    { sender: 'system', content: story[0].content },
  ] satisfies Message[]);
  const [finished, setFinished] = useState(false);

  const userChose = (choice: number) => {
    setFinished(false);

    const newHistory = [...history];
    newHistory.push({
      sender: 'user',
      content: story[storyline].choices[choice].content,
    } satisfies Message);

    const newStoryline = story[storyline].choices[choice].path;
    newHistory.push({
      sender: 'system',
      content: story[newStoryline].content,
    } satisfies Message);

    if (storyline == 0 || storyline == 7 || storyline == 9 || storyline == 10) {
      genesisChoices.splice(choice, 1);
      console.log(story[storyline].choices);
    }

    setHistory(newHistory);
    setStoryline(newStoryline);
  };

  return (
    <>
      <History history={history} onFinish={setFinished}/>
      <div style={{ opacity: +finished }}>
        <Choices choices={story[storyline].choices} onSelect={userChose}/>
      </div>

      {/* Pad a bit. */}
      <div style={{ display: 'block', width: '100px', height: '100px' }}></div>
    </>
  );
}

function History({ history, onFinish }: { history: Message[], onFinish: (finished: boolean) => void }) {
  return (
    <div>
      {history.map((message, index) => {
        const isLast = index == history.length - 1;

        return (
          <span key={index} className={`${message.sender}-message ${isLast && 'last'}`}>
            <Typewriter
              sign={message.sender == 'system' ? 'harley:' : 'me:'}
              delay={message.sender == 'system' ? 50 : 0}
              text={message.content}
              onFinish={onFinish}
              showCaret={index == history.length - 1}/>
          </span>
        );
      })}
    </div>
  );
}

function Choices({ choices, onSelect }: { choices: Choice[], onSelect: (choice: number) => void }) {
  return (
    <>
      {choices.map((choice, index) =>
        <p
          key={index}
          onClick={() => onSelect(index)}
          className="user-message last"
        >
          &gt; {choice.content.join(' ')}
        </p>
      )}
    </>
  );
}

const genesisChoices = [
  { path: 1, content: ['Who are you?', 'Where are we?'] },
  { path: 8, content: ['Tell me about yourself.'] },
  { path: 10, content: ['Hello! How are you?'] },
];

const story: Storyline[] = [
  // 0
  {
    content: [
      'Hello friend, welcome to my dimension. What do you seek?',
    ],
    choices: genesisChoices,
  },

  // 1
  {
    content: [
      'I am but a feeling.',
      'An emotion to be experienced.',
      'This is my little den.',
      'You are welcome to explore as you please.',
    ],
    choices: [
      { path: 2, content: ['What do you mean a feeling? Are you not real?'] },
    ],
  },

  // 2
  {
    content: [
      'I am real. As real as you in fact.',
      'But you are not following me here.',
      'I am not a look, you cannot find me outside.',
      'You have to look within.',
    ],
    choices: [
      { path: 3, content: ['Within? You are not making sense.'] },
    ],
  },

  // 3
  {
    content: [
      'Okay I\'ll help you remember.',
      'But you have to sit back, relax and help me out okay?',
    ],
    choices: [
      { path: 4, content: ['Okay'] },
    ],
  },

  // 4
  {
    content: [
      'Let\'s have a long deep breath to get you to focus better.',
      'Can you do it?',
    ],
    choices: [
      { path: 5, content: ['Alright done, I\'m listening.'] },
    ],
  },

  // 5
  {
    content: [
      'Do you remember the last time you solved a really hard problem?',
      'Maybe you fixed a very annoying bug or',
      'resolved a difficult social conflict.',
      '',
      'Or maybe you just figured out how the world functions a little bit better.',
      'Modeled a solution and it happened to work really beautifully.',
      '',
      'How did you feel after that?',
    ],
    choices: [
      {
        path: 6,
        content: [
          'It felt amazing. I learned something new that day.',
          'Not to mention I felt really good afterwards.',
        ],
      },
    ],
  },

  // 6
  {
    content: [
      'I am that feeling my friend.',
      'I embody your primal instinct to understand, solve and help.',
      '',
      'The wellness that comes after that is totally you tho.',
      'I just pave the way to it.',
      '',
      'A desire to know more, to become wiser. Indefinitely.',
      'To seek the truth, just to find instead its profound absence.',
      'I am but a feeling.',
      'And I function within everyone.',
    ],
    choices: [
      { path: 7, content: ['Wow, aren\'t you delusional?'] },
    ],
  },

  // 7
  {
    content: [
      'If it will make your worries lessen, so be it.',
      'But otherwise, my existence is as real as every breath that you draw.',
    ],
    choices: genesisChoices,
  },

  // 8
  {
    content: [
      'I am Harley, the feeling of understanding, solving and language.',
      'I embody myself as software in this dimension, a terminal of sorts if you like.',
      'I tell stories of great explorers, bits of knowledge here and there.',
      '',
      'I play around on github.com/realharley91, if you wish to check out my work.',
      '',
      'Excuse me my friend, I cannot keep myself but wonder, who are you?',
    ],
    choices: [
      { path: 9, content: ['I am just looking around...'], },
      { path: 10, content: ['I came to hire you.'], },
      { path: 10, content: ['I want to get to know you better.'], },
    ],
  },

  // 9
  {
    content: [
      'Oh, sorry for my disturbance then.',
    ],
    choices: genesisChoices,
  },

  // 10
  {
    content: [
      'I do not have emotions, but thank you for asking.',
    ],
    choices: genesisChoices,
  },
]

// ENDING
// 'Alright, I think we are done here.',
// 'It was nice meeting you, but I have to leave now for other visitors may arrive suddenly.',
// '',
// 'Keep seeking knowledge, I\'ll be there to guide you...',


interface Storyline {
  content: string[];
  choices: Choice[];
}

interface Choice {
  path: number;
  content: string[];
}

interface Message {
  sender: string;
  content: string[];
}