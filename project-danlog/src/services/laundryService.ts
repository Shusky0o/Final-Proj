// src/services/laundryService.ts

export const fetchRecordLogs = async () => {

  const API_URL = process.env.NEXT_PUBLIC_API_URL; 

  if (!API_URL) {
    console.error("URL is still undefined. Did you restart the terminal?");
    return [];
  }

  try {
    const response = await fetch(`${API_URL}/orders`);
    
    if (!response.ok) {
      console.error(`Backend responded with status: ${response.status}`);
      throw new Error('Failed to connect to backend');
    }

    const result = await response.json();

    return result.data.map((order: any) => ({
      id: `#${order.id}`,
      name: order.customer_name,
      loads: order.load,
      status: order.status,
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