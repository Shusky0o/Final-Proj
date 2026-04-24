// src/services/laundryService.ts

/**
 * Service to handle all Laundry/Order related API calls to the Render backend.
 */

export const getApiUrl = () => {
  const url = process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    console.error(" API URL is missing! Ensure .env has NEXT_PUBLIC_API_URL and you restarted the terminal.");
  }
  return url;
};

/**
 * Fetches all orders and maps them to the frontend format
 */
export const fetchRecordLogs = async () => {
  const API_URL = getApiUrl();
  if (!API_URL) return [];

  try {
    const response = await fetch(`${API_URL}/orders`);
    
    if (!response.ok) {
      console.error(`Backend responded with status: ${response.status}`);
      throw new Error('Failed to connect to backend');
    }

    const result = await response.json();

    // to map the supabase columns (customer_name, load) to UI names (name, loads)
    return result.data.map((order: any) => ({
      id: `#${order.id}`,
      name: order.customer_name,
      loads: order.load,
      status: order.status,
      // Formatting timestamp to "10:30 AM"
      time: new Date(order.created_at).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    }));
  } catch (error) {
    console.error("DETAILED CONNECTION ERROR:", error);
    return [];
  }
};

/**
 * Deletes a specific order from the database by ID
 */
export const deleteOrder = async (id: number | string) => {
  const API_URL = getApiUrl();
  if (!API_URL) return false;

  // If ID has a '#' prefix (like #108), remove it to get just the number
  const cleanId = typeof id === 'string' ? id.replace('#', '') : id;

  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: Number(cleanId) }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend Delete Error:", errorData);
      throw new Error('Failed to delete');
    }

    return true;
  } catch (error) {
    console.error("DELETE REQUEST ERROR:", error);
    return false;
  }
};