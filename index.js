const QWeb = require('./q-web');
const LexWeb = require('./lex-web');
class FinderWords {
    constructor() { }

    /**
     * Find all words in a given word list starting from the given position
     */
    async find(word) {
        let wordsList = await this.sendRequest("lexWeb", word)
        if (wordsList?.error || !wordsList?.result) {
            wordsList = await this.sendRequest("qWeb", word)
            wordsList = await this.sendRequest("qWeb", word)
        }
        return wordsList?.result ? wordsList.result : [inputWord]
    }

    /**
     * Send a request to run the specified logic
     */
    async sendRequest(webSite, words) {
        let result;
        if (webSite == "qWeb") {
            result = await QWeb.run(words)
        }
        else {
            result = await LexWeb.run(words);
        }
        return result;
    }

}
module.exports = FinderWords