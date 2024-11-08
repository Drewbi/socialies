import type * as Party from "partykit/server";
import { GameState, RequestMessage, ResponseType } from "./types";
import { encodeMessage } from "./util";

export function checkRequirements(state: GameState, sender: Party.Connection, message?: RequestMessage): ResponseType | true {
    console.log(state.players)
    if (!state.players[sender.id]) return 'needregister'
    if (state.status === 'notstarted') return 'notstarted'
    return true
}

export function handleRegister(state: GameState, sender: Party.Connection, message: RequestMessage) {
    console.log('start handleRegister')
    state.players[sender.id] = {
        name: message.data.name,
        target: null,
        question: null,
        answers: [],
        points: 0,
        lockedAnswer: 0,
        lockedGuess: 0
    } 
    
    sender.send(encodeMessage({
        type: 'ok'
    }))

    console.log('end handleRegister')
}

export function handleStart(state: GameState, room: Party.Room) {
    // TODO Add admin auth
    state.status = 'started'
    room.broadcast(encodeMessage({
        type: 'start'
    }))
}

export function handleCanStart(state: GameState, sender: Party.Connection) {
    const requirements = checkRequirements(state, sender)
    if (requirements !== true) {
        sender.send(encodeMessage({
            type: requirements
        }))
        return
    }

    if (state.status === 'started') {
        sender.send(encodeMessage({
            type: 'start'
        }))
    }
}

export function handleNewTarget(state: GameState, sender: Party.Connection) {
    const requirements = checkRequirements(state, sender)
    if (requirements !== true) {
        sender.send(encodeMessage({
            type: requirements
        }))
        return
    }

    console.log('start handleNewTarget')
    const {[sender.id]: currentPlayer, ...targets} = state.players 
    const targetIds = Object.keys(targets)
    const randomIndex = Math.floor(Math.random() * targetIds.length)
    const randomTarget = targetIds[randomIndex]
    state.players[sender.id].target = randomTarget
    
    const randomQuestion = 'how are you today?'
    state.players[sender.id].question = randomQuestion

    sender.send(encodeMessage({
        type: 'newtarget',
        data: {
            name: targets[randomTarget].name,
            question: randomQuestion
        }
    }))

    console.log('end handleNewTarget')
}

export function handleGetTarget(state: GameState, sender: Party.Connection) {
    const requirements = checkRequirements(state, sender)
    if (requirements !== true) {
        sender.send(encodeMessage({
            type: requirements
        }))
        return
    }

    console.log('start handleGetTarget')
    const existingTarget = state.players[sender.id].target
    if (existingTarget) {
        sender.send(encodeMessage({
            type: 'target',
            data: {
                name: state.players[existingTarget].name,
                question: state.players[sender.id].question
            }
        }))
        if (state.players[sender.id].lockedAnswer > 0) {
            sender.send(encodeMessage({
                type: 'answerpending',
                data: {
                    answerTimeout: state.players[sender.id].lockedGuess
                } 
            }))    
        }
    } else {
        handleNewTarget(state, sender)
    }



    console.log('end handleGetTargets')
}

export function handleAnswer(state: GameState, room: Party.Room, sender: Party.Connection, message: RequestMessage) {
    const existingTarget = state.players[sender.id].target
    const existingQuestion = state.players[sender.id].question

    if (existingTarget && existingQuestion) {
        const targetConnection = room.getConnection(existingTarget)
        const timeout = 10000
        const timeoutTill = Date.now() + timeout
        if (state.players[sender.id].lockedAnswer === 0) {
            setTimeout(() => {
                state.players[sender.id].lockedAnswer = 0
                state.players[sender.id].points += 1
                sender.send(encodeMessage({
                    type: 'answerconfirmed',
                    data: {
                        points: state.players[sender.id].points
                    }
                }))
                handleNewTarget(state, sender)
                targetConnection?.send(encodeMessage({
                    type: 'gotgot',
                    data: {
                        seeker: state.players[sender.id].name
                    }
                }))
            }, timeout)

            state.players[sender.id].lockedAnswer = timeoutTill

            state.players[sender.id].answers.push({
                q: existingQuestion,
                a: message.data.answer,
            })

            targetConnection?.send(encodeMessage({
                type: 'gettingot',
                data: {
                    answerTimeout: timeoutTill
                }
            }))
        }

            
        sender.send(encodeMessage({
            type: 'answerpending',
            data: {
                answerTimeout: state.players[sender.id].lockedAnswer
            }
        }))

        
    } else {
        handleNewTarget(state, sender)
    }  
}

export function handleGetSeekers(state: GameState, sender: Party.Connection) {
    const requirements = checkRequirements(state, sender)
    if (requirements !== true) {
        sender.send(encodeMessage({
            type: requirements
        }))
        return
    }

    const {[sender.id]: currentPlayer, ...seekers} = state.players
    sender.send(encodeMessage({
        type: 'seekers',
        data: {
            seekers: Object.keys(seekers).map(seekerId => ({ name: seekers[seekerId].name, id: seekerId}))
        }
    }))

    if (state.players[sender.id].lockedGuess > 0 && state.players[sender.id].lockedGuess > Date.now()) {
        sender.send(encodeMessage({
            type: 'badguess',
            data: {
                guessTimeout: state.players[sender.id].lockedGuess
            } 
        }))
    }
}

export function handleGuess(state: GameState, room: Party.Room, sender: Party.Connection, message: RequestMessage) {
    const guessedSeeker = state.players[message.data.seeker]
    if (!state.players[sender.id].lockedGuess || state.players[sender.id].lockedGuess < Date.now()) {
        if (guessedSeeker && guessedSeeker.target === sender.id) {
                const guessedConnection = room.getConnection(message.data.seeker)
                state.players[sender.id].points += 1

                sender.send(encodeMessage({
                    type: 'guesscorrect',
                    data: {
                        points: state.players[sender.id].points
                    }
                }))

                guessedConnection?.send(encodeMessage({
                    type: 'gotgot'
                }))
            
        } else {
            const timeout = 30000
            const timeoutTill = Date.now() + timeout

            setTimeout(() => {
                console.log('timeout triggered')
                state.players[sender.id].lockedAnswer = 0
            }, timeout)

            state.players[sender.id].lockedGuess = timeoutTill
            sender.send(encodeMessage({
                type: 'badguess',
                data: {
                    guessTimeout: timeoutTill
                } 
            }))
        }
    } else {
        sender.send(encodeMessage({
            type: 'badguess',
            data: {
                guessTimeout: state.players[sender.id].lockedGuess
            }  
        }))
    }
}