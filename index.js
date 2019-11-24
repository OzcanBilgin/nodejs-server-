const express = require('express')
var bodyParser = require('body-parser');
var db = require('./mongo');
var mongoSanitize = require('express-mongo-sanitize');

const responsePayload = {
    "code":null,
    "msg":null,
    "records":[]
}

db.OpenDB().then((result) => {
    const app = express()
    app.use(bodyParser.json());
    app.use(mongoSanitize({ replaceWith: '_' }));

    //request response logger middleware
    app.use(function (req, res, next) {
        var send = res.send;
        res.send = function (data) {
            console.log("Response:" + data + "\n\n");
            send.call(this, data);
        };
        console.log("Request" + JSON.stringify(req.body));
        next();
    });
  
    //post
    app.post(["/api/filter", "/api/filter*"], function (request, response, next) {
        var requestRedirect = require("./api/filter" + request.url.replace('/api/filter', ''));
        var {startDate,endDate,minCount,maxCount} = request.body;
        if (startDate && endDate && minCount && maxCount) {
            requestRedirect(request, response).then(function (result) {
                    responsePayload.code = 0;
                    responsePayload.msg = 'Success';
                    responsePayload.records = result;
                    response.json(responsePayload);
                    next();
                }).catch(function (err) {
                    responsePayload.code = 1;
                    responsePayload.msg = err
                    responsePayload.records = [];
                    response.json(responsePayload);
                    next();
                })
        } else {
            responsePayload.code = 1;
            responsePayload.msg = 'Incorrect post params.'
            responsePayload.records = [];
            response.json(responsePayload);
            next();
        }
    });

    //General Error Logger..
    app.use(function (err, req, res, next) {
        if (err) {
            console.log("General Error:");
            console.log(err.stack);
        }
        responsePayload.code = 1;
        responsePayload.msg = 'Global Error Occurred'
        responsePayload.records = [];
        res.json(responsePayload);
        next();
    });

 
    app.listen(process.env.PORT || 3000, () => console.log("Server Ready On port 3000"));

}).catch((err) => {
    console.log("DB Connection Not OK!: " + err);
});







