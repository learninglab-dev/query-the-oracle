import React, { useEffect, useState, useReducer } from 'react';
import { Box, Flex } from 'rebass'
import Select from 'react-select'

export default function MiniBuilder({names}) {
  const initialState = {
    disableNames: false,
    disableQuantifier: false,
    disableNumber: true,
    names:null,
    quantifier:null,
    number:null,
    predicate:null,
    connective:null,
  }
  const reducer = (state, action) => {
    switch(action.type){
      case 'names':
        const result = action.value ? action.value.map(x => x.value) : []
        console.log(result);
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
            }
          }
      case 'number':
        return {
          ...state,
          number: action.value,
        }
      case 'predicate':
        console.log(action.value);
        return {
          ...state,
          predicate: action.value,
        }
      case 'connective':
        return {
          ...state,
          connective: action.value,
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
    result['value'] = x.toLowerCase()
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
  const roleOptions =     [
                            {value: 'knight', label: 'Knight'},
                            {value: 'knave', label: 'Knave'},
                            {value: 'dragon', label: 'Dragon'},
                            {value: 'monk', label: 'Monk'},
                          ]
  const adjectiveOptions =  [
                              {value: 'same', label: 'Same'},
                              {value: 'different', label: 'Different'},
                            ]
  const groupedPredicateOptions =    [
                              {label: 'Roles', options: roleOptions},
                              {label: 'Adjectives', options: adjectiveOptions},
                            ]
  const connectiveOptions =  [
                              {value: 'AND', label: 'AND'},
                              {value: 'OR', label: 'OR'},
                              {value: 'NOT', label: 'NOT'},
                              {value: 'IF', label: 'IF'},
                              {value: 'IFF', label: 'IFF'},
                            ]
  return (
    <Box>
      <Flex
        sx={{
          width:'100vw',
          flexDirection:'column'
        }}
      >
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
      </Flex>
      <Select
        name='connective'
        defaultValue = {null}
        isClearable={true}
        options={connectiveOptions}
        onChange={(e) => dispatch({ type: 'connective', value: e ? e.value : null })}
      />
    <p>{state.names} {state.quantifier} {state.number} {state.predicate} {state.connective}</p>
    </Box>
  )
}

// ['Knight', ['A']]
// all atleast none
// checkbox to negate?
// use react selkect
