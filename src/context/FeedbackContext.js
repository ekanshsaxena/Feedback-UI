import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const url = 'https://feedback-backend-4cq6.onrender.com';

  const fetchFeedback = async () => {
    const response = await fetch(`${url}/`);
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };

  const editFeedback = (item) => {
    setFeedbackEdit({
      item: item,
      edit: true,
    });
  };

  const addFeedback = async (newFeedback) => {
    const response = await fetch(`${url}/addFeedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    });
    const data = await response.json();
    setFeedback([data, ...feedback]);
  };

  const deleteFeedback = async (id) => {
    await fetch(`${url}/deleteFeedback/${id}`, {
      method: 'DELETE',
    });
    setFeedback(feedback.filter((item) => item.id !== id));
  };

  const updateFeedback = async (id, updatedFeedback) => {
    console.log(id);
    console.log(updateFeedback);
    const response = await fetch(`${url}/updateFeedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFeedback),
    });

    const data = await response.json();
    setFeedback(feedback.map((item) => (item.id === id ? data : item)));
    setFeedbackEdit({
      item: {},
      edit: false,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
