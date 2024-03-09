import { Panel } from 'primereact/panel';

import checkout from '../../../utils/checkout';

const Checkout = props => {
  const { score } = props

  return (
    <Panel header="Checkout" className="w-100 mx-auto panel-brighter-bg" >
        {checkout[score].map((c, i) => {
          return <div className="text-center text-shade400 fs-8" key={i}>{c}</div>
        })}
    </Panel>
  )
}

export default Checkout;
