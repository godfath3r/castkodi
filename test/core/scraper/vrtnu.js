import assert      from "assert";
import { URL }     from "url";
import { extract } from "../../../src/core/index.js";
import { rules }   from "../../../src/core/scraper/vrtnu.js";

describe("scraper/vrtnu", function () {
    describe("#patterns", function () {
        it("should return the URL when it's a unsupported URL",
                                                             async function () {
            const url = "https://www.vrt.be/vrtnu/livestream";

            const file = await extract(url);
            assert.strictEqual(file, url);
        });
    });

    describe("*://www.vrt.be/vrtnu/a-z/*", function () {
        let action;
        before(function () {
            action = [...rules.entries()]
                          .find(([r]) => r.includes(this.test.parent.title))[1];
        });

        it("should return video URL", async function () {
            const url = "https://www.vrt.be/vrtnu/a-z/het-journaal/2019" +
                                     "/het-journaal-het-journaal-13u-20190901/";
            const expected = "plugin://plugin.video.vrt.nu/play/url" +
                                  "/https://www.vrt.be/vrtnu/a-z/het-journaal" +
                                "/2019/het-journaal-het-journaal-13u-20190901/";

            const file = await action(new URL(url));
            assert.strictEqual(file, expected);
        });

        it("should return video URL when protocol is HTTP", async function () {
            const url = "http://www.vrt.be/vrtnu/a-z/pano/2019/pano-s2019a9/";
            const expected = "plugin://plugin.video.vrt.nu/play/url" +
                         "/http://www.vrt.be/vrtnu/a-z/pano/2019/pano-s2019a9/";

            const file = await action(new URL(url));
            assert.strictEqual(file, expected);
        });
    });

    describe("*://vrt.be/vrtnu/a-z/*", function () {
        let action;
        before(function () {
            action = [...rules.entries()]
                          .find(([r]) => r.includes(this.test.parent.title))[1];
        });

        it("should return video URL", async function () {
            const url = "https://vrt.be/vrtnu/a-z/koppen/2016" +
                                                           "/koppen-d20180721/";
            const expected = "plugin://plugin.video.vrt.nu/play/url" +
                      "/https://vrt.be/vrtnu/a-z/koppen/2016/koppen-d20180721/";

            const file = await action(new URL(url));
            assert.strictEqual(file, expected);
        });
    });

    describe("*://vrtnu.page.link/*", function () {
        let action;
        before(function () {
            action = [...rules.entries()]
                          .find(([r]) => r.includes(this.test.parent.title))[1];
        });

        it("should return video URL", async function () {
            const url = "https://vrtnu.page.link/KXWX";
            const expected = "plugin://plugin.video.vrt.nu/play/url" +
                                                "/https://vrtnu.page.link/KXWX";

            const file = await action(new URL(url));
            assert.strictEqual(file, expected);
        });
    });
});