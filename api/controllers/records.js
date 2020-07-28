"use strict";

const Record = require("../models/records");

function getAllRecordsByFilters(req, res, next) {
    var {startDate, endDate, minCount, maxCount} = req.body;
   
    var pipeline = [
        {
            $match: {
                "createdAt": {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                 }
            }
        }, 
        {
            $group: {
                "_id": {
                    "createdAt": "$createdAt",
                    "key": "$key"
                },
                "totalCount": {
                    $sum: { "$sum": "$counts" }
                }
            }
        },
        {
            $match: {
                "totalCount": {
                    $gte: minCount,
                    $lte: maxCount
                 }
            }
        }        
    ];

    Record.aggregate(pipeline).then(docs => {
        var result = docs.map(doc =>{           
            return {
            key: doc._id.key,
            createdAt: doc._id.createdAt,
            totalCount: doc.totalCount
        }});

        res.status(200).json({
            code: 0,
            msg: "Success",
            records: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}

module.exports = { getAllRecordsByFilters };