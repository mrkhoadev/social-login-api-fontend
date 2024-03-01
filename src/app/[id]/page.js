"use client"
import React, { useEffect, useState } from 'react';
import { getUserDetail } from '../utils/users';
import Image from 'next/image';
import { providers } from '../configs';
import Link from 'next/link';

const Details = ({ params }) => {
    const id = params.id;
    const [user, setUser] = useState()
    const handleGetData = async (accessToken, userId) => {
        const user = await getUserDetail(accessToken, userId);
        if (user) {
			setUser(user)
		} else {
			localStorage.removeItem('accessToken');
		}
    }
    
    useEffect(() => {
        if (localStorage.accessToken) {
            handleGetData(localStorage.accessToken, id);
        }
    }, [id]);
    if (!user) {
        return <h1>Loading....</h1>
    }
  return (
    <div className='container p-5'>
        <div className="flex items-center justify-start mb-2 gap-x-5">
            {user.thumbnail && <Image src={user.thumbnail} alt={user.name} priority width={100} height={100} />}
            <ul>
              <li>name: {user.name}</li>
              <li>email: {user.email}</li>
              <li>
				<div className="flex gap-3">
					{ providers.map((provider, index) => {
							const result = user.providers.find((p) => p.name === provider);
							if (result) {
								return <p key={index} className={`bg-${!index ? "blue" : "green"}-400 px-4 py-1 rounded-md text-white`}> {provider} đã đăng ký </p>
							} 
							return <p key={index} className={`bg-${!index ? "blue" : "green"}-400 px-4 py-1 rounded-md text-white`}> {provider} chưa đăng ký </p> 
						}) 
					} 
					<Link href={"/"} 
						className=" bg-red-500 text-white px-4 py-1 rounded-md"
					>
						Quay lại
                	</Link>
				</div>
              </li>
            </ul>
          </div>
    </div>
  )
}

export default Details