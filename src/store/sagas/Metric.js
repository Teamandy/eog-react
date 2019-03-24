import { takeEvery, call, put, cancel } from 'redux-saga/effects';
import API from '../api';
import * as actions from '../actions';

function* watchFetchMetric(action) {
  const { error, data } = yield call(API.getMetricData);
  if (error) {
    yield put({ type: actions.API_ERROR, code: error.code });
    yield cancel();
    return;
  }
  yield put({ type: actions.METRIC_DATA_RECEIVED, data });
}

function* watchAllMetric() {
  yield takeEvery(actions.FETCH_METRIC, watchFetchMetric);
}

export default [watchAllMetric];
