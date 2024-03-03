import PropTypes from 'prop-types';

function FeedbackStats({ feedback }) {
  const average =
    feedback.length === 0
      ? 0
      : (
          feedback.reduce((acc, { rating }) => acc + rating, 0) /
          feedback.length
        )
          .toFixed(1)
          .replace(/[.,]0$/, '');

  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {average}</h4>
    </div>
  );
}

FeedbackStats.propTypes = {
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ),
};

export default FeedbackStats;
