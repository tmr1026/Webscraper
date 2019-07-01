var articlesController = require("../controllers/article");
var notesController = require("../controllers/notes");

module.exports = function (router) {
  router.get("/", function (req, res) {
    res.render("home");
  });

  router.get("/api/fetch", function (req, res) {
    articlesController.fetch(function (err, docs) {
    });
  });

  router.get("/api/articles", function (req, res) {
    var query = {};
    if (req.query.saved) {
      query = req.query
    }

    articlesController.get(query, function (data) {
      res.json(data);
    })
  })

  router.delete("/api/headlines/:id", function (req, res) {
    var query = {};
    query._id = req.params.id;
    articlesController.delete(query, function (err, data) {
      res.json(data);
    });
  });

  router.patch("/api/articles", function (req, res) {
    articlesController.update(req.body, function (err, data) {
      res.json(data)
    })
  })

  router.get("/api/notes/:article_id?", function (req, res) {
    var query = {};
    if (req.params.article_id) {
      query._id = req.params.article_id;
    }

    notesController.get(query, function (err, data) {
      res.json(data);
    });
  });

  router.delete("/api/notes/:id", function (req, res) {
    var query = {};
    query = req.params.id;
    notesController.delete(query, function (err, data) {
      res.json(data)
    });
  });

  router.post("/api/notes", function (req, res) {
    notesController.save(req.body, function (data) {
      res.json(data);
    });
  });
}