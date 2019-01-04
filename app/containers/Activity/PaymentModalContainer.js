import { connect } from 'react-redux'
import { setCurrency, setFiatTicker, tickerSelectors } from 'reducers/ticker'
import { PaymentModal } from 'components/Activity/PaymentModal'

const mapStateToProps = state => ({
  currentTicker: tickerSelectors.currentTicker(state),
  cryptoCurrency: state.ticker.currency,
  cryptoCurrencies: tickerSelectors.currencyFilters(state),
  fiatCurrencies: state.ticker.fiatTickers,
  fiatCurrency: state.ticker.fiatTicker
})

const mapDispatchToProps = {
  setCryptoCurrency: setCurrency,
  setFiatCurrency: setFiatTicker
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentModal)
