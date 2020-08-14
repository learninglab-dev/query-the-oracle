import React, { useEffect, useState, useReducer } from 'react';
import { Box, Flex } from 'rebass'
import Select from 'react-select'
import MiniBuilder from './MiniBuilder.js'

export default function MegaBuilder({names}) {
  const [conjuncts, setConjuncts] = useState([])
  const initialConnectives = {0:null}
  const handleConjunct = (index, conjunct) => {
    const tempConjuncts = [...conjuncts]
    tempConjuncts[index] = conjunct
    setConjuncts(tempConjuncts)
  }
  const reducer = (connectives, action) => {
    if (action.value) {
      console.log("increment");
      return {
        ...connectives,
        [action.index]: action.value,
        [action.index+1]: null
      }
    }
    else {
      console.log("decrement");
      if (Object.keys(connectives).length < 2) {

      }
      else {
        const tempConnectives = {...connectives}
        const lenToDel = Object.keys(tempConnectives).length+1
        for ( let i = action.index ; i < lenToDel ; i++) {
          delete tempConnectives[i]
        }
        setConjuncts(conjuncts.slice(0,action.index))
        return {
          ...tempConnectives,
        }
      }

    }
  }
  const [connectives, dispatch] = useReducer(reducer, initialConnectives)

  useEffect(()=>{
    console.log(JSON.stringify(conjuncts));
    console.log(JSON.stringify(connectives))
  },[conjuncts, connectives])


  const connectiveOptions =  [
                              {value: 'AND', label: 'AND'},
                              {value: 'OR', label: 'OR'},
                              {value: 'NOT', label: 'NOT'},
                              {value: 'IF', label: 'IF'},
                              {value: 'IFF', label: 'IFF'},
                            ]

  const builderLoop = connectives => {
    let content = []
    for (let i = 0; i < Object.entries(connectives).length; i++){
      content.push(
        <Flex
          sx={{
            width:'100vw',
            flexDirection:'column'
          }}>
          <Select
            name='connective'
            defaultValue = {null}
            isClearable={true}
            options={connectiveOptions}
            onChange={(e) => dispatch({ value: e ? e.value : null, index: i })}
          />
          <MiniBuilder index={i} names={names} handleConjunct={handleConjunct}/>
        </Flex>
      )
    }
    console.log('content',content);
    return content
  }

  const ConnectiveSelect = ({setConnective}) => {
    return (<Select
      name='connective'
      defaultValue = {null}
      isClearable={true}
      options={connectiveOptions}
      onChange={(e) => e ? setConnective(e.value) : setConnective(null)}
    />)
  }

  // const Loop = ({connected}) => {
  //   if (!connected) {
  //     return (
  //       <Flex
  //         sx={{
  //           flexDirection:'column'
  //         }}>
  //         <Nest index={1}/>
  //       </Flex>
  //     )
  //   }
  //   else {
  //     return (
  //       <Flex
  //         sx={{
  //           flexDirection:'column'
  //         }}>
  //         <ConnectiveSelect />
  //         <Flex
  //           sx={{
  //             flexDirection:'row'
  //           }}>
  //           <Nest index={1}/>
  //           <Nest index={2}/>
  //         </Flex>
  //       </Flex>
  //     )
  //   }
  // }

  // const OuterNest = ({index}) => {
  //   const [connective, setConnective] = useState(null)
  //   console.log('connective',connective);
  //   useEffect(()=>{
  //     console.log('set connective', connective);
  //   },[connective])
  //   return (
  //     <>
  //       {!connective
  //         ? <InnerNest index={index} setConnective={setConnective} />
  //         : <><InnerNest index={index} setConnective={setConnective} /><InnerNest index={index} setConnective={setConnective}/></>
  //       }
  //     </>
  //   )
  // }

  const InnerNest = ({index}) => {
    const [connective, setConnective] = useState(null)
    const [children, setChildren] = useState([1])
    useEffect(()=>{
      connective ? setChildren([1,2]) : setChildren([1])
      console.log('set connective', connective);
      console.log('set children', children);
    },[connective])

    const nesting = children.map(index => {
      return (
        // call innernest from here? gets stuck in loop
        <InnerNest />
      )})

    return (
      <Flex
        sx={{
          width:'100%',
          flexDirection:'column'
        }}
      >
        <ConnectiveSelect setConnective={setConnective}/>
        <MiniBuilder index={index} names={names} handleConjunct={null}/>
        <Flex
          sx={{
            width:'100%',
            flexDirection:'row'
          }}
        >
          {nesting}
        </Flex>
      </Flex>
    )
  }

  return (
    <Box>
      {/*<Loop connected={false} />*/}
      <InnerNest />
      {/*{builderLoop(connectives)}*/}
    </Box>

  )
}
