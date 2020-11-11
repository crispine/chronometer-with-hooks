import React, { useState, useEffect } from 'react'
import Button from "./Button"
import List from "./List"
import { generate as id } from "shortid"

const Chronometer = () => {

    const [clock, setClock] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
        miliseconds: 0
    })
    const [running, setRunning] = useState(false)
    const [allTimestamps, setAllTimestamps] = useState([])
    const [started, setStarted] = useState(false)

    useEffect(() => {
        if(running) {
            const interval = setInterval(() => {
                tick()
            }, 100)
            return () => clearInterval(interval)
        }
    }, [running, clock])

    // it initializes the chronometer
    const handleInit = () => {
        if(!running) {
            setRunning(true)
            setStarted(true)
        }
    }

    // it makes the chronomether count time
    const tick = () => {
        let { hours, minutes, seconds, miliseconds } = clock
        miliseconds = miliseconds + 1

        if(miliseconds === 10) {
            miliseconds = 0
            seconds = seconds + 1
        }

        if(seconds === 60) {
            seconds = 0
            minutes = minutes + 1
        }

        if(minutes === 60) {
            minutes = 0
            hours = hours + 1
        }

        updatetimer(miliseconds, seconds, minutes, hours)
    }

    // it stops the chronometer
    const handleStop = () => {
        if(running) {
            setRunning(false)
        }
    }

    // it prints the current time of the chronometer
    const handleTimestamp = () => {
        const timestamp = {
            hours: clock.hours,
            minutes: clock.minutes,
            seconds: clock.seconds,
            miliseconds: clock.miliseconds
        }

        setAllTimestamps([
            ...allTimestamps,
            timestamp
        ])
    }

    // it resets the count of the chronometer and its list of timestamps
    const handleReset = () => {
        updatetimer(0, 0, 0, 0)
        setAllTimestamps([])
        setStarted(false)
    }

    // it updates the time of the chronometer
    const updatetimer = (miliseconds, seconds, minutes, hours) => {
        setClock({
            miliseconds, seconds, minutes, hours
        })
    }

    // it puts an extra zero on chronometer's time
    const addZero = (value) => (
        value < 10 ? `0${value}`: value
    )

    let { hours, minutes, seconds, miliseconds } = clock
    hours = addZero(hours)
    minutes = addZero(minutes)
    seconds = addZero(seconds)
    miliseconds = addZero(miliseconds)

    return (
        <>
            <h2>{`${hours} : ${minutes} : ${seconds} : ${miliseconds}`}</h2>
            <Button disabled={running} onClick={handleInit}>START</Button>
            <Button disabled={!running} onClick={handleStop}>STOP</Button>
            <Button disabled={!running} onClick={handleTimestamp}>TIMESTAMP</Button>
            {started && <Button disabled={running} onClick={handleReset}>RESET</Button>}
            <List>
                {allTimestamps.map((timestamp, idx) => (
                    <li key={id()}>
                        {`
                            ${idx + 1} -
                            ${addZero(timestamp.hours)} : 
                            ${addZero(timestamp.minutes)} : 
                            ${addZero(timestamp.seconds)} : 
                            ${addZero(timestamp.miliseconds)}
                        `}
                    </li>
                ))}
            </List>
        </>
    )
}

export default Chronometer;
