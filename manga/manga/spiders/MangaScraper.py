import scrapy


class MangaSpider(scrapy.Spider):
    name = "manga-spider"
    start_urls = ["https://myanimelist.net/topmanga.php"]

    def parse_detail(self, response, **kwargs):
        yield {
            'rank': response.meta['rank'],
            'title': response.meta['title'],
            'image': response.meta['image'],
            'information': response.meta['information'],
            'synopsis': response.css('span[itemprop="description"]::text').get(),
            'popularity': response.css('span.numbers.popularity strong::text').get(),
            'type': response.css('div.spaceit_pad span.dark_text::text').re_first(r'Type:\s*(.*)'),
            'genres': response.css('div.spaceit_pad span[itemprop="genre"]::text').getall(),
            'serialization': response.css('div.spaceit_pad:contains("Serialization:") a::text').get(),
            'author': response.css('div.spaceit_pad:contains("Authors:") a::text').getall(),
        }


        next_page = response.css("a.link-blue-box.next::attr(href)").get()
        if next_page is not None:
            next_page_url = response.urljoin(next_page)
            yield response.follow(next_page_url, callback=self.parse)

    



