/**
 * Function to summarize text using OpenAI's GPT model.
 *
 * @param {Object} args - Arguments for the summarization.
 * @param {string} args.model - The model to use for summarization.
 * @param {Array<Object>} args.messages - The messages to send to the model.
 * @returns {Promise<Object>} - The result of the summarization.
 */
const executeFunction = async ({ model, messages }) => {
  const url = 'https://api.openai.com/v1/chat/completions';
  const token = process.env.OPENAI_API_KEY;

  try {
    // Set up the request body
    const body = JSON.stringify({
      model: model,
      messages: messages
    });

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json'
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
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
    console.error('Error summarizing text:', error);
    return {
      error: `An error occurred while summarizing text: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for summarizing text using OpenAI's GPT model.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'summarize_with_openai',
      description: 'Summarize text using OpenAI\'s GPT model.',
      parameters: {
        type: 'object',
        properties: {
          model: {
            type: 'string',
            description: 'The model to use for summarization.'
          },
          messages: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                role: {
                  type: 'string',
                  description: 'The role of the message sender (e.g., system, user).'
                },
                content: {
                  type: 'string',
                  description: 'The content of the message.'
                }
              },
              required: ['role', 'content']
            },
            description: 'The messages to send to the model.'
          }
        },
        required: ['model', 'messages']
      }
    }
  }
};

export { apiTool };