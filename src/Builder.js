import React, { useState } from 'react';
import { Box } from 'rebass'
import {Label, Select} from '@rebass/forms'

export default function Builder({names}) {
  const [question, setQuestion] = useState({names:[],predicate:''})
  const predicates = ['Knight','Knave','Dragon','Monk','Same','Different']

  return (
    <Box>
      <Label>Names:</Label>
        <Select
          multiple
          onChange={(e)=>console.log(e.target.value)}
          >
          {names.map(name => (
            <option
              key={name}>
              {name}
            </option>
          ))}
          </Select>
      <Label>Predicate:</Label>
        <Select
        >
        {predicates.map(predicate => (
          <option
            key={predicate}>
            {predicate}
          </option>
        ))}
        </Select>
    </Box>
  )
}

// ['Knight', ['A']]
// all atleast none
// checkbox to negate?
// use react selkect
