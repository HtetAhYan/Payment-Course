import dynamic from 'next/dynamic'
import React from 'react'
const InputComponent = dynamic(() => import('./inputComponent'), { loading: () => (<p>loading...</p>) })

function SessionAccord({ data,url }) {
console.log(data);

  
  return (
  <div className="boder-md p-3 collapse shadow-md collapse-arrow bg-base-200 justify-self-center mt-4">
  <input type="radio" name="my-accordion-2" checked="checked" /> 
  <div className="collapse-title text-xl font-medium">
   {data.title}
  </div>
  <div className="collapse-content"> 
    <InputComponent url={url} />
  </div>
</div>
  )
}

export default SessionAccord