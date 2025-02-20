
import { data } from './data'

import { Grid } from './components/Grid'

const App = () => {
  return (
    <div style={{ height: "100%", width: "98%", top: "0", position: "absolute", left: "1%" }}>
      <Grid rows={data} />
    </div>
  )
}

export default App