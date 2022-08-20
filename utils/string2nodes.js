 export default function stringToNodes(keyword,searchValue) {
  const nodes = []
  if (keyword.startsWith(searchValue.toUpperCase())) {
    // * 字符串切割 因为是匹配开头
    const key1 = keyword.slice(0,searchValue.length)
    const key2 = keyword.slice(searchValue.length)

    const node1 = {
      name:'span',
      attrs:{
        style:"color:#26ce8a"
      },
      children:[{type:"text", text:key1}]
    }
    nodes.push(node1)
    const node2 = {
      name:'span',
      attrs:{
        style:"color:#000000"
      },
      children:[{type:"text", text:key2}]
    }
    nodes.push(node2)
  } else {
    const node3 = {
      name:'span',
      attrs:{
        style:"color:#000000"
      },
      children:[{type:"text", text:keyword}]
    }
    nodes.push(node3)
  }
  return nodes
 }