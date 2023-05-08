import Link from 'next/link';
import React from 'react'

type Props = {
    category: string;
    isActive: boolean;
}

function NavLink({category, isActive}: Props) {
  return (
    <Link href={`news/${category}`}
    className={`navLink ${isActive && "underline decoration-orange-400 decoration-offset-4 font-bold text-lg" } `}
    >{category}
    </Link>
  )
}

export default NavLink