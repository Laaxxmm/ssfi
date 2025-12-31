import { createRazorpayOrder } from '../backend/paymentController'; // Importing mock backend function directly for demo

declare global {
    interface Window {
        Razorpay: any;
    }
}

export const initializePayment = async (
    amount: number, 
    user: { name: string; email: string; phone: string },
    description: string = "SSFI Transaction"
) => {
    return new Promise((resolve, reject) => {
        const loadScript = (src: string) => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });
        };

        const handlePayment = async () => {
            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

            if (!res) {
                alert('Razorpay SDK failed to load. Are you online?');
                reject('SDK Load Failed');
                return;
            }

            // 1. Call Backend to create Order
            // In a real app: const order = await fetch('/api/create-order', ...);
            const order = await createRazorpayOrder(amount);

            const options = {
                key: 'rzp_test_MOCK_KEY_ID', // Enter the Key ID generated from the Dashboard
                amount: order.amount,
                currency: order.currency,
                name: 'SSFI',
                description: description,
                image: 'https://cdn-icons-png.flaticon.com/512/2560/2560548.png', // Replace with SSFI Logo URL
                order_id: order.id,
                handler: async function (response: any) {
                    console.log("Payment Success:", response);
                    // 2. Call Backend to Verify Payment
                    // await fetch('/api/verify-payment', { body: response });
                    
                    alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
                    resolve(response);
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.phone
                },
                notes: {
                    address: "SSFI Corporate Office"
                },
                theme: {
                    color: "#1A237E" // SSFI Navy Blue
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        };

        handlePayment();
    });
};
