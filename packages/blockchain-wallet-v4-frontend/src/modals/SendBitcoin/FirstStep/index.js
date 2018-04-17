import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getData } from './selectors'
import { actions } from 'data'
import Error from './template.error'
import Loading from './template.loading'
import Success from './template.success'

class FirstStep extends React.Component {
  componentDidMount () {
    this.props.actions.sendBtcFirstStepInitialized()
  }

  render () {
    const { data, actions } = this.props

    return data.cata({
      Success: value => <Success
        toToggled={value.toToggled}
        feePerByteToggled={value.feePerByteToggled}
        captureToggled={value.captureToggled}
        feePerByteElements={value.feePerByteElements}
        effectiveBalance={value.effectiveBalance}
        handleSubmit={() => actions.sendBtcFirstStepSubmitClicked()}
        handleFeePerByteToggle={() => actions.sendBtcFirstStepFeePerByteToggled()}
        handleToToggle={() => actions.sendBtcFirstStepToToggled()}
      />,
      Failure: (message) => <Error>{message}</Error>,
      Loading: () => <Loading />,
      NotAsked: () => <Loading />
    })
  }
}

const mapStateToProps = state => ({
  data: getData(state)
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions.components.sendBtc, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(FirstStep)
