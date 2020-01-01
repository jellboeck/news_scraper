var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {

    request("https://www.nytimes.com", function (err, res, body) {


        var $ = cheerio.load(body);

        var articles = [];

        articles.empty()

        $("article").each(function (i, element) {
            var head = $(element).find("h2").text().trim();
            var sum = $(element).find("p").text();

            if (head && sum) {

                var dataToAdd = {
                    headline: head,
                    summary: sum
                };

                articles.push(dataToAdd);
            };

        });

        cb(articles);

    });

};

module.exports = scrape