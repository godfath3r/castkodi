import assert      from "assert";
import { extract } from "../../../src/core/scrapers.js";

describe("Scraper: Flickr", function () {
    it("should return URL when it's not a video", async function () {
        const url = new URL("https://www.flickr.com/photos" +
                "/europeanspaceagency/48194834627/in/album-72157709420314132/");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.strictEqual(file, url.href);
    });

    it("should return video URL", async function () {
        const url = new URL("https://www.flickr.com/photos/nasahqphoto" +
                                                               "/50041655251/");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.ok(file?.startsWith("https://live.staticflickr.com/video" +
                                          "/50041655251/5178cf57ec/1080p.mp4?"),
                  `"${file}"?.startsWith(...)`);
    });
});
