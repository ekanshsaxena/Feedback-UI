import { createContext, useState } from 'react';
import feedbackData from '../data/FeedbackData';
import { v4 as uuid } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState(feedbackData);

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuid();
    setFeedback([newFeedback, ...feedback]);
  };

  const deleteFeedback = (id) => {
    setFeedback(feedback.filter((item) => item.id !== id));
  };

  return (
    <FeedbackContext.Provider value={{ feedback, deleteFeedback, addFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
