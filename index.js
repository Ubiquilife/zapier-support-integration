const authentication = require('./authentication');
const createTicket = require('./creates/create_ticket');
const listCategories = require('./searches/list_categories');
const listPriorities = require('./searches/list_priorities');

const addBearer = (request, z, bundle) => {
  if (bundle.authData?.api_key) {
    request.headers = request.headers || {};
    if (!request.headers.Authorization) {
      request.headers.Authorization = `Bearer ${bundle.authData.api_key}`;
    }
  }
  return request;
};

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication,
  beforeRequest: [addBearer],
  creates: {
    [createTicket.key]: createTicket,
  },
  searches: {
    [listCategories.key]: listCategories,
    [listPriorities.key]: listPriorities,
  },
};
