import React from 'react'
import { Grid } from '@material-ui/core'

/**
 * @name: TroopDetailRow
 * @description:
 *   Generic skeleton for TroopGrid detail row
 *   used by ApplicantDetailRow, CandidateDetailRow, StudentDetailRow
 *
 * @param { components: <any>[] }: extrapolated from props
 * @return: TroopDetailRow Component
 */
export const TroopDetailRow = (props) => {

  const { components } = props

  const renderComponents = () => {
    return components.map((item, index) => {
      const { classes, component, xs } = item
      return (
        <Grid
          item
          key={ `renderComponent-${index}` }
          xs={ xs }
          className={ `rowDetailItem ${ classes }` } >
          { component }
        </Grid>
      )
    })
  }

  return (
    <Grid container className="rowDetail">
      { renderComponents() }
    </Grid>
  )
}
