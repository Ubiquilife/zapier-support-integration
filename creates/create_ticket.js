const { rtrim } = require('../authentication');

const perform = async (z, bundle) => {
  const inputs = bundle.inputData;
  const auth = bundle.authData;
  const context = {
    client_app: auth.app_name || 'Zapier',
    client_platform: 'zapier',
    zap_id: bundle.meta?.zap?.id,
    zap_step_id: bundle.meta?.id,
    timestamp: new Date().toISOString(),
  };
  const body = {
    title: inputs.title,
    description: inputs.description,
    source_app: auth.app_name || 'Zapier',
    category_id: inputs.category_id || undefined,
    priority_id: inputs.priority_id || undefined,
    reporter_name: inputs.reporter_name || undefined,
    source_url: inputs.source_url || undefined,
    identime_user_id: inputs.identime_user_id || undefined,
    context_data: JSON.stringify(context),
  };

  const response = await z.request({
    method: 'POST',
    url: `${rtrim(auth.api_base_url)}/tickets`,
    body,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.api_key}`,
    },
  });
  return response.data?.data ?? response.data;
};

module.exports = {
  key: 'create_ticket',
  noun: 'Ticket',
  display: {
    label: 'Create Support Ticket',
    description: 'Open a new ticket in your Ubiquilife Support backend.',
  },
  operation: {
    perform,
    inputFields: [
      { key: 'title', label: 'Title', required: true },
      { key: 'description', label: 'Description', type: 'text', required: true },
      {
        key: 'category_id',
        label: 'Category',
        dynamic: 'list_categories.id.name',
        helpText: 'Pulled live from your Support instance.',
      },
      {
        key: 'priority_id',
        label: 'Priority',
        dynamic: 'list_priorities.id.name',
      },
      { key: 'reporter_name', label: 'Reporter name' },
      { key: 'source_url', label: 'Source URL', helpText: 'Where the issue was reported from.' },
      { key: 'identime_user_id', label: 'IdentiMe user ID' },
    ],
    sample: { id: '01ABCDEF-…', title: 'Sample ticket' },
    outputFields: [
      { key: 'id', label: 'Ticket ID' },
      { key: 'title', label: 'Title' },
      { key: 'status', label: 'Status' },
      { key: 'priority', label: 'Priority' },
    ],
  },
};
