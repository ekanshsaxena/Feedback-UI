import Card from './shared/Card';
import PropTypes from 'prop-types';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackItem({ item }) {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext);
  return (
    <Card>
      <div className='num-display'>{item.rating}</div>
      <button
        onClick={() => {
          deleteFeedback(item.id);
        }}
        className='close'
      >
        <FaTimes color='purple' />
      </button>
      {/* We provide reference of function to onClick, because if we directly assign editFeedback to onClick then
      it starts executing during the runtime, when this parent component is getting rendered.
      So, in between the rendering this editFeedback executes and updates the state which will re trigger
      the rendering of this component, which will again hit editFeedback to update the state, and 
      this will go on infinitely. */}
      <button
        onClick={() => {
          editFeedback(item);
        }}
        className='edit'
      >
        <FaEdit color='purple' />
      </button>
      <div className='text-display'>{item.text}</div>
    </Card>
  );
}

FeedbackItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    rating: PropTypes.number,
  }),
};

export default FeedbackItem;
