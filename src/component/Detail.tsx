import {FC} from 'react'

interface DetailProps {
    id: string,
    content?: string,
    date?: string,
    description?: string,
}

const Detail: FC<DetailProps> = ({
    id, content, date, description
}) => {
  return (
    <div id={id} className='mx-auto w-80 lg:w-[60vw] shadow-md border-none rounded-md'>
        <div className='flex flex-col p-5'>
            <h1 className='text-xl font-bold text-center'>{content}</h1>
            <p className='text-sm text-gray-400'>{date}</p>
            <p className='text-sm text-gray-400'>{description}</p>
        </div>
    </div>
  )
}

export default Detail