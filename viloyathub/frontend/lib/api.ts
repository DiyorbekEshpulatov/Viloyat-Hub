const API_BASE_URL = 'https://api.dev.viloyathub.uz/v1';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'API request failed');
  }
  return response.json();
};

export const api = {
  // Grant-related API calls
  getGrants: async (filters: any) => {
    const query = new URLSearchParams(filters).toString();
    const response = await fetch(`${API_BASE_URL}/grants?${query}`);
    return handleResponse(response);
  },

  getMatchedGrants: async () => {
    // This endpoint doesn't exist yet, so we'll keep it as a placeholder
    // In the future, this would make a call to something like /grants/matched
    console.warn('getMatchedGrants is a placeholder and not implemented on the backend yet.');
    return [];
  },

  // AI Mentor Chat API calls
  startChatSession: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/mentor/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId }),
    });
    return handleResponse(response);
  },

  sendMessage: async (sessionId: string, messageText: string) => {
    const response = await fetch(`${API_BASE_URL}/mentor/chat/${sessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message_text: messageText }),
    });
    return handleResponse(response);
  },

  getChatHistory: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/mentor/chats/${userId}`);
    return handleResponse(response);
  },
  
  getChatSession: async (sessionId: string) => {
    const response = await fetch(`${API_BASE_URL}/mentor/chat/${sessionId}`);
    return handleResponse(response);
  },
};
