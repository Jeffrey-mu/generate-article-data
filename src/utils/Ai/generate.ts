import { OpenAIStream, OpenAIStreamPayload } from "./OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing env var from OpenAI");
}

export const config = {
    runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
    const { prompt } = (await req.json()) as {
        prompt?: string;
    };

    if (!prompt) {
        return new Response("No prompt in the request", { status: 400 });
    }

    const payload: OpenAIStreamPayload = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                "role": "user",
                "content": "Please generate an article about Hire Purchase: An Overview for me Data Type user_name title main_title subtitle Time Keyword score description content is required"
            },
            {
                "role": "assistant", "content": `{
                    "user_name": "Susan Kelly",
                    "dimensions": ,
                    "time": ${new Date()},
                    "title": "What is Hire Purchase",
                    "main_title": "Hire Purchase: An Overview",
                    "description": "When you buy a vehicle via hire purchase, you make a down payment followed by regular payments over a certain amount of time to cover the remaining purchase price balance. Learn more about how to hire buy works so that you can choose whether or not it is the best kind of financing for you.",
                    "keywords": "hire purchase, hire purchase agreement, hire purchase financing",
                    "subtitle": "Hire Purchase: An Overview",
                    "content": "<p>One of the most common kinds of car financing is called <strong>hire purchase</strong>, and it allows consumers to start driving a new vehicle before paying off the whole purchase price. It is essentially a loan guaranteed by the value of your automobile as collateral.</p><p>In most cases, you will first make a down payment and then get <strong>hire purchase financing</strong> to cover the remaining vehicle cost. You will return this loan in equal monthly installments throughout an agreed-upon time.</p><p>In essence, you are \"hiring\" the vehicle from the financing company for the duration you make payments on it. You can become the sole owner of the car by paying an \"option to purchase\" fee after your lease agreement has concluded and you have completed the last payment on the vehicle. The vast majority of individuals will, in most cases, choose to do this since it will, in most cases, be a negligible price compared to the value of the vehicle; nevertheless, it may not be worthwhile to do so on less expensive automobiles.</p><h2>How Does Hire Purchase Work?</h2><p>A down payment is often required to acquire a vehicle at the beginning of the hire purchase process. The down payment is typically at least 10% of the car's worth; however, certain lenders may provide financing with a lower initial investment requirement.</p><p>Be mindful, however, that the lower the deposit you put down on the vehicle, the higher the monthly payments will be and the more costly the total financing arrangement is likely to be. After making the first down payment, you will have the remainder of the car's price and any applicable interest deducted from your monthly payments to the loan company. The typical range for hire purchase periods is between 12 and 60 months.</p><p>When the hire purchase contract is in effect, you will be listed as the \"keeper\" of the vehicle, but the loan provider will continue to have the title of legal ownership. This implies that if you fall behind on your payments, the supplier can reclaim the car as collateral for the debt.</p><p>After the lease agreement, you can buy and fully own the vehicle by paying a last \"option to purchase\" cost. This will typically be a lower amount than your regular monthly payments, and it may be as little as £10; nevertheless, you should verify the conditions of your contract to see the precise amount you would be required to pay in this situation.</p><p>If you have paid back more than half of the total sum owed to you under the terms of your <strong>hire purchase agreement</strong>, you can return the vehicle and terminate the contract early. The word for this scenario is \"voluntary termination.\" This method of terminating the contract will not negatively impact your credit rating; nevertheless, it may show up on your credit file, and certain lenders may view it unfavorably if it is done often.</p><p><img src=\"/uploadsImg/1678693165036.jpeg\" alt=\"\"></p><h2>Who Is The Hire Purchase For?</h2><p>If you don't have the money to buy a vehicle altogether, a hire purchase might be a suitable alternative for you to consider. Those who would normally have trouble affording a car may be able to purchase one with this option since it enables them to pay for the vehicle in monthly installments.</p><p>If you want to buy the vehicle after the contract, a hire purchase is an excellent financing option for you to consider. If, after a few years, you wish to upgrade to a newer automobile model, then purchasing on a payment plan or leasing may be a better option for you.</p><h2>Advantages</h2><p><img src=\"/uploadsImg/1678693162971.jpeg\" alt=\"\"></p><ul><li>Applicable on both new and pre-owned automobiles.</li><li>If you don't have the money to purchase a vehicle all at once, this option might help you pay for it over time with manageable monthly payments.</li><li>Carries monthly payments and a rate of interest that is set.</li><li>You will simply be required to make a modest first payment.</li><li>Since the loan is secured against the vehicle, it may be possible for those with a lower credit score to purchase a car. This is in contrast to a personal loan, which is unsecured.</li><li>After the lease agreement, you will be given the option to purchase the car outright.</li><li>Just a nominal one-time payment is required to take ownership of the vehicle.</li><li>Unlike a PCP or a lease, it often does not come with limits on the number of miles driven.</li></ul>",
                    "picture": "/uploadsImg/1678693165369.jpg",
                    "score": null,
                }
                `
            },
            {
                "role": "user",
                "content": "Please generate an article for me Data Type user_name title main_title subtitle time Keyword score description content is required return my json datatype"
            },
            { "role": "user", "content": "Please return my article according to the content I sent" },
            { "role": "user", "content": prompt },
        ],
    };

    const stream = await OpenAIStream(payload);
    return new Response(stream);
};

export default handler;
