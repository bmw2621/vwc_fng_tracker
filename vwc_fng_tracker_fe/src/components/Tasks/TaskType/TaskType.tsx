import React from 'react'
import { Button, IconButton, Grid, Paper, Chip } from '@material-ui/core'
import { of } from 'rxjs'
import { useGlobal } from '../../../store'

export const TaskType = (props) => {
  const { item, ownerUid, handleDelete } = props
  const [globalState, globalActions] = useGlobal()
  const { doDelete, setState } = globalActions

  const blankTaskType = {
    uid: '_:uid',
    name: '',
    editing: false,
    type: 'TaskType',
    ownerUid: props.ownerUid,
    displayOrder: 0,
    associatedWith: ''
  }

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
