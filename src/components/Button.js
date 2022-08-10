import React from 'react'

function Button({ iconClass, Icon, title, onClick }) {
    return (
        <button title={title} onClick={onClick}>
            <Icon className={iconClass} />
        </button>
    )
}

export default Button