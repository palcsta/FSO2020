import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }
    const reset = () => {
        setValue('')
        return("")
    }
    return {
        type,
        value,
        onChange,
        reset
        
    }

}

// moduulissa voi olla monta nimettyä eksportia
export const useRm = (x) => {  // ...

    const [value, setValue] = useState(x.value)

    const reset = () => {
        setValue('')
    }

    return {
        reset,
        value
        
    }



}