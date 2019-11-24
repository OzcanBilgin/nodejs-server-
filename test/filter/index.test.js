

// Normalde dışa bağımlı olanlar test yapılmaz örnek olması için göstermek istedim.
describe("Filter function", () => {
  test("it should filter by a search", () => {
    var requestRedirect = require("../../api/filter");
    const input = {
      body: {
        "startDate": "2016-01-26",
        "endDate": "2018-02-02",
        "minCount": 2700,
        "maxCount": 3000
      }
    };
    const output = [{
      "code": 0,
      "msg": "Success",
      "records": [
        {
          "_id": "5dd964633ef9472f204c7b9f",
          "createdAt": "2017-01-28T01:22:14.398Z",
          "totalCount": 2800,
          "__v": 0
        },
        {
          "_id": "5dd9661a2cf6be2cb8d0f025",
          "createdAt": "2017-01-27T08:19:14.135Z",
          "totalCount": 2900,
          "__v": 0
        }
      ]
    }];
    requestRedirect(
      input,
      (e) => {
        expect(e).toEqual(output)

      }
    )
  });
});