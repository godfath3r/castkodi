import assert       from "assert";
import { extract }  from "../../../src/core/scrapers.js";
import { complete } from "../../../src/core/labellers.js";

describe("Labeller: YouTube", function () {
    it("should return video label", async function () {
        browser.storage.local.set({ "youtube-playlist": "video" });

        const url = new URL("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        const item = await complete({ file, label: "", type: "unknown" });
        assert.deepStrictEqual(item, {
            file,
            label: "Rick Astley - Never Gonna Give You Up (Video)",
            type:  "unknown",
        });

        browser.storage.local.clear();
    });

    it("should return unavailable label", async function () {
        browser.storage.local.set({ "youtube-playlist": "video" });

        const url = new URL("https://www.youtube.com/watch?v=v_cwYv4K2vo");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        const item = await complete({ file, label: "", type: "unknown" });
        assert.deepStrictEqual(item, {
            file,
            label: "(Video unavailable)",
            type:  "unknown",
        });

        browser.storage.local.clear();
    });

    it("should return playlist label", async function () {
        browser.storage.local.set({ "youtube-playlist": "playlist" });

        const url = new URL("https://www.youtube.com/playlist" +
                                                    "?list=PL6B3937A5D230E335");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        const item = await complete({ file, label: "", type: "unknown" });
        assert.deepStrictEqual(item, {
            file,
            label: "Official Blender Open Movies",
            type:  "unknown",
        });

        browser.storage.local.clear();
    });

    it("should return mix label", async function () {
        browser.storage.local.set({ "youtube-playlist": "playlist" });

        const url = new URL("https://www.youtube.com/watch" +
                                           "?v=Yrm_kb1d-Xc&list=RDYrm_kb1d-Xc");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        const item = await complete({ file, label: "", type: "unknown" });
        assert.deepStrictEqual(item, {
            file,
            label: "Mix",
            type:  "unknown",
        });

        browser.storage.local.clear();
    });

    it("should return mix label from YouTube Music", async function () {
        browser.storage.local.set({ "youtube-playlist": "playlist" });

        const url = new URL("https://music.youtube.com/watch" +
                                           "?v=9bZkp7q19f0&list=RD9bZkp7q19f0");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        const item = await complete({ file, label: "", type: "unknown" });
        assert.deepStrictEqual(item, {
            file,
            label: "Mix",
            type:  "unknown",
        });

        browser.storage.local.clear();
    });
});
