import React from 'react'
import { Button, Grid, Paper } from '@material-ui/core'

export const TaskType = (props) => {
  const { item, handleDelete } = props

  return(
    <Grid container key={ `taskType-${ item.uid }` }>
      <Grid item xs={ 10 }>
        <Paper style={{ padding: 5, marginBottom: 2 }}>
          <Grid container>
            <Grid item xs={ 8 }>
              <strong>Task Type Name: </strong> { item.name } <br />
              <strong>Display Order: </strong> { item.displayOrder }
            </Grid>
            <Grid item xs={ 4 } style={{alignItems: 'right', textAlign: 'right'}}>
              <Button
                color="secondary"
                onClick={ (event) => handleDelete(event, { ownerUid: props.Owneruid, uid: item.uid }) }>
                DELETE
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
