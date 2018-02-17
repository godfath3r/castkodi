"use strict";

define(["pebkac"], function (PebkacError) {

    /**
     * L'URL de l'API de Rutube pour obtenir des informations sur une vidéo.
     */
    const API_URL = "https://rutube.ru/api/play/options/";

    /**
     * Les règles avec les patrons et leur action.
     */
    const rules = new Map();

    /**
     * Extrait les informations nécessaire pour lire une vidéo sur Kodi.
     *
     * @param {String} url L'URL d'une vidéo Rutube.
     * @return {Promise} L'URL du fichier.
     */
    rules.set([
        "https://rutube.ru/video/*/*", "*://rutube.ru/play/embed/*"
    ], function (url) {
        const id = url.pathname.replace(/^\/video\//, "")
                               .replace(/^\/play\/embed\//, "")
                               .replace(/\/$/, "");
        if (!(/^[0-9a-z]+$/).test(id)) {
            return Promise.reject(new PebkacError("novideo", "Rutube"));
        }

        return fetch(API_URL + id + "?format=json").then(function (response) {
            if (404 === response.status) {
                throw new PebkacError("novideo", "Rutube");
            }
            return response.json();
        }).then(function (response) {
            return response["video_balancer"].m3u8;
        });
    });

    return rules;
});
