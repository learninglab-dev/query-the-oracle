import React, { useContext, useEffect, useState, useReducer } from 'react';
import { Box, Flex } from 'rebass'
import Select from 'react-select'

export default function MiniBuilder({index, names, handleConjunct}) {
  const initialState = {
    disableNames: false,
    disableQuantifier: false,
    disableNumber: true,
    names:null,
    quantifier:null,
    number:null,
    predicate:null,
  }
  const [statement, setStatement] = useState(null)

  const reducer = (state, action) => {
    switch(action.type){
      case 'names':
        const result = action.value ? action.value.map(x => x.value) : []
        return {
          ...state,
          names: result,
        }
      case 'quantifier':
        switch(action.value){
          case null:
            return {
              ...state,
              disableNames: false,
              disableNumber: true,
              quantifier: action.value,
              number: null,
            }
          case 'least':
          case 'most':
          case 'less':
          case 'more':
            return {
              ...state,
              disableNames: true,
              disableNumber: false,
              quantifier: action.value,
              names: null,
            }
          case 'all':
          case 'some':
          case 'none':
            return {
              ...state,
              disableNames: true,
              disableNumber: true,
              quantifier: action.value,
              number: null,
              names: null,
            }
          }
      case 'number':
        return {
          ...state,
          number: action.value,
        }
      case 'predicate':
        return {
          ...state,
          predicate: action.value,
        }
      default:
        return {
          initialState
        }

    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const numberOptions = names.map( (x, index) => {
    const result = {}
    result['value'] = index+1
    result['label'] = index+1
    return result
    })
  const nameOptions = names.map( (x) => {
    const result = {}
    result['value'] = x
    result['label'] = x
    return result
    })

  useEffect(()=> {
    const statement = state.names ?
          [state.predicate, state.names] :
          state.number? [state.predicate, [state.quantifier, state.number]] :
          [state.predicate, [state.quantifier]]
    setStatement(statement)
    handleConjunct(index, statement)
  },[state])


  const quantifierOptions = [
                              {value: 'all', label: 'All'},
                              {value: 'some', label: 'Some'},
                              {value: 'none', label: 'None'},
                              {value: 'least', label: 'At least'},
                              {value: 'most', label: 'At most'},
                              {value: 'less', label: 'Less than'},
                              {value: 'more', label: 'More than'},
                            ]
  const roleOptions =     [
                            {value: 'Knight', label: 'Knight'},
                            {value: 'Knave', label: 'Knave'},
                            {value: 'Dragon', label: 'Dragon'},
                            {value: 'Monk', label: 'Monk'},
                          ]
  const adjectiveOptions =  [
                              {value: 'same', label: 'Same'},
                              {value: 'different', label: 'Different'},
                            ]
  const groupedPredicateOptions =    [
                              {label: 'Roles', options: roleOptions},
                              {label: 'Adjectives', options: adjectiveOptions},
                            ]
  return (
    <>
        <Select
          name='predicate'
          defaultValue = {[]}
          isClearable={true}
          options={groupedPredicateOptions}
          onChange={(e) => dispatch({ type: 'predicate', value: e ? e.value : null })}
        />
        {!state.disableNames &&
            <Select
            name='names'
            defaultValue={[]}
            isDisabled={state.disableNames}
            isMulti
            options={nameOptions}
            onChange={(e) => dispatch({ type: 'names', value: e ? e : [] })}
            styles={{
              width:'500px',
            }}
          />
        }
        {!state.disableQuantifier &&
          <Select
            name='quantifier'
            defaultValue={null}
            isDisabled={state.disableQuantifier}
            isClearable={true}
            options={quantifierOptions}
            onChange={(e) => dispatch({ type: 'quantifier', value: e ? e.value : null })}
          />
        }
        {!state.disableNumber &&
          <Select
            name='number'
            defaultValue={null}
            isDisabled={state.disableNumber}
            isClearable={true}
            options={numberOptions}
            onChange={(e) => dispatch({ type: 'number', value: e ? e.value : null })}
          />
        }
        <p>{state.names} {state.quantifier} {state.number} {state.predicate}</p>
        <p>{index}</p>
      </>
  )
}
