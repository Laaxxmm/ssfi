
export const createRazorpayOrder = async (amount: number) => {
    // Mock implementation
    return {
        id: "order_" + Date.now(),
        amount: amount * 100,
        currency: "INR"
    };
};
