require("dotenv").config();
const stripe = require("stripe")("sk_test_51M0musLD614o9A7SU44IXTjGqtyiMzXQ0V6TMrT5ahGl8h7eccjmdfyDoGloSd1unM1XX9M0Ep83Zte8vCOaF2AE00Nhs0tFzX");

exports.handler = async (event) => {
    try {
        const {amount} = JSON.parse(event.body);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"]
        });
        return {
            statusCode: 200,
            body: JSON.stringify({paymentIntent}),
        };
    } catch (error) {
        console.log({error});

        return {
            statusCode: 400,
            body: JSON.stringify({error}),
        }
    }
}