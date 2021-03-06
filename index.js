var cheerio = require('cheerio');
var slug = require('github-slugid');

// insert anchor link into section
function insertAnchors(content) {
    var $ = cheerio.load(content);
    $(':header').each(function(i, elem) {
        var header = $(elem);
        var id = header.attr("id");
        if (!id) {
            id = slug(header.text());
        }
        var encodeId = encodeURIComponent(id).replace(/%/g, '-');
        header.attr("id", encodeId);
        header.prepend('<a name="' + id + '" class="plugin-anchor" '
                   + 'href="#' + encodeId + '">'
                   + '<i class="fa fa-link" aria-hidden="true"></i>'
                   + '</a>');
    });
    return $.html();
}

module.exports = {
    book: {
        assets: "./assets",
        css: [ "plugin.css" ]
    },
    hooks: {
        "page": function(page) {
            page.content = insertAnchors(page.content);
            return page;
        }
    }
};
