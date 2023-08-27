import React, {FC} from 'react'

interface ButtonProps {
    id: string,
    label: string,
    onClick: React.MouseEventHandler<HTMLButtonElement>,
}

const Button: FC<ButtonProps> = ({
    id, label, onClick
}) => {
  return (
    <div className='mt-3'>
        <button id={id} className='bg-blue-400 text-white focus:outline-none' onClick={onClick}>{label}</button>
    </div>
  )
}

export default Button