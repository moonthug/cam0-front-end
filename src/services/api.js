//
//

const API_URL = 'http://127.0.0.1:4000';

/**
 *
 * @returns {Promise|Promise.<TResult>|*}
 */
export const fetchPatterns = () => {
  return fetch(`${API_URL}/patterns`).then(response => response.json());
};
