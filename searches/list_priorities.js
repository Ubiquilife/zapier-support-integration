const { fetchLookup } = require('./list_categories');

const perform = async (z, bundle) => fetchLookup(z, bundle, 'priorities');

module.exports = {
  key: 'list_priorities',
  noun: 'Priority',
  display: {
    label: 'List Priorities',
    description: 'List the support priorities defined on your Ubiquilife Support instance.',
    hidden: true,
  },
  operation: {
    perform,
    sample: { id: '01ABCDEF-…', name: 'High' },
  },
};
