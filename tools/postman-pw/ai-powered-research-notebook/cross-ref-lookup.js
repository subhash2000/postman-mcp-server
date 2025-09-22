/**
 * Function to perform a CrossRef lookup for works based on a query.
 *
 * @param {Object} args - Arguments for the lookup.
 * @param {string} args.query - The query string to search for works.
 * @returns {Promise<Object>} - The result of the CrossRef lookup.
 */
const executeFunction = async ({ query }) => {
  const baseUrl = 'https://api.crossref.org/works';
  try {
    // Construct the URL with query parameters
    const url = new URL(baseUrl);
    url.searchParams.append('query', query);

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error performing CrossRef lookup:', error);
    return {
      error: `An error occurred while performing the CrossRef lookup: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for performing a CrossRef lookup.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'crossref_lookup',
      description: 'Perform a CrossRef lookup for works based on a query.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The query string to search for works.'
          }
        },
        required: ['query']
      }
    }
  }
};

export { apiTool };