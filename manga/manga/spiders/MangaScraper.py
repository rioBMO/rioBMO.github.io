import scrapy
class MangaSpider(scrapy.Spider):
    name = "manga-spider"
    start_urls = ["https://myanimelist.net/topmanga.php"]
    manga_count = 0

    def parse(self, response):
        for mangas in response.css('tr.ranking-list'):
            rank = 'span.lightLink.top-anime-rank-text::text'
            self.manga_count += 1
            if self.manga_count <= 1000:
                yield{
                    'rank': mangas.css(rank).get(),
                    'title':mangas.css('a.hoverinfo_trigger.fs14.fw-b::text').get(),
                    'image': mangas.css('img.lazyload::attr(data-src)').get(),
                    'information': mangas.css('div.information::text').getall(),
                    'score': mangas.css('div.js-top-ranking-score-col span.text::text').get(),
                }
        next_page = response.css("a.link-blue-box.next::attr(href)").get()
        if next_page is not None and self.manga_count <= 1000:
            next_page_url = "https://myanimelist.net/topmanga.php"+next_page
            yield response.follow(next_page_url, callback = self.parse)

    def parse_detail(self, response):
        yield {
            'rank': response.meta['rank'],
            'title': response.meta['title'],
            'image': response.meta['image'],
            'information': response.meta['information'],
            'synopsis': response.css('span[itemprop="description"]::text').get(),
            'popularity': response.css('span.numbers.popularity strong::text').get(),
            'type' : response.css('div.spaceit_pad:contains("Type:") a::text').get(),
            'genres': response.css('div.spaceit_pad span[itemprop="genre"]::text').getall(),
            'serialization': response.css('div.spaceit_pad:contains("Serialization:") a::text').get(),
            'author': response.css('div.spaceit_pad:contains("Authors:") a::text').getall(),
            'members': response.css('span.numbers.members strong::text').get(),
            'favorites': response.css('div.spaceit_pad:contains("Favorites:")::text').get(),
            'volumes': response.css('div.spaceit_pad:contains("Volumes:")::text').get(),
            'chapters': response.css('div.spaceit_pad:contains("Chapters:")::text').get(),
            'status': response.css('div.spaceit_pad:contains("Status:")::text').get(),
            'published': response.css('div.spaceit_pad:contains("Published:")::text').get(),
        }