import React, { useState, useCallback, useEffect } from 'react'
import {
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Button,
    Typography,
    Box
} from '@mui/material'

import Graph from './components/Graph'

const arrData = new Array(15).fill(0).map((content, index) => {
    return { id: index + 1, title: `question${index + 1}`, value: ["1", "2", "3", "4"] }
})

const Quiz = ({ visible, name, index, info, setName, setIndex, setInfo, setPageType }) => {

    const [error, setError] = useState(false)
    const [value, setValue] = useState(0)
    const [helperText, setHelperText] = React.useState('Choose one')

    const handleRadioChange = useCallback((event) => {
        setValue(event.target.value)
        setHelperText(' ')
        setError(false)
    }, [])

    const handleRestart = useCallback(() => {
        localStorage.clear()
        setInfo(null)
        setName('')
        setIndex(0)
        setPageType(0)
    }, [])

    const handlePrev = useCallback((event) => {
        setIndex(index - 1)
        if (index === 0) {
            setIndex(0)
        }
        if (typeof window !== 'undefined') {
            const a = JSON.parse(localStorage.getItem('quiz'))["" + index - 1];
            setValue(a)
            localStorage.setItem('quiz', JSON.stringify({ ...info, status: index - 1, [index - 1]: a }))
        }
    }, [index, info, value])

    const handleNext = useCallback((event) => {
        event.preventDefault()
        const a = JSON.parse(localStorage.getItem('quiz'))[index + 1];


        if (a >= '1' && a <= '4') {
            setValue(a)
            setIndex(index + 1)
        } else {
            if (value === 0) {
                setHelperText('Please select an option.')
                setError(true)
            } else {
                if (index === 15) {

                } else {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('quiz', JSON.stringify({ ...info, status: index + 1, [index]: value }))
                    }
                    setIndex(index + 1)
                    setHelperText('Choose one')
                    setValue(0)
                }
            }
        }
    }, [index, info, value])

    return (
        <Box sx={{ display: visible ? 'block' : 'none' }}>
            <Box sx={{ width: 500 }}>
                <Box display={'flex'}>
                    <Box margin={'auto'} mb={5} alignItems={'self-end'} display={'flex'}>
                        <Typography variant='h1'>Quiz</Typography>
                        <Typography variant='h5'>
                            &nbsp;{name}
                        </Typography>
                    </Box>
                </Box>
                <Box justifyContent="center">
                    {index >= 15 ? <>
                        <Box sx={{ width: 400 }}>
                            <Graph />
                            <Box sx={{ display: 'flex' }}>
                                <Button sx={{ margin: 'auto', marginTop: 2 }} variant="outlined" onClick={handleRestart}>
                                    RESTART
                                </Button>
                            </Box>
                        </Box>
                    </> : <Box alignItems={'center'}>
                        <FormControl sx={{ m: 3 }} fullWidth error={error} variant="standard">
                            <FormLabel id="demo-error-radios" sx={{ marginBottom: 1, fontSize: 20, fontWeight: 'bold' }}>{arrData[index].title}</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-error-radios"
                                name="quiz"
                                value={value}
                                onChange={handleRadioChange}
                            >
                                {arrData[index].value.map((content) => {
                                    return (<FormControlLabel key={content} value={content} control={<Radio />} title={'question'} alt={'question'} label={'number ' + content} />)
                                })}
                            </RadioGroup>
                            <FormHelperText>{helperText}</FormHelperText>
                            <Box display={'flex'}>
                                <Button sx={{ margin: 'auto', marginTop: 2 }} type="submit" variant="outlined" onClick={handlePrev} disabled={index === 0}> PREV </Button>

                                <Button sx={{ margin: 'auto', marginTop: 2 }} type="submit" variant="outlined" onClick={handleNext}>
                                    {index === 14 && value !== 0 ? 'RESULT' : 'NEXT'}
                                </Button>
                            </Box>
                        </FormControl>
                    </Box>}
                </Box>
            </Box>
        </Box>
    )
}

export default Quiz