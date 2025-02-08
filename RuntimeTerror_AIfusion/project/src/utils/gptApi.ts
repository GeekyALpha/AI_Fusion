const GPT_API_KEY = 'api removed due to security constraints';

export async function generateAIAnalysis(data: any, prompt: string): Promise<string> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GPT_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an AI waste management expert that analyzes environmental data and provides insights.'
          },
          {
            role: 'user',
            content: prompt + '\n' + JSON.stringify(data)
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    const result = await response.json();
    return result.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI analysis:', error);
    return 'Unable to generate analysis at this time.';
  }
}
