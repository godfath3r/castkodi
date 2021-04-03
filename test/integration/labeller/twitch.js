import assert       from "assert";
import { extract }  from "../../../src/core/scrapers.js";
import { complete } from "../../../src/core/labellers.js";

describe("Labeller: Twitch", function () {
    it("should return channel label", async function () {
        // Récupérer l'URL d'une chaine en live en passant par la version mobile
        // car la version classique charge le contenu de la page en asynchrone
        // avec des APIs.
        const response = await fetch("https://m.twitch.tv/directory/all");
        const text = await response.text();
        const doc = new DOMParser().parseFromString(text, "text/html");

        const url = new URL("https://m.twitch.tv" +
                            doc.querySelector(".tw-card a.tw-link").href);
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        const item = await complete({ file, label: "", type: "unknown" });
        assert.notStrictEqual(item.label, null, `from ${url}`);
        assert.notStrictEqual(item.label, "",   `from ${url}`);
    });

    it("should return default label when channel is offline",
                                                             async function () {
        const url = new URL("https://www.twitch.tv/supersynock");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        const item = await complete({ file, label: "", type: "unknown" });
        assert.deepStrictEqual(item, {
            file,
            label: "SuperSynock",
            type:  "unknown",
        });
    });

    it("should return video label", async function () {
        // Récupérer l'URL d'une vidéo en passant par la version mobile car la
        // version classique charge le contenu de la page en asynchrone avec des
        // APIs.
        const response = await fetch("https://m.twitch.tv/canardpc/profile");
        const text = await response.text();
        const doc = new DOMParser().parseFromString(text, "text/html");

        const url = new URL("https://m.twitch.tv" +
                            doc.querySelector(`a.tw-link[href^="/videos/"]`)
                               .href);
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        const item = await complete({ file, label: "", type: "unknown" });
        assert.notStrictEqual(item.label, null, `from ${url}`);
        assert.notStrictEqual(item.label, "",   `from ${url}`);
    });
});
