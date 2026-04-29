const { rtrim } = require('../authentication');

const perform = async (z, bundle) => fetchLookup(z, bundle, 'categories');

const fetchLookup = async (z, bundle, kind) => {
  const response = await z.request({
    url: `${rtrim(bundle.authData.api_base_url)}/lookup/${kind}`,
    headers: { Authorization: `Bearer ${bundle.authData.api_key}` },
  });
  const rows = response.data?.data ?? response.data ?? [];
  return rows.map((r) => ({
    id: String(r.id ?? ''),
    name: typeof r.name === 'string' ? r.name : (r.name?.en ?? ''),
  }));
};

module.exports = {
  key: 'list_categories',
  noun: 'Category',
  display: {
    label: 'List Categories',
    description: 'List the support categories defined on your Ubiquilife Support instance.',
    hidden: true,
  },
  operation: {
    perform,
    sample: { id: '01ABCDEF-…', name: 'Bug' },
  },
};

module.exports.fetchLookup = fetchLookup;
