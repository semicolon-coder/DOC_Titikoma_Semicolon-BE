// Import momentjs for date formatter
const moment = require('moment');
// Import order schema
const Order = require('../order/model');

module.exports = {
    index: async (req, res) => {
        // Aggregate order data with range this month
        const thisMonth = await Order
            .aggregate([
                {
                    // Match document/data with these range
                    $match: {
                        createdAt: {
                            $gte: moment().startOf('month').toDate(),
                            $lte: moment().endOf('month').toDate()
                        }
                    }
                },
                {
                    // Group the data
                    $group: {
                        _id: 'thismonth',
                        // Sum of total order created in this month
                        count: { $sum: 1 },
                        // Sum of total price in this month
                        value: { $sum: '$total' }
                    }
                }
            ])

        // Aggregate order data with range this day
        const thisDay = await Order
            .aggregate([
                {
                    // Match document/data with these range
                    $match: {
                        createdAt: {
                            $gte: moment().startOf('day').toDate(),
                            $lte: moment().endOf('day').toDate()
                        }
                    }
                },
                {
                    // Group the data
                    $group: {
                        _id: 'thisday',
                        // Sum of total order created in this day
                        count: { $sum: 1 },
                        // Sum of total price in this day
                        value: { $sum: '$total' }
                    }
                }
            ])

        // Query find all order data with selected field
        await Order.find({})
            .select('_id orderId customer payment total status createdAt')
            // Sort to descending because we want to see latest transaction/order
            .sort({createdAt: 'descending'})
            // Only 10 latest transaction will be show to dashboard page
            .limit(10)
            .then(async dataTable => {
                // Aggregate will return array, in my case this aggregate the result only one
                let dataThisDay = thisDay[0];
                let dataThisMonth = thisMonth[0];
                // If data undefined set to 0
                if (dataThisDay === undefined) {
                    dataThisDay = {
                        _id: 'thisDay',
                        count: 0,
                        value: 0
                    }
                }
                if (dataThisMonth === undefined) {
                    dataThisMonth = {
                        _id: 'thisMonth',
                        count: 0,
                        value: 0
                    }
                }

                // Render the dashboard page
                res.render('dashboard/index', { dataTable, dataThisMonth, dataThisDay, moment });
            })
    }
}
