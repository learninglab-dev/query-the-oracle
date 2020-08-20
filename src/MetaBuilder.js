import React, { useContext, useEffect, useState, useReducer } from 'react';
import { Box, Flex } from 'rebass'
import Select from 'react-select'

export default function MetaBuilder({names, setStatement}) {

  const initialState = []
  const reducer = (state, action) => {
    switch(action.type){
      case 'statement':
        const result = action.value ? action.value.map(x => x.value.includes('_') ? {id:x.value,label:x.label} : {id:x.value+'_'+action.timestamp,label:x.label}) : []
        return [
          ...result
        ]
      default:
        return initialState
    }}
  const [state, dispatch] = useReducer(reducer, initialState)

  const numberOptions = names.map( (x, index) => {
    const result = {}
    result['value'] = String(index+1)
    result['label'] = String(index+1)
    return result
    })
  const nameOptions = names.map( (x) => {
    const result = {}
    result['value'] = x
    result['label'] = x
    return result
    })

  const quantifierOptions = [
                              {value: 'all', label: 'All'},
                              {value: 'some', label: 'Some'},
                              {value: 'none', label: 'None'},
                              {value: 'least', label: 'At least'},
                              {value: 'most', label: 'At most'},
                              {value: 'less', label: 'Less than'},
                              {value: 'more', label: 'More than'},
                            ]
  const predicateOptions =  [
                              {value: 'Knight', label: 'Knight'},
                              {value: 'Knave', label: 'Knave'},
                              {value: 'Dragon', label: 'Dragon'},
                              {value: 'Monk', label: 'Monk'},
                              {value: 'Same', label: 'Same'},
                              {value: 'Different', label: 'Different'},
                            ]
  const connectiveOptions = [
                              {value: 'AND', label: 'And'},
                              {value: 'OR', label: 'Or'},
                              {value: 'NOT', label: 'Not'},
                              {value: 'IF', label: 'If'},
                              {value: 'IFF', label: 'If and only if'},
                            ]
  const punctuationOptions = [
                              {value: '(', label: '('},
                              {value: ')', label: ')'},
                            ]
  const groupedOptions =    [
                              {label: 'Punctuation', options:punctuationOptions},
                              {label: 'Names', options: nameOptions},
                              {label: 'Predicates', options: predicateOptions},
                              {label: 'Quantifiers', options: quantifierOptions},
                              {label: 'Numbers', options: numberOptions},
                              {label: 'Connectives', options: connectiveOptions},
                            ]


  useEffect(()=>{
    const statement = state.map(item => item.label+' ')
    setStatement(statement)
    // console.log(JSON.stringify(state))
  },[state])

  return (
    <>
          <Select
          name='statement'
          hideSelectedOptions={false}
          isMulti
          options={groupedOptions}
          value={state ? state.map(item => ({value: item.id, label: item.label})) : []}
          onChange={(e) => dispatch({ type: 'statement', value: e ? e : [],  timestamp: String(Date.now()).slice(5,) })}
          styles={{
            width:'500px',
          }}
        />
      </>
  )
}
