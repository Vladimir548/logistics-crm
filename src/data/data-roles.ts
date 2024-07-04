

interface IRole {
  id:number
  value:string
  label:string
}

export const ROLE:IRole[] =[
  {
    id:1,
    value:'logist',
    label:'Логист'
  },
  {
    id:2,
    value:'admin',
    label:'Администратор'
  },
]