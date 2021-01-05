import assert      from "assert";
import { extract } from "../../../src/core/scrapers.js";

describe("Scraper: Pokémon TV", function () {
    it("should return URL when video is unavailable", async function () {
        const url = new URL("https://watch.pokemon.com/fr-fr/#/season" +
                                            "?id=la-serie-pokemon-les-voyages");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.strictEqual(file, url.href);
    });

    it("should return french video URL", async function () {
        const url = new URL("https://watch.pokemon.com/fr-fr/#/player" +
                                        "?id=65492fc4bd634c69b1337593a2d99007");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.strictEqual(file,
            "https://s2.content.video.llnw.net/smedia" +
                                        "/4953336d7f544f678a12270b176ea386/F7" +
                                  "/at49C7yB6RvUkECXsAgbmq2F7-mmZVWo1kM3cMYVo" +
                                                            "/fr-fr-23-01.mp4");
    });

    it("should return america video URL", async function () {
        const url = new URL("https://watch.pokemon.com/en-us/#/player" +
                                        "?id=25de3fd5c65245a488de0fc0b73087a0");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.strictEqual(file,
            "https://s2.content.video.llnw.net/smedia" +
                                        "/4953336d7f544f678a12270b176ea386/7o" +
                                  "/hdyMZqlhQDxc3NNJJuw4mEBtCWWS9hpRfvXfV_Ppo" +
                                              "/pokemon-op-trailer_102220.mp4");
    });

    it("should return latin video URL", async function () {
        const url = new URL("https://watch.pokemon.com/es-xl/#/player" +
                                        "?id=94223aa2b4d143799542c06fb66b5e64");
        const options = { depth: false, incognito: false };

        const file = await extract(url, options);
        assert.strictEqual(file,
            "https://s2.content.video.llnw.net/smedia" +
                                        "/4953336d7f544f678a12270b176ea386/gz" +
                                  "/3GZ5vZQYR6AIGfWdxHjDKaWW_2ojqCytoZ20o6OhQ" +
                                           "/pok_tv_s0101_2398-master-las.mp4");
    });
});
