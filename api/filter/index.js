var db = require("../../mongo");
module.exports = function (request, response) {
    return new Promise(function (resolve, reject) {
        const {startDate,endDate,minCount,maxCount} = request.body;
        var filter = {};
        filter.createdAt = { $gte: startDate, $lte: endDate };
        filter.totalCount = { $gte: minCount, $lte: maxCount };
        console.log('filter',filter)
        db.SelectDB(filter).then(function (result) {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};
