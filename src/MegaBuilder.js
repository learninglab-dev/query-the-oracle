import React, { useEffect, useState, useReducer } from 'react';
import { Box, Flex } from 'rebass'
import Select from 'react-select'
import MiniBuilder from './MiniBuilder.js'

export default function MegaBuilder({names}) {
  const [conjuncts, setConjuncts] = useState(1)
  return (
    <Box>
      {for i in new Array(conjuncts)}
    </Box>
  )
}
