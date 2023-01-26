import React from 'react'
import PropTypes from 'prop-types'
import { Button, Typography, TextField } from '@mui/material'
import Link from 'next/link'

const Login = ({ visible, onSubmit }) => {

    const handleEmail = (e) => {
        e.preventDefault();
        const data = new FormData(e.target)
        const name = data.get("name")
        onSubmit && onSubmit(name)
    }

    return (
        <form onSubmit={handleEmail} style={{ display: visible ? "block" : "none" }}>
            <Typography variant='title' sx={{ fontSize: 50, fontWeight: "bold" }} display={'flex'} justifyContent="center">Quiz</Typography>
            <Typography variant='h5' display={'flex'} justifyContent="right">Hiklub Hire Test</Typography>
            <TextField
                sx={{ marginTop: 10 }}
                margin="normal" required fullWidth
                id="name" label="Name" name="name"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Next</Button>
        </form>
    )
}

Login.propTypes = {
    user: PropTypes.string
}

export default Login