import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from 'rebass/styled-components'
import { useIntl } from 'react-intl'
import { CoinBig } from '@zap/utils/coin'
import { getDisplayNodeName } from 'reducers/payment/utils'
import { Truncate } from 'components/Util'
import { Text } from 'components/UI'
import { CryptoSelector, CryptoValue } from 'containers/UI'
import ArrowRight from 'components/Icon/ArrowRight'
import messages from './messages'

const HtlcHops = ({ hops, ...rest }) => {
  const { formatMessage, formatNumber } = useIntl()
  return (
    <Flex {...rest} flexDirection="column">
      {hops.map(hop => {
        const displayName = getDisplayNodeName(hop)
        const hasFee = CoinBig(hop.feeMsat).gt(0)
        return (
          <Flex
            key={hop.pubKey}
            alignItems="center"
            className="hint--top-left"
            data-hint={formatMessage(
              { ...messages[hasFee ? 'htlc_hop_fee' : 'htlc_hop_no_fee'] },
              { hopFee: formatNumber(hop.feeMsat), cryptoUnitName: 'msat' }
            )}
            justifyContent="flex-end"
            my={1}
          >
            <Flex alignItems="center" color="gray" mx={2}>
              <ArrowRight />
            </Flex>
            <Truncate maxlen={50} text={displayName} />
          </Flex>
        )
      })}
    </Flex>
  )
}

HtlcHops.propTypes = {
  hops: PropTypes.array.isRequired,
}

const Htlc = ({ route, isAmountVisible = true, ...rest }) => {
  const amountExcludingFees = CoinBig(route.totalAmt)
    .minus(route.totalFees)
    .toString()
  return (
    <Flex alignItems="center" justifyContent="space-between" {...rest}>
      {isAmountVisible && (
        <Text fontWeight="normal">
          <CryptoValue value={amountExcludingFees} />
          <CryptoSelector ml={2} />
        </Text>
      )}
      <HtlcHops hops={route.hops} />
    </Flex>
  )
}

Htlc.propTypes = {
  isAmountVisible: PropTypes.bool,
  route: PropTypes.object.isRequired,
}

export default Htlc