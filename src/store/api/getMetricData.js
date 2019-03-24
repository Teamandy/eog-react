import 'isomorphic-fetch';

const getMetricData = async () => {
  try {
    const response = await fetch(
      `https://react-assessment-api.herokuapp.com/api/drone`
    );
    if (!response.ok) {
      return { error: { code: response.status } };
    }
    const json = await response.json();
    return { data: json };
  } catch (error) {
    return { error: { code: error.message } };
  }
};

export default getMetricData;
