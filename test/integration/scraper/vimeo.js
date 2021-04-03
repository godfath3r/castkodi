import assert      from "assert";
import { extract } from "../../../src/core/scrapers.js";

describe("Scraper: Vimeo", function () {
    it("should return URL when it's not a video", async function () {
        const url = new URL("https://vimeo.com/channels");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.strictEqual(file, url.href);
    });

    it("should return video id [opengraph-vimeo]", async function () {
        const url = new URL("https://vimeo.com/228786490");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.strictEqual(file,
            "plugin://plugin.video.vimeo/play/?video_id=228786490");
    });

    it("should return video id when protocol is HTTP [opengraph-vimeo]",
                                                             async function () {
        const url = new URL("http://vimeo.com/228786490");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.strictEqual(file,
            "plugin://plugin.video.vimeo/play/?video_id=228786490");
    });

    it("should return video id from groups video [opengraph-vimeo]",
                                                             async function () {
        const url = new URL("https://vimeo.com/groups/motion/videos/93206523");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.strictEqual(file,
            "plugin://plugin.video.vimeo/play/?video_id=93206523");
    });

    it("should return embed video id", async function () {
        const url = new URL("https://player.vimeo.com/video/228786490");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.strictEqual(file,
            "plugin://plugin.video.vimeo/play/?video_id=228786490");
    });
});
