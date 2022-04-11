const Order = require("../app/order/model");

module.exports = {
    invoices: async (req, res) => {
        const token = req.headers['x-callback-token']
        if(token === process.env.XDT_CALLBACK_TOKEN) {
            const { external_id } = req.body;

            await Order.findOneAndUpdate({ 'orderId': external_id }, { status: 'Aktif' })
                .then(r => {
                    if(r === null || r === {} || r === []) {
                        return res.status(500).json({ message: 'Callback failed!' });
                    } else {
                        return res.status(200).json({ message: 'Callback success!' });
                    }
                })
                .catch(e => {
                    return res.status(500).json({ message: 'Callback failed!' });
                })
        } else {
            return res.status(500).json({ message: 'Callback failed!' });
        }
    }
}

// {
//     id: '6253c923f440fa304cdb991a',
//         external_id: 'INV-1649658139569',
//     user_id: '6219bd913b9082083b96ffd2',
//     status: 'PENDING',
//     merchant_name: 'PT Dua Karya Digital',
//     merchant_profile_picture_url: 'https://xnd-merchant-logos.s3.amazonaws.com/business/production/6219bd913b9082083b96ffd2-1646200333480.png',
//     amount: 60500,
//     description: 'Pembelian dari TITIKOMA CAFE',
//     expiry_date: '2022-04-12T06:22:27.597Z',
//     invoice_url: 'https://checkout-staging.xendit.co/web/6253c923f440fa304cdb991a',
//     available_banks: [],
//     available_ewallets: [],
//     available_direct_debits: [],
//     available_paylaters: [],
//     should_exclude_credit_card: true,
//     should_send_email: false,
//     success_redirect_url: 'https://doc.erpn.us/order/success',
//     failure_redirect_url: 'https://doc.erpn.us/order/failed',
//     created: '2022-04-11T06:22:28.151Z',
//     updated: '2022-04-11T06:22:28.151Z',
//     currency: 'IDR',
//     fees: [ { type: 'PPN 10%', value: 5500 } ],
//     reminder_date: '2022-04-11T18:22:27.597Z',
//     customer: {
//     given_names: 'Ab non voluptatem N',
//         email: 'vangtr10@gmail.com',
//         mobile_number: 'Ut eveniet sed enim'
// },
//     customer_notification_preference: {
//         invoice_created: [ 'email' ],
//             invoice_reminder: [ 'email' ],
//             invoice_expired: [ 'email' ],
//             invoice_paid: [ 'email' ]
//     }
// }
// POST /api/order/add 200 2339.758 ms - 142



// {
//     id: '6253c923f440fa304cdb991a',
//         user_id: '6219bd913b9082083b96ffd2',
//     external_id: 'INV-1649658139569',
//     is_high: false,
//     status: 'PAID',
//     merchant_name: 'PT Dua Karya Digital',
//     amount: 60500,
//     created: '2022-04-11T06:22:28.151Z',
//     updated: '2022-04-11T06:23:14.885Z',
//     description: 'Pembelian dari TITIKOMA CAFE',
//     payment_id: 'qrpy_dd674e57-9e44-492f-a553-dce15c6c1ed5',
//     paid_amount: 60500,
//     payment_method: 'QRIS',
//     currency: 'IDR',
//     paid_at: '2022-04-11T06:22:50.872Z',
//     payment_channel: 'QRIS',
//     success_redirect_url: 'https://doc.erpn.us/order/success',
//     failure_redirect_url: 'https://doc.erpn.us/order/failed',
//     fees: [ { type: 'PPN 10%', value: 5500 } ]
// }
// POST /callback/invoices 200 1.989 ms - 18
