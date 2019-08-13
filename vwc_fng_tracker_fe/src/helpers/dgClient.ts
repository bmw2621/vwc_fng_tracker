import * as dgraph from 'dgraph-js-http'

const clientStub =
  new dgraph.DgraphClientStub(process.env.REACT_APP_DGRAPH_API_URL, true)

export const dgClient = new dgraph.DgraphClient(clientStub)
