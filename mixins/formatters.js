import Tooltip from 'tooltip.js'
import { financialQuotes } from '@/mixins/financialQuotes'
import { stringUtils } from '@/mixins/stringUtils'

const formatters = {
  mixins: [financialQuotes, stringUtils],
  methods: {
    articleDescription(article) {
      let treatedDescription = this.truncString(article.description, 250)

      if (article.matchedWords.length > 0) {
        const apiCalls = []
        article.matchedWords.map(word => {
          if (typeof word.symbol !== 'undefined') {
            const str =
              '[\\s?|\\b|\\(|\\"|\\“]' +
              word.matchedWord +
              '[\\b|\\)|\'|\\"|\\”|\\s?|\\s|\\.|,]|^' +
              word.word +
              '[\\b|\\"|\'|\\”|\\s?|\\s|\\.|,]|[\\b|\\"|\\”|\\s?|\\s]' +
              word.word +
              '$'

            const re = new RegExp(str, 'gi')

            let tickerEl = ''
            let coin = ''
            let tickerClass = ''
            // let variation = '<i class="fa"></i> --%'

            switch (word.type) {
              case 'cryptocurrency':
                apiCalls.push({
                  type: 'crypto',
                  symbol: word.symbol
                })

                coin = word.symbol

                tickerClass = `ticker-data crypto-ticker 
                  ${word.topic} ${word.symbol}`

                tickerEl = `<span class="is-tooltip ${tickerClass} data-title="Market Cap variation in the last 24h. Realtime data from Coincap.io" data-variation="" data-coin=${coin}>${coin} --</span>`

                break

              // case 'stock':
              //  var tickerClass = 'ticker-data stock-ticker ' + word.topic;
              //  break;

              // case 'currency':
              //  var tickerClass = 'ticker-data currency-ticker ' + word.topic;
              //  break;
            }

            treatedDescription = treatedDescription.replace(
              re,
              '$& ' + tickerEl + ' '
            )

            // Init tooltips
            setTimeout(() => {
              const tooltips = document.getElementsByClassName('is-tooltip')
              const instances = []
              for (let i = 0; i < tooltips.length; i++) {
                instances.push(
                  new Tooltip(tooltips[i], {
                    title: tooltips[i].getAttribute('data-title'),
                    trigger: 'hover'
                  })
                )
              }
            }, 2000)
          }
        })
        if (apiCalls.length > 0) {
          apiCalls.map(call => {
            if (call.type === 'crypto') {
              this.populateCryptoQuotes(call.symbol)
            }
          })
        }
      }
      return treatedDescription
    },
    articleTitle(article, externalLink) {
      let treatedTitle = this.truncString(article.title, 250)

      if (article.matchedWords.length > 0) {
        const apiCalls = []
        article.matchedWords.map(word => {
          if (typeof word.symbol !== 'undefined') {
            const str =
              '[\\s?|\\b|\\(|\\"|\\“]' +
              word.matchedWord +
              '[\\b|\\)|\'|\\"|\\”|\\s?|\\s|\\.|,]|^' +
              word.matchedWord +
              '[\\b|\\"|\'|\\”|\\s?|\\s|\\.|,]|[\\b|\\"|\\”|\\s?|\\s]' +
              word.matchedWord +
              '$'

            const re = new RegExp(str, 'gi')

            let tickerEl = ''
            let coin = ''
            let tickerClass = ''
            // let variation = '<i class="fa"></i> --%'

            switch (word.type) {
              case 'cryptocurrency':
                apiCalls.push({
                  type: 'crypto',
                  symbol: word.symbol
                })

                coin = word.symbol

                tickerClass = `ticker-data crypto-ticker 
                  ${word.topic} ${word.symbol}`

                tickerEl = `<span class="is-tooltip ${tickerClass} data-title="Market Cap variation in the last 24h. Realtime data from Coincap.io" data-variation="" data-coin=${coin}>${coin} --</span>`

                break

              // case 'stock':
              //  var tickerClass = 'ticker-data stock-ticker ' + word.topic;
              //  break;

              // case 'currency':
              //  var tickerClass = 'ticker-data currency-ticker ' + word.topic;
              //  break;
            }

            treatedTitle = treatedTitle.replace(re, '$& ' + tickerEl + ' ')

            // Init tooltips
            // setTimeout(() =>{
            //   var tooltips = document.getElementsByClassName('is-tooltip')
            //   for(let i=0; i<tooltips.length; i++){
            //     new Tooltip(tooltips[i],{
            //       title: tooltips[i].getAttribute('data-title'),
            //       trigger: 'hover',
            //       placement: 'bottom'
            //     })
            //   }
            // }, 2000)
          }
        })
        if (apiCalls.length > 0) {
          apiCalls.map(call => {
            if (call.type === 'crypto') {
              this.populateCryptoQuotes(call.symbol)
            }
          })
        }
      }
      if (externalLink) {
        treatedTitle += '&nbsp;<small><i class="mdi mdi-open-in-new" /></small>'
      }
      return treatedTitle
    }
  }
}

export { formatters }
