import * as actions from '../actions';

const initialState = {
  loading: false,
  data: [],
  error: null
};

const startLoading = (state, action) => {
  return { ...state, loading: true, error: null };
};

const apiError = (state, action) => {
  return { ...state, loading: false, error: action.code };
};

const metricDataRecevied = (state, action) => {
  const { data } = action.data;
  const { metric, latitude, longitude, timestamp } = data[data.length - 1];
  const timeAgo = ms => {
    const now = Date.now();
    const hrs = Math.floor((now - ms) / (1000 * 60 * 60));
    const min = Math.floor(((now - ms) / (1000 * 60)) % 60);
    // const sec = Math.floor(((now - ms) / 1000) % 60);
    return `${hrs}${hrs > 1 ? ' hours' : ' hour'} and ${min} min`;
  };
  return {
    ...state,
    loading: false,
    metric,
    latitude,
    longitude,
    timestamp: timeAgo(timestamp),
    data,
    error: null
  };
};

const handlers = {
  [actions.FETCH_METRIC]: startLoading,
  [actions.METRIC_DATA_RECEIVED]: metricDataRecevied,
  [actions.API_ERROR]: apiError
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === 'undefined') return state;
  return handler(state, action);
};
