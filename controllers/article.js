var Article = require("../models/Article")
const cheerio = require("ch")
import Axios from "axios";

const scrape = function (cb) {
    Axios.get("https://www.huffpost.com/life/worklife", function (error, response, html) {
        var $ = cheerio.load(html);
        $(".card__content").each(function (i, element) {
            var result = {};

            result.title = $(this)
                .children(".card__details").children(".card__headlines").children(".card__headline").children(".card__link").children(".card__headline__text")
                .text();

            result.summary = $(this)
                .children(".card__details").children(".card__headlines").children(".card__description")
                .text();

            result.image = $(this)
                .children("a").children(".card__image").children("img")
                .attr("src")

            result.link = $(this)
                .children(".card__details").children(".card__headlines").children(".card__description").children("a")
                .attr("href")

            Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    return res.json(err);
                });
        });
        res.send("Scrape Complete");
    });
}


module.exports = {
  fetch: function (cb) {
    scrape(function (data) {
      var articles = data;
      Article.collection.insertMany(articles, { ordered: false }, function (err, docs) {
        cb(err, docs);
      })
    })
  },
  delete: function (query, cb) {
    Article.remove(query, cb)
  },
  get: function (query, cb) {
    Article.find(query)
      .sort({
        _id: -1
      })
      .exec(function (err, doc) {
        cb(doc)
      });
  },
  update: function (query, cb) {
    Article.update({ _id: query._id }, {
      $set: query
    }, {}, cb);
  }
}
