import { useEffect, useState } from "react";
import { useRouteError } from "react-router-dom";

const endMessages = [
    'Good luck',
    'aaaaaaaaaaaaaaaa',
    'oh no oh no oh no',
    'I\'m so sorry about all this',
    'my bad',
    'oopsie doopsie',
    'uh ohhhhhhhhhhhhhhhh',
    'ERROR',
    'EEROR',
    'ERER',
    'yikers'
]

export function ErrorBoundary() {
    const [endMessage, setEndMessage] = useState('')
    let error = useRouteError() as any;
    console.error(error);
    const message = error.message

    useEffect(() => {
        if (error.status === 404)
            setEndMessage('404')
        else 
            setEndMessage(endMessages[Math.floor(Math.random() * endMessages.length)])
    }, [])

    return (
      <div className='w-full h-full p-10 flex flex-col justify-center items-center text-destructive'>
        <h1 className="text-xl">ERROR</h1>
        <code className="text-xs text-justify max-w-96">{message}</code>
        <p>{ endMessage }</p>
      </div>
    )
  }