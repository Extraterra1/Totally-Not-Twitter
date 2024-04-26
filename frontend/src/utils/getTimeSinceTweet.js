import moment from 'moment';

const getTimeSinceTweet = (timestamp) => {
  const startDate = moment(timestamp);

  // Calculate the duration since the start date
  const duration = moment.duration(moment().diff(startDate));

  // Format the duration
  let formattedDuration;
  if (duration.asHours() > 23) {
    // If the duration is greater than 23 hours, display the date in 'MMM DD' format
    formattedDuration = startDate.format('MMM DD');
  } else if (duration.asHours() >= 1) {
    // Otherwise, format the duration as hours with the 'h' suffix
    formattedDuration = moment.utc(duration.asMilliseconds()).format('H[h]');
  } else {
    formattedDuration = moment.utc(duration.asMilliseconds()).format('m[m]');
  }

  return formattedDuration;
};

export default getTimeSinceTweet;
