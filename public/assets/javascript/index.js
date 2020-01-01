$(document).ready(function () {

    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape)


    initPage();

    function initPage() {

       articleContainer.empty();
    
        $.get("/api/headlines")
            .then(function (data) {
                if (data && data.length) {
                    renderArticles(data);
                }
                else {
                    renderEmpty();
                }
            });
    }

    function renderArticles(articles) {
        var articlePanels = [];

        for (var i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }

        articleContainer.append(articlePanels);
    }

    function createPanel(article) {
        var panel =
            $(["<div class='card'>",
                "<div class='card-header'>",
                "<h3>",
                article.headline,
                "</h3>",
                "</div>",
                "<div class='card-body'>",
                "<p class='card-text'>",article.summary,
                "</p>",
                "<a class='btn btn-secondary save'>",
                "Save Article",
                "</a>",
                "</div>", "</div>"].join(""));

        panel.data("_id", article._id);

        return panel;
    }

    function renderEmpty() {

        var emptyAlert =
            $(["<div class='alert alert-warning text-center' id='empty'>",
                "<h4>Looks like we don't have any new articles.</h4>", "</div>",
                "<div class='panel panel-default'>",
                "<div class='panel panel-heading text-center'>",
                 "</div>",
                "<div class='panel-body text-center'>",
                "<h4><a class='scrape-new'>Try Scraping Some Articles</a></h4>",
                "</div>",
                "</div>"
            ].join(""));

        articleContainer.append(emptyAlert);
    }

    function handleArticleSave() {
        var articleToSave = $(this).parents(".card").data();
        articleToSave.saved = true;

        $.ajax({
            method: "PATCH",
            url: "/api/headlines",
            data: articleToSave
        }).then(function (data) {
            if (data.ok) {
                initPage()
            }
        });
    }

    function handleArticleScrape() {
        $.get("/api/fetch")
            .then(function (data) {
                initPage();
                alert(data.message);
            });
    }

});