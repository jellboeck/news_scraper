$(document).ready(function () {

    var articleContainer = $(".article-container");
    $(document).on("click", ".btn.delete", handleArticleDelete);

    initPage();

    function initPage() {

        $(".article-container").empty();
        
        $.get("/api/headlines?saved=true")
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

    function renderEmpty() {

        var emptyAlert =
            $(["<div class='alert alert-warning text-center'>",
                "<h4>Looks like we don't have any saved articles.</h4>", "</div>",
                "<div class='panel panel-default'>",
                "<div class='panel panel-heading text-center'>",
                "<h3>What would you like to look for articles to save?</h3>", "</div>",
                "<div class='panel-body text-center'>",
                "<h4><a href='/'>Browse Artricles</a></h4>",
                "</div>",
                "</div>"
            ].join(""));

        articleContainer.append(emptyAlert);
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
                "<a class='btn btn-danger delete'>",
                "Delete Article",
                "</a>",
                "</div>", "</div>"].join(""));

        panel.data("_id", article.id);

        return panel;
    }


    function handleArticleDelete() {
        var articleToDelete = $(this).parents(".card").data();

        $.ajax({
            method: "DELETE",
            url: "/api/headlines" + articleToDelete._id
        }).then(function (data) {
            if (data.ok) {
                initPage();
            }
        });
    }




})