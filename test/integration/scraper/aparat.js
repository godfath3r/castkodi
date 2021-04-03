import assert      from "assert";
import { extract } from "../../../src/core/scrapers.js";

describe("Scraper: آپارات (Aparat)", function () {
    it("should return URL when it's not a show", async function () {
        const url = new URL("https://www.aparat.com/movies");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.strictEqual(file, url.href);
    });

    it("should return show URL", async function () {
        const url = new URL("https://www.aparat.com/v/IWTPf");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.ok(file?.includes(".cdn.asset.aparat.com/aparat-video" +
                         "/50e29576af712008fd3c439b21a345ec20298541-720p.apt?"),
                  `"${file}"?.includes(...)`);
    });

    it("should return show URL when protocol is HTTP [opengraph]",
                                                             async function () {
        const url = new URL("http://www.aparat.com/v/Qk9jp");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.ok(file?.includes(".cdn.asset.aparat.com/aparat-video" +
                         "/294334a32a660e853e0fb546f12ec36b20286453-480p.apt?"),
                  `"${file}"?.includes(...)`);
    });
});
