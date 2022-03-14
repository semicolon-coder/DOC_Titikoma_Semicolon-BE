const moment = require('moment');
const Order = require('../order/model');

module.exports = {
    index: async (req, res) => {
        const thisMonth = await Order
            .aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: moment().startOf('month').toDate(),
                            $lte: moment().endOf('month').toDate()
                        }
                    }
                },
                {
                    $group: {
                        _id: 'thismonth',
                        count: { $sum: 1 },
                        value: { $sum: '$totalPrice' }
                    }
                }
            ])

        const thisDay = await Order
            .aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: moment().startOf('day').toDate(),
                            $lte: moment().endOf('day').toDate()
                        }
                    }
                },
                {
                    $group: {
                        _id: 'thisday',
                        count: { $sum: 1 },
                        value: { $sum: '$totalPrice' }
                    }
                }
            ])

        await Order.find({})
            .select('_id orderId customer payment totalPrice status createdAt')
            .sort({createdAt: 'descending'})
            .limit(10)
            .then(async dataTable => {
                let dataThisDay = thisDay[0];
                let dataThisMonth = thisMonth[0];
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

                res.render('dashboard/index', { dataTable, dataThisMonth, dataThisDay, moment });
            })
    }
}