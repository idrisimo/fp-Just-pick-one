import React from 'react'
import {FormControlLabel, Paper, Switch} from '@mui/material'

export const UserCard = ({ username }) => {

    return(
        
        <div>
            <FormControlLabel control={<Switch color='success'/>} label={username}/>
        </div>
    )
}
