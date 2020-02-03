const initialTaskList = [
  {
    id: 0,
    title: 'Unfinished',
    tasks:[]
  },
  {
    id: 1,
    title: 'In process',
    tasks:[]
  },
  {
    id: 2,
    title: 'Finished',
    tasks:[]
  }
]

export default initialTaskList

// art.match(/\w+/g).toLocaleString().replace(/[\s.,%]/g, '')