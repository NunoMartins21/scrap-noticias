module.exports = class Jornal {
    /*
        Código dos sites de notícias:
            0 - CM
            1 - JN
            2 - Público
    */

    constructor(nome, site, codigo) {
        this.nome = nome;
        this.site = site;
        this.codigo = codigo;
    }

    getCapa() {
        const rp = require('request-promise');
        const cheerio = require("cheerio");

        const options = {
            uri: this.site,
            transform: function (body) {
              return cheerio.load(body);
            }
        };

		rp(options)
			// Se o request correr bem
            .then(($) => {
                // Verificar site de notícias
                switch (this.codigo) {
                    case 0:
                        this.capa = $("#mainCapasFormContainer > div.capaMain > div.capaBig.slick-initialized.slick-slider > div > div > div.slick-slide.slick-current.slick-active > img").attr("src");
                        break;
                    case 1:
                        this.capa = $("body > main > section > div > div > div.t-grid-1-featured-2.cover-header > article.t-article-module-2 > header > figure > a:nth-child(1) > img").attr("src");
                        break;
                    case 2:
                        this.capa = $(".cover").first().find("img").attr("data-media-viewer");
                };
			})
			// Se houver erro
            .catch((err) => {
                return { status: "Foda-se" };
            });

        return { 
            "nome-jornal": this.nome,
            "codigo-jornal": this.codigo,
            "link-capa": this.capa
        };
    }
}