import React, { useState, useEffect } from 'react';

const reactions = [
  { id: 'love', emoji: '❤️', label: 'Love' },
  { id: 'haha', emoji: '😂', label: 'Haha' },
  { id: 'wow', emoji: '🤯', label: 'Wow' },
  { id: 'sad', emoji: '😢', label: 'Sad' },
  { id: 'angry', emoji: '😠', label: 'Angry' },
];

interface ReactionPanelProps {
  movieId: string;
}

const ReactionPanel: React.FC<ReactionPanelProps> = ({ movieId }) => {
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);

  const countStorageKey = `zackhub-reactions-${movieId}`;
  const selectionStorageKey = `zackhub-user-reaction-${movieId}`;

  useEffect(() => {
    try {
      const storedCounts = localStorage.getItem(countStorageKey);
      const storedSelection = localStorage.getItem(selectionStorageKey);

      const initialCounts = reactions.reduce((acc, reaction) => ({ ...acc, [reaction.id]: 0 }), {});
      
      if (storedCounts) {
        setCounts({ ...initialCounts, ...JSON.parse(storedCounts) });
      } else {
        setCounts(initialCounts);
      }
      
      if (storedSelection) {
        setSelectedReaction(storedSelection);
      }
    } catch (error) {
      console.error("Failed to parse reactions from localStorage", error);
      const initialCounts = reactions.reduce((acc, reaction) => ({ ...acc, [reaction.id]: 0 }), {});
      setCounts(initialCounts);
    }
  }, [movieId, countStorageKey, selectionStorageKey]);

  const handleReactionClick = (reactionId: string) => {
    let newCounts = { ...counts };
    let newSelectedReaction: string | null = null;

    if (selectedReaction === reactionId) {
      // Deselecting the current reaction
      newCounts[reactionId] = Math.max(0, (newCounts[reactionId] || 1) - 1);
      newSelectedReaction = null;
    } else {
      // Switching reaction or selecting for the first time
      if (selectedReaction) {
        newCounts[selectedReaction] = Math.max(0, (newCounts[selectedReaction] || 1) - 1);
      }
      newCounts[reactionId] = (newCounts[reactionId] || 0) + 1;
      newSelectedReaction = reactionId;
    }

    setCounts(newCounts);
    setSelectedReaction(newSelectedReaction);

    try {
      localStorage.setItem(countStorageKey, JSON.stringify(newCounts));
      if (newSelectedReaction) {
        localStorage.setItem(selectionStorageKey, newSelectedReaction);
      } else {
        localStorage.removeItem(selectionStorageKey);
      }
    } catch (error) {
      console.error("Failed to save reactions to localStorage", error);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-8 flex-wrap">
      {reactions.map((reaction) => {
        const isSelected = selectedReaction === reaction.id;
        return (
          <div key={reaction.id} className="flex flex-col items-center gap-2">
            <button
              onClick={() => handleReactionClick(reaction.id)}
              className={`
                relative p-3 rounded-full transition-all duration-300 transform 
                hover:scale-125 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-opacity-50
                ${
                  isSelected 
                    ? 'bg-brand-primary/20 ring-2 ring-brand-primary scale-125 -translate-y-1'
                    : 'bg-light-sidebar dark:bg-brand-card shadow-sm hover:shadow-md focus:ring-brand-primary/50'
                }
              `}
              aria-pressed={isSelected}
              aria-label={`React with ${reaction.label}`}
            >
              <span className="text-3xl sm:text-4xl" role="img" aria-label={reaction.label}>
                {reaction.emoji}
              </span>
            </button>
            <span className="font-bold text-light-text dark:text-brand-text">
              {counts[reaction.id] || 0}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ReactionPanel;