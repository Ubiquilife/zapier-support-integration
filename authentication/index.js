// Custom auth: the user supplies the Support API base URL and a bearer
// API key. We test by hitting `/lookup/categories`, which is a public
// read but still a useful health check that the URL + key are valid.

const test = async (z, bundle) => {
  const response = await z.request({
    url: `${rtrim(bundle.authData.api_base_url)}/lookup/categories`,
    headers: { Authorization: `Bearer ${bundle.authData.api_key}` },
  });
  return response.data;
};

const rtrim = (u) => (u || '').replace(/\/$/, '');

module.exports = {
  type: 'custom',
  test,
  fields: [
    {
      key: 'api_base_url',
      label: 'Support API URL',
      type: 'string',
      required: true,
      helpText: 'e.g. https://support.ubiqui.life/external-api',
    },
    {
      key: 'api_key',
      label: 'API key',
      type: 'string',
      required: true,
      helpText: 'Bearer token from the Support app\'s external API tokens page.',
    },
    {
      key: 'app_name',
      label: 'Source app name',
      type: 'string',
      required: false,
      default: 'Zapier',
      helpText: 'Reported as `source_app` on every ticket.',
    },
  ],
  connectionLabel: '{{api_base_url}}',
};
module.exports.rtrim = rtrim;
